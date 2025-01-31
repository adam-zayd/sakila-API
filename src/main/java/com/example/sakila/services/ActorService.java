package com.example.sakila.services;

import com.example.sakila.dto.output.ActorOutput;
import com.example.sakila.entities.Actor;
import com.example.sakila.repositories.ActorRepository;
import com.example.sakila.repositories.FilmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import com.example.sakila.dto.input.ActorInput;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ActorService {

        private final ActorRepository actorRepo;
        private final FilmRepository filmRepo;

        @Autowired
        public ActorService(ActorRepository actorRepo, FilmRepository filmRepo) {
            this.actorRepo= actorRepo;
            this.filmRepo= filmRepo;
        }

        private void updateFromActorInput(Actor actor, ActorInput actorInput) {
            if (actorInput.getFirstName()!= null) {
                actor.setFirstName(actorInput.getFirstName().toUpperCase());
            }
            if (actorInput.getLastName()!= null) {
                actor.setLastName(actorInput.getLastName().toUpperCase());
            }
            if (actorInput.getFilms()== null) {
                return;
            }
            if (actorInput.getFilms().isEmpty()) {
                return;
            }
                final var films = actorInput.getFilms()
                        .stream()
                        .map(filmId -> filmRepo.findById(filmId)
                                .orElseThrow(() -> new ResponseStatusException((HttpStatus.BAD_REQUEST))))
                        .collect(Collectors.toCollection(ArrayList::new));
                actor.setFilms(films);
        }

        public List<ActorOutput> getAllActors(Optional<String> name) {
            return name.map(value -> actorRepo.findAllByFullNameContainingIgnoreCase(value))
                    .orElseGet(() -> actorRepo.findAll())
                    .stream()
                    .map(ActorOutput::from)
                    .toList();
        }

        public ActorOutput getActorByID(Short id) {
            return actorRepo.findById(id)
                    .map(ActorOutput::from)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        }

        public Actor createActor(ActorInput actorInput){
            final var actor= new Actor();
            updateFromActorInput(actor, actorInput);
                        return actorRepo.save(actor);
        }

        public Actor updateActor(Short id, ActorInput actorInput){
            final var actor= actorRepo.findById(id)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Actor not found"));
                    updateFromActorInput(actor, actorInput);
            return actorRepo.save(actor);
        }

        public void deleteActor(Short id){
        final var actor= actorRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Actor not found"));
        actorRepo.delete(actor);
    }
    }

