package com.example.sakila.dto.output;

import com.example.sakila.entities.Actor;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions;

import java.util.ArrayList;

public class PartialActorOutputTest {

    private Actor actor;

    @BeforeAll
    public static void setUp() {
    }

    @BeforeEach
    public void init() {
        actor = new Actor();
    }

    @Test
    public void testFrom() {
        actor.setFirstName("John");
        actor.setLastName("Smith");
        actor.setFilms(new ArrayList<>());

        PartialActorOutput output = PartialActorOutput.from(actor);

        Assertions.assertNotNull(output);
        Assertions.assertEquals(actor.getActorId(),output.getActorId());
        Assertions.assertEquals(actor.getFullName(),output.getFullName());
    }
}