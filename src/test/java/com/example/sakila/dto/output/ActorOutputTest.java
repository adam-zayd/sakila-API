package com.example.sakila.dto.output;

import com.example.sakila.entities.Actor;
import com.example.sakila.entities.Film;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions;

import java.util.ArrayList;
import java.util.List;

public class ActorOutputTest {

    private Actor actor;

    @BeforeAll
    public static void setUp() {
    }

    @BeforeEach
    public void init() {
        actor = new Actor();
    }

    @Test
    public void testFromWithFilms() {
        Film film1 = new Film();
        film1.setTitle("Harry Potter");

        Film film2 = new Film();
        film2.setTitle("Harry Potter 2");

        actor.setFirstName("John");
        actor.setLastName("Smith");
        actor.setFilms(List.of(film1, film2));

        ActorOutput output = ActorOutput.from(actor);

        Assertions.assertNotNull(output);
        Assertions.assertEquals(output.getFirstName(), actor.getFirstName());
        Assertions.assertEquals(output.getLastName(), actor.getLastName());
        Assertions.assertEquals(2, output.getFilms().size());
        Assertions.assertEquals(output.getFilms().get(0).getFilmId(), film1.getFilmId());
        Assertions.assertEquals(output.getFilms().get(1).getFilmId(), film2.getFilmId());
    }

    @Test
    public void testFromWithoutFilms() {
        actor.setFirstName("John");
        actor.setLastName("Smith");
        actor.setFilms(new ArrayList<>());

        ActorOutput output = ActorOutput.from(actor);

        Assertions.assertNotNull(output);
        Assertions.assertEquals(output.getFirstName(), actor.getFirstName());
        Assertions.assertEquals(output.getLastName(), actor.getLastName());
        Assertions.assertEquals(0, output.getFilms().size());
    }
}
