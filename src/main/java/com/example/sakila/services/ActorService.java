package com.example.sakila.services;

import com.example.sakila.entities.Actor;
import com.example.sakila.repositories.ActorRepository;
import com.example.sakila.repositories.FilmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import com.example.sakila.dto.input.ActorInput;


public class ActorService {

    @RestController
    public class ActorController {
        private ActorRepository actorRepo;
        private FilmRepository filmRepo;

        @Autowired
        public ActorController(ActorRepository actorRepo, FilmRepository filmRepo) {
            this.actorRepo = actorRepo;
            this.filmRepo = filmRepo;
        }

        private void updateFromActorInput(Actor actor, ActorInput actorInput){

        }


        public Actor getActorbyID(Short id) {
            return actorRepo.findById(id);
        }

        public Actor createActor{
            actor is new actor
                update actor
                        return repo.save actor
        }

        public update actor (id and input){
            actor is repo.find by getActorbyID()
                    .orelse throw
                    update actor
            return repo.save actor

        }

        public void deleteActor

    }
}
