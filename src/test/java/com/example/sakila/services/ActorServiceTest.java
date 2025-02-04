package com.example.sakila.services;

import com.example.sakila.entities.Actor;
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
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ActorServiceTest{

    @Mock
    private ActorRepository actorRepo;
    @Mock
    private FilmRepository filmRepo;
    @InjectMocks
    private ActorService actorService;

    @BeforeEach
    public void setUp() {
    }

    @Test
    public void testGetAllActorsWithName() {
        Actor actor = new Actor();
        actor.setFirstName("John");
        actor.setLastName("Smith");

        Actor secondActor= new Actor();
        secondActor.setFirstName("Joseph");

        Actor thirdActor= new Actor();
        thirdActor.setLastName("Jonjo");

        List<Actor> mockRepoReturn = new ArrayList<>();
        mockRepoReturn.add(actor);
        mockRepoReturn.add(secondActor);
        mockRepoReturn.add(thirdActor);

        when(actorRepo.findAllByFullNameContainingIgnoreCase("JO"))
                .thenReturn(mockRepoReturn);

        List<Actor> actors = actorService.getAllActors(Optional.of("JO"));

        Assertions.assertNotNull(actors);
        Assertions.assertEquals(3, actors.size());
        Assertions.assertEquals("John", actors.get(0).getFirstName());
        Assertions.assertEquals("Joseph", actors.get(1).getFirstName());
        Assertions.assertEquals("Jonjo", actors.get(2).getLastName());
    }

    @Test
    public void testGetAllActorsWithoutName() {
        Actor actor = new Actor();
        actor.setFirstName("John");
        actor.setLastName("Smith");

        Actor secondActor= new Actor();
        secondActor.setFirstName("Joseph");
        secondActor.setLastName("Jonjo");

        List<Actor> mockRepoReturn = new ArrayList<>();
        mockRepoReturn.add(actor);
        mockRepoReturn.add(secondActor);

        when(actorRepo.findAllByFullNameContainingIgnoreCase(""))
                .thenReturn(mockRepoReturn);

        List<Actor> actors = actorService.getAllActors(Optional.of(""));

        Assertions.assertNotNull(actors);
        Assertions.assertEquals(2, actors.size());
        Assertions.assertEquals("John", actors.get(0).getFirstName());
        Assertions.assertEquals("Smith", actors.get(0).getLastName());
        Assertions.assertEquals("Joseph", actors.get(1).getFirstName());
        Assertions.assertEquals("Jonjo", actors.get(1).getLastName());
    }

    @Test
    public void testGetAllActorsWithNonExistentName() {
        List<Actor> mockRepoReturn = new ArrayList<>();

        when(actorRepo.findAllByFullNameContainingIgnoreCase("Bob"))
                .thenReturn(mockRepoReturn);

        List<Actor> actors = actorService.getAllActors(Optional.of("Bob"));

        Assertions.assertNotNull(actors);
        Assertions.assertEquals(0, actors.size());
    }

}
