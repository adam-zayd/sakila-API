package com.example.sakila.services;

import com.example.sakila.entities.Actor;
import com.example.sakila.entities.Film;
import com.example.sakila.repositories.ActorRepository;
import com.example.sakila.repositories.FilmRepository;
import com.example.sakila.dto.input.ActorInput;
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

import static org.mockito.AdditionalAnswers.returnsFirstArg;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ActorServiceTest{

    @Mock
    private ActorRepository actorRepo;
    @Mock
    private FilmRepository filmRepo;
    @InjectMocks
    private ActorService actorService;

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
    public void testGetAllActorsWithName(){
        actor.setFirstName("John");
        actor.setLastName("Smith");

        Actor secondActor= new Actor();
        secondActor.setFirstName("Joseph");

        Actor thirdActor= new Actor();
        thirdActor.setLastName("Jonjo");

        List<Actor> mockRepoReturn= new ArrayList<>();
        mockRepoReturn.add(actor);
        mockRepoReturn.add(secondActor);
        mockRepoReturn.add(thirdActor);

        when(actorRepo.findAllByFullNameContainingIgnoreCase("JO"))
                .thenReturn(mockRepoReturn);

        List<Actor> actors= actorService.getAllActors(Optional.of("JO"));

        Assertions.assertNotNull(actors);
        Assertions.assertEquals(3, actors.size());
        Assertions.assertEquals("John", actors.get(0).getFirstName());
        Assertions.assertEquals("Joseph", actors.get(1).getFirstName());
        Assertions.assertEquals("Jonjo", actors.get(2).getLastName());
    }

    @Test
    public void testGetAllActorsWithoutName(){
        actor.setFirstName("John");
        actor.setLastName("Smith");

        Actor secondActor= new Actor();
        secondActor.setFirstName("Joseph");
        secondActor.setLastName("Jonjo");

        List<Actor> mockRepoReturn= new ArrayList<>();
        mockRepoReturn.add(actor);
        mockRepoReturn.add(secondActor);

        when(actorRepo.findAll())
                .thenReturn(mockRepoReturn);

        List<Actor> actors = actorService.getAllActors(Optional.empty());

        Assertions.assertNotNull(actors);
        Assertions.assertEquals(2, actors.size());
        Assertions.assertEquals("John", actors.get(0).getFirstName());
        Assertions.assertEquals("Smith", actors.get(0).getLastName());
        Assertions.assertEquals("Joseph", actors.get(1).getFirstName());
        Assertions.assertEquals("Jonjo", actors.get(1).getLastName());
    }

    @Test
    public void testGetAllActorsWithNameNotFound(){
        List<Actor> mockRepoReturn= new ArrayList<>();

        when(actorRepo.findAllByFullNameContainingIgnoreCase("Bob"))
                .thenReturn(mockRepoReturn);

        List<Actor> actors= actorService.getAllActors(Optional.of("Bob"));

        Assertions.assertNotNull(actors);
        Assertions.assertEquals(0, actors.size());
    }

    @Test
    public void testGetActorByID(){
        actor.setFirstName("John");
        actor.setLastName("Smith");

        when(actorRepo.findById(id))
                .thenReturn(Optional.of(actor));

        Actor found= actorService.getActorByID(id);

        Assertions.assertNotNull(found);
        Assertions.assertEquals("John", found.getFirstName());
        Assertions.assertEquals("Smith", found.getLastName());

    }

    @Test
    public void testGetActorByIDNotFound(){
        when(actorRepo.findById(id))
                .thenReturn(Optional.empty());

        ResponseStatusException exception= Assertions.assertThrows(ResponseStatusException.class, () -> actorService.getActorByID(id));
        Assertions.assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
    }

    @Test
    public void testCreateActor(){
        actor.setFirstName("John");
        actor.setLastName("Smith");
        actorInput.setFirstName("John");
        actorInput.setLastName("Smith");

        when(actorRepo.save(any(Actor.class))).thenReturn(actor);

        Actor createdActor = actorService.createActor(actorInput);

        Assertions.assertNotNull(createdActor);
        Assertions.assertEquals("John", createdActor.getFirstName());  // Ensure names are updated to upper case
        Assertions.assertEquals("Smith", createdActor.getLastName());
    }

    @Test
    public void testUpdateActor() {
        actor.setFirstName("Old");
        actor.setLastName("Name");

        actorInput.setFirstName("John");
        actorInput.setLastName("Smith");

        when(actorRepo.findById(id)).
                thenReturn(Optional.of(actor));

        when(actorRepo.save(any(Actor.class)))
                .then(returnsFirstArg());

        Actor updatedActor = actorService.updateActor(id, actorInput);

        Assertions.assertNotNull(updatedActor);
        Assertions.assertEquals("JOHN", updatedActor.getFirstName());
        Assertions.assertEquals("SMITH", updatedActor.getLastName());
    }

    @Test
    public void testUpdateActorNotFound() {
        actorInput.setFirstName("John");
        actorInput.setLastName("Smith");

        when(actorRepo.findById(id)).thenReturn(Optional.empty());

        ResponseStatusException exception= Assertions.assertThrows(ResponseStatusException.class, () -> actorService.updateActor(id, actorInput));
        Assertions.assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
    }

    @Test
    public void testDeleteActor(){
        when(actorRepo.findById(id))
                .thenReturn(Optional.of(actor));

        actorService.deleteActor(id);

        verify(actorRepo, times(1)).delete(actor);
    }

    @Test
    public void testDeleteActorNotFound() {
        when(actorRepo.findById(id)).
                thenReturn(Optional.empty());

        ResponseStatusException exception= Assertions.assertThrows(ResponseStatusException.class, () -> actorService.deleteActor(id));
        Assertions.assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
    }
}
