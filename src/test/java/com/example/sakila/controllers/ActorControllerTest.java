package com.example.sakila.controllers;

import com.example.sakila.dto.output.ActorOutput;
import com.example.sakila.entities.Actor;
import com.example.sakila.repositories.ActorRepository;
import com.example.sakila.repositories.FilmRepository;
import com.example.sakila.dto.input.ActorInput;
import com.example.sakila.services.ActorService;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Optional;
import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ActorControllerTest{

    @Mock
    private ActorService actorService;
    @InjectMocks
    private ActorController actorController;

    private Short id;
    private Actor actor;
    private ActorInput actorInput;

    @BeforeAll
    public static void setUp(){
        Short id= 1;
    }

    @BeforeEach
    public void init(){
        actor= new Actor();
        actorInput= new ActorInput();
    }

    @Test
    public void testGetAllActorsWithName() {
        actor.setFirstName("John");
        actor.setLastName("Smith");
        actor.setFilms(new ArrayList<>());

        Actor secondActor = new Actor();
        secondActor.setFirstName("Joseph");
        secondActor.setFilms(new ArrayList<>());

        Actor thirdActor = new Actor();
        thirdActor.setLastName("Jonjo");
        thirdActor.setFilms(new ArrayList<>());

        List<Actor> listOfActors = new ArrayList<>();
        listOfActors.add(actor);
        listOfActors.add(secondActor);
        listOfActors.add(thirdActor);

        when(actorService.getAllActors(Optional.of("Jo")))
                .thenReturn(listOfActors);

        List<ActorOutput> actors = actorController.getAllActors(Optional.of("Jo"));

        Assertions.assertNotNull(actors);
        Assertions.assertEquals(3, actors.size());
        Assertions.assertEquals("John", actors.get(0).getFirstName());
        Assertions.assertEquals("Smith", actors.get(0).getLastName());
        Assertions.assertEquals(0, actors.get(0).getFilms().size());
        Assertions.assertEquals("Joseph", actors.get(1).getFirstName());
        Assertions.assertEquals(0, actors.get(1).getFilms().size());
        Assertions.assertEquals("Jonjo", actors.get(2).getLastName());
        Assertions.assertEquals(0, actors.get(2).getFilms().size());
    }
}