package com.example.sakila.controllers;

import com.example.sakila.dto.output.ActorOutput;
import com.example.sakila.entities.Actor;
import com.example.sakila.entities.Film;
import com.example.sakila.repositories.ActorRepository;
import com.example.sakila.repositories.FilmRepository;
import com.example.sakila.dto.input.ActorInput;
import com.example.sakila.services.ActorService;
import jakarta.validation.ConstraintViolationException;
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
import org.springframework.web.bind.MethodArgumentNotValidException;
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
    private ActorInput invalidActorInput;

    @BeforeAll
    public static void setUp(){
        Short id= 1;
    }

    @BeforeEach
    public void init(){
        actor= new Actor();
        actorInput= new ActorInput();
        invalidActorInput= new ActorInput();
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

    @Test
    public void testGetAllActorsWithoutName(){
        actor.setFirstName("John");
        actor.setLastName("Smith");
        actor.setFilms(new ArrayList<>());

        Actor secondActor= new Actor();
        secondActor.setFirstName("Joseph");
        secondActor.setLastName("Jonjo");
        secondActor.setFilms(new ArrayList<>());

        List<Actor> listOfActors= new ArrayList<>();
        listOfActors.add(actor);
        listOfActors.add(secondActor);

        when(actorService.getAllActors(Optional.empty()))
                .thenReturn(listOfActors);

        List<ActorOutput> actors = actorController.getAllActors(Optional.empty());

        Assertions.assertNotNull(actors);
        Assertions.assertEquals(2, actors.size());
        Assertions.assertEquals("John", actors.get(0).getFirstName());
        Assertions.assertEquals("Smith", actors.get(0).getLastName());
        Assertions.assertEquals(0, actors.get(0).getFilms().size());
        Assertions.assertEquals("Joseph", actors.get(1).getFirstName());
        Assertions.assertEquals("Jonjo", actors.get(1).getLastName());
        Assertions.assertEquals(0, actors.get(1).getFilms().size());
    }

    @Test
    public void testGetAllActorsWithNameNotFound(){
        List<Actor> listOfActors= new ArrayList<>();

        when(actorService.getAllActors(Optional.of("Bob")))
                .thenReturn(listOfActors);

        List<ActorOutput> actors= actorController.getAllActors(Optional.of("Bob"));

        Assertions.assertNotNull(actors);
        Assertions.assertEquals(0, actors.size());
    }

    @Test
    public void testGetActorByID(){
        actor.setFirstName("John");
        actor.setLastName("Smith");
        actor.setFilms(new ArrayList<Film>());

        when(actorService.getActorByID(id))
                .thenReturn(actor);

        ActorOutput found= actorController.getActorUsingId(id);

        Assertions.assertNotNull(found);
        Assertions.assertEquals("John", found.getFirstName());
        Assertions.assertEquals("Smith", found.getLastName());
        Assertions.assertEquals(0, found.getFilms().size());
    }

    @Test
    public void testGetActorByIDNotFound(){
        when(actorService.getActorByID(id))
                .thenThrow(new ResponseStatusException(HttpStatus.NOT_FOUND));

        ResponseStatusException exception= Assertions.assertThrows(ResponseStatusException.class, () -> actorController.getActorUsingId(id));
        Assertions.assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
    }

    @Test
    public void testCreateActor(){
        actorInput.setFirstName("John");
        actorInput.setLastName("Smith");
        actorInput.setFilms(new ArrayList<Short>());

        actor.setFirstName("John");
        actor.setLastName("Smith");
        actor.setFilms(new ArrayList<Film>());

        when(actorService.createActor(actorInput))
                .thenReturn(actor);

        ActorOutput created= actorController.createActor(actorInput);

        Assertions.assertNotNull(created);
        Assertions.assertEquals("John", actor.getFirstName());
        Assertions.assertEquals("Smith", actor.getLastName());
        Assertions.assertEquals(0, actor.getFilms().size());
    }
//
//    @Test
//    public void testCreateActorWithNullName(){
//        invalidActorInput.setLastName("Smith");
//        invalidActorInput.setFilms(new ArrayList<Short>());
//
//        //Throws lava lang null pointer exception????????
//        MethodArgumentNotValidException exception = Assertions.assertThrows(MethodArgumentNotValidException.class, () -> actorController.createActor(invalidActorInput));
//        Assertions.assertEquals(HttpStatus.BAD_REQUEST, exception.getStatusCode());
//    }
//
//    @Test
//    public void testCreateActorWithEmptyName(){
//        invalidActorInput.setFirstName("");
//        invalidActorInput.setLastName("Smith");
//        invalidActorInput.setFilms(new ArrayList<Short>());
//
//        //Throws lava lang null pointer exception????????
//        MethodArgumentNotValidException exception = Assertions.assertThrows(MethodArgumentNotValidException.class, () -> actorController.createActor(invalidActorInput));
//        Assertions.assertEquals(HttpStatus.BAD_REQUEST, exception.getStatusCode());
//    }
//
//    @Test
//    public void testCreateActorWithLongName(){
//        invalidActorInput.setFirstName("1234567890123456789012345678901234567890123456");
//        invalidActorInput.setLastName("Smith");
//        invalidActorInput.setFilms(new ArrayList<Short>());
//
//        //Throws lava lang null pointer exception????????
//        MethodArgumentNotValidException exception = Assertions.assertThrows(MethodArgumentNotValidException.class, () -> actorController.createActor(invalidActorInput));
//        Assertions.assertEquals(HttpStatus.BAD_REQUEST, exception.getStatusCode());
//    }

//    @Test
//    public void testCreateActorWithNullFilms(){
//        invalidActorInput.setFirstName("John");
//        invalidActorInput.setLastName("Smith");
//        invalidActorInput.setFilms(null);
//
//        //Throws lava lang null pointer exception????????
//        MethodArgumentNotValidException exception = Assertions.assertThrows(MethodArgumentNotValidException.class, () -> actorController.createActor(invalidActorInput));
//        Assertions.assertEquals(HttpStatus.BAD_REQUEST, exception.getStatusCode());
//    }

    @Test
    public void testCreateActorWithInvalidFilms(){
        ArrayList films= new ArrayList<Short>();
        films.add(5000000);
        invalidActorInput.setFirstName("John");
        invalidActorInput.setLastName("Smith");
        invalidActorInput.setFilms(films);

        when(actorService.createActor(invalidActorInput))
                .thenThrow(new ResponseStatusException(HttpStatus.BAD_REQUEST));

        //Throws lava lang null pointer exception????????
        ResponseStatusException exception = Assertions.assertThrows(ResponseStatusException.class, () -> actorController.createActor(invalidActorInput));
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, exception.getStatusCode());
    }

    @Test
    public void testReplaceActor(){
        actorInput.setFirstName("John");
        actorInput.setLastName("Smith");
        actorInput.setFilms(new ArrayList<Short>());

        actor.setFirstName("John");
        actor.setLastName("Smith");
        actor.setFilms(new ArrayList<Film>());

        when(actorService.updateActor(id,actorInput))
                .thenReturn(actor);

        ActorOutput created= actorController.replaceActor(id, actorInput);

        Assertions.assertNotNull(created);
        Assertions.assertEquals("John", actor.getFirstName());
        Assertions.assertEquals("Smith", actor.getLastName());
        Assertions.assertEquals(0, actor.getFilms().size());
    }

//
//    @Test
//    public void testReplaceActorWithNullName(){
//        invalidActorInput.setLastName("Smith");
//        invalidActorInput.setFilms(new ArrayList<Short>());
//
//        //Throws lava lang null pointer exception????????
//        MethodArgumentNotValidException exception = Assertions.assertThrows(MethodArgumentNotValidException.class, () -> actorController.replaceActor(id,invalidActorInput));
//        Assertions.assertEquals(HttpStatus.BAD_REQUEST, exception.getStatusCode());
//    }
//
//    @Test
//    public void testReplaceActorWithEmptyName(){
//        invalidActorInput.setFirstName("");
//        invalidActorInput.setLastName("Smith");
//        invalidActorInput.setFilms(new ArrayList<Short>());
//
//        //Throws lava lang null pointer exception????????
//        MethodArgumentNotValidException exception = Assertions.assertThrows(MethodArgumentNotValidException.class, () -> actorController.replaceActor(id, invalidActorInput));
//        Assertions.assertEquals(HttpStatus.BAD_REQUEST, exception.getStatusCode());
//    }
//
//    @Test
//    public void testReplaceActorWithLongName(){
//        invalidActorInput.setFirstName("1234567890123456789012345678901234567890123456");
//        invalidActorInput.setLastName("Smith");
//        invalidActorInput.setFilms(new ArrayList<Short>());
//
//        //Throws lava lang null pointer exception????????
//        MethodArgumentNotValidException exception = Assertions.assertThrows(MethodArgumentNotValidException.class, () -> actorController.replaceActor(id, invalidActorInput));
//        Assertions.assertEquals(HttpStatus.BAD_REQUEST, exception.getStatusCode());
//    }
//
//    @Test
//    public void testReplaceActorWithNullFilms(){
//        invalidActorInput.setFirstName("John");
//        invalidActorInput.setLastName("Smith");
//        invalidActorInput.setFilms(null);
//
//        //Throws lava lang null pointer exception????????
//        MethodArgumentNotValidException exception = Assertions.assertThrows(MethodArgumentNotValidException.class, () -> actorController.replaceActor(id, invalidActorInput));
//        Assertions.assertEquals(HttpStatus.BAD_REQUEST, exception.getStatusCode());
//    }

    @Test
    public void testReplaceActorWithInvalidFilms(){
        ArrayList films= new ArrayList<Short>();
        films.add(5000000);
        invalidActorInput.setFirstName("John");
        invalidActorInput.setLastName("Smith");
        invalidActorInput.setFilms(films);

        when(actorService.updateActor(id,invalidActorInput))
                .thenThrow(new ResponseStatusException(HttpStatus.BAD_REQUEST));

        //Throws lava lang null pointer exception????????
        ResponseStatusException exception = Assertions.assertThrows(ResponseStatusException.class, () -> actorController.replaceActor(id,invalidActorInput));
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, exception.getStatusCode());
    }



}