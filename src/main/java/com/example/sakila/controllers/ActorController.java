package com.example.sakila.controllers;

import com.example.sakila.dto.output.ActorOutput;
import com.example.sakila.entities.Actor;
import com.example.sakila.repositories.ActorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
public class ActorController {
    private ActorRepository actorRepo;

    @Autowired
    public ActorController(ActorRepository actorRepo){
        this.actorRepo= actorRepo;
    }

    @GetMapping("/actors")
    public List<ActorOutput> getAllActors(@RequestParam(required = false) Optional<String> name){
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
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

//    @GetMapping ("/actors/{id}/films")
//    public String getActorsFilms(@PathVariable Short id){
//        return "reads actors films using actor id";
//    }

    @PostMapping ("/actors")
    public Actor createActor(@RequestBody Actor actor) {
        return actorRepo.save(actor);
    }

    @PutMapping ("/actors")
    public String replaceActor(){
        return "Updates an actor by replacing with req body";
    }//updates actor using put

    @PatchMapping("/actors")
    public String updateActor(){
        return "updates actor by modifying fields using req body";
    }//updates actor using patch

    @DeleteMapping("/actors")
    public String deleteActor(@RequestParam Short id){
        return "deletes actor using actor_id";
    }
}
