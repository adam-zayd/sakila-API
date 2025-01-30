package com.example.sakila.controllers;

import com.example.sakila.dto.input.ActorInput;
import com.example.sakila.dto.output.ActorOutput;
import com.example.sakila.entities.Actor;
import com.example.sakila.entities.Film;
import com.example.sakila.repositories.ActorRepository;
import com.example.sakila.repositories.FilmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.ArrayList;

import static java.util.stream.Collectors.toList;

@RestController
public class ActorController {
    private ActorRepository actorRepo;
    private FilmRepository filmRepo;

    @Autowired
    public ActorController(ActorRepository actorRepo, FilmRepository filmRepo){
        this.actorRepo= actorRepo;
        this.filmRepo= filmRepo;
    }

    @GetMapping("/actors")
    public List<ActorOutput> getAllActors(@RequestParam(required= false) Optional<String> name){
        return name.map(value -> actorRepo.findAllByFullNameContainingIgnoreCase(value))
                .orElseGet(()->actorRepo.findAll())
                .stream()
                .map(ActorOutput::from)
                .toList();
    }

    @GetMapping("/actors/{id}")
    public ActorOutput getActorUsingId(@PathVariable Short id){
        return actorRepo.findById(id)
                .map(ActorOutput::from)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

//    @GetMapping ("/actors/{id}/films")
//    public String getActorsFilms(@PathVariable Short id){
//        return "reads actors films using actor id";
//    }

    @PostMapping ("/actors")
    public ActorOutput createActor(@RequestBody ActorInput actorInput){
        final var actor= new Actor();
        actor.setFirstName(actorInput.getFirstName().toUpperCase());
        actor.setLastName(actorInput.getLastName().toUpperCase());

        final var films= actorInput.getFilms()
                        .stream()
                .map(filmId -> filmRepo.findById(filmId)
                        .orElseThrow(() -> new ResponseStatusException((HttpStatus.BAD_REQUEST))))
                                .toList();

        actor.setFilms(films);
        final var saved= actorRepo.save(actor);
        return ActorOutput.from(saved);
    }

    @PutMapping("/actors/{id}")
    public ActorOutput replaceActor(@PathVariable Short id, @RequestBody ActorInput actorInput){
        final var actor= actorRepo.findById(id)
                                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Actor not found"));

        actor.setFirstName(actorInput.getFirstName().toUpperCase());
        actor.setLastName(actorInput.getLastName().toUpperCase());


        final var films= actorInput.getFilms()
                                    .stream()
                                    .map(filmId -> filmRepo.findById(filmId)
                                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Film not found")))
                                    .collect(Collectors.toCollection(ArrayList::new));
        actor.setFilms(films);

        final var updatedActor= actorRepo.save(actor);
        return ActorOutput.from(updatedActor);
    }
    
    @PatchMapping("/actors/{id}")
    public ActorOutput modifyActor(@PathVariable Short id, @RequestBody ActorInput actorInput){
        final var actor= actorRepo.findById(id)
                                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Actor not found"));

        if (actorInput.getFirstName()!=null){
            actor.setFirstName(actorInput.getFirstName().toUpperCase());
        }
        if (actorInput.getLastName()!=null){
            actor.setLastName(actorInput.getLastName().toUpperCase());
        }
        if (actorInput.getFilms()!=null){
            final var films= actorInput.getFilms()
                                        .stream()
                                        .map(filmId -> filmRepo.findById(filmId)
                                                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Film not found")))
                                        .collect(Collectors.toCollection(ArrayList::new));
            actor.setFilms(films);
        }

        final var updatedActor= actorRepo.save(actor);
        return ActorOutput.from(updatedActor);
    }

    @DeleteMapping("/actors")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteActor(@RequestParam Short id){
        final var actor= actorRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Actor not found"));
        actorRepo.delete(actor);
    }
}
