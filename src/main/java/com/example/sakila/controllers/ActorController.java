package com.example.sakila.controllers;

import com.example.sakila.entities.Actor;
import com.example.sakila.repositories.ActorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
public class ActorController {
    private ActorRepository actorRepo;

    @Autowired
    public ActorController(ActorRepository actorRepo){
        this.actorRepo= actorRepo;
    }

    @GetMapping("/actors")
    public List<Actor> getAllActors(){
        return actorRepo.findAll();
    }

    @GetMapping("/actors/{id}")
    public Actor getActorUsingId(@PathVariable Short id){
        return actorRepo.findById(id)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @GetMapping ("/actors/{id}/films")
    public String getActorsFilms(@PathVariable Short id){
        return "reads actors films using actor id";
    }
    
    @PostMapping ("/actors")
    public String createActor(){
        return "Creates a new actor";
    }//creates actor

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
