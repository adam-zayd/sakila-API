package com.example.sakila.entities;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class ActorTest {

    private Actor actor;

    @BeforeEach
    void initActor(){
        actor = new Actor();
    }

    @Test
    void testActorId(){
        assertNull(actor.getActorId(), "Actor ID should be null");
    }

    @Test
    void testNullFirstName(){
        assertNull(actor.getFirstName(), "First name should be null");
    }

    @Test
    void testNullLastName(){
        assertNull(actor.getLastName(), "Last name should be null");
    }

    @Test
    void testNullFullName(){
        assertEquals("null null", actor.getFullName(),"Full name should be null");
    }

    @Test
    void testFirstName(){
        actor.setFirstName("John");
        assertEquals("John", actor.getFirstName(), "First name should be John");
    }

    @Test
    void testLastName(){
        actor.setLastName("Smith");
        assertEquals("Smith", actor.getLastName(), "Last name should be Smith");
    }

    @Test
    void testFullName(){
        actor.setFirstName("John");
        actor.setLastName("Smith");
        assertEquals("John Smith", actor.getFullName(), "Full name should be John Smith");
    }
}