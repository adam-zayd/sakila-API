package com.example.sakila.dto.input;

import com.example.sakila.dto.ValidationGroup;
import jakarta.validation.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Set;
import static org.junit.jupiter.api.Assertions.*;

public class ActorInputTest {

    private Validator validator;
    private ActorInput actorInput;

    @BeforeEach
    public void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
        actorInput = new ActorInput();
    }

    @Test
    public void testValidCreateInput() {
        actorInput.setFirstName("John");
        actorInput.setLastName("Smith");
        actorInput.setFilms(new ArrayList<>());

        Set<ConstraintViolation<ActorInput>> violations = validator.validate(actorInput, ValidationGroup.Create.class);

        assertEquals(0, violations.size());
    }

    @Test
    public void testValidReplaceInput() {
        actorInput.setFirstName("John");
        actorInput.setLastName("Smith");
        actorInput.setFilms(new ArrayList<>());

        Set<ConstraintViolation<ActorInput>> violations = validator.validate(actorInput, ValidationGroup.Replace.class);

        assertEquals(0, violations.size());
    }

    @Test
    public void testValidUpdateInputOnlyFirstName() {
        actorInput.setFirstName("John");

        Set<ConstraintViolation<ActorInput>> violations = validator.validate(actorInput, ValidationGroup.Update.class);

        assertEquals(0, violations.size());
    }

    @Test
    public void testValidUpdateInputOnlyLastName() {
        actorInput.setLastName("Smith");

        Set<ConstraintViolation<ActorInput>> violations = validator.validate(actorInput, ValidationGroup.Update.class);

        assertEquals(0, violations.size());
    }

    @Test
    public void testValidUpdateInputOnlyFilms() {
        actorInput.setFilms(new ArrayList<>());

        Set<ConstraintViolation<ActorInput>> violations = validator.validate(actorInput, ValidationGroup.Update.class);

        assertEquals(0, violations.size());
    }


    @Test
    public void testInvalidCreateFirstNameNull() {
        actorInput.setFirstName(null);
        actorInput.setLastName("Smith");
        actorInput.setFilms(new ArrayList<>());

        Set<ConstraintViolation<ActorInput>> violations = validator.validate(actorInput, ValidationGroup.Create.class);

        assertEquals(1, violations.size());
    }

    @Test
    public void testInvalidReplaceFirstNameNull() {
        actorInput.setFirstName(null);
        actorInput.setLastName("Smith");
        actorInput.setFilms(new ArrayList<>());

        Set<ConstraintViolation<ActorInput>> violations = validator.validate(actorInput, ValidationGroup.Replace.class);

        assertEquals(1, violations.size());
    }

    @Test
    public void testInvalidCreateFirstNameEmpty() {
        actorInput.setFirstName("");
        actorInput.setLastName("Smith");
        actorInput.setFilms(new ArrayList<>());

        Set<ConstraintViolation<ActorInput>> violations = validator.validate(actorInput, ValidationGroup.Create.class);

        assertEquals(1, violations.size());
    }

    @Test
    public void testInvalidReplaceFirstNameEmpty() {
        actorInput.setFirstName("");
        actorInput.setLastName("Smith");
        actorInput.setFilms(new ArrayList<>());

        Set<ConstraintViolation<ActorInput>> violations = validator.validate(actorInput, ValidationGroup.Replace.class);

        assertEquals(1, violations.size());
    }

    @Test
    public void testInvalidUpdateFirstNameEmpty() {
        actorInput.setFirstName("");
        actorInput.setLastName("Smith");
        actorInput.setFilms(new ArrayList<>());

        Set<ConstraintViolation<ActorInput>> violations = validator.validate(actorInput, ValidationGroup.Update.class);

        assertEquals(1, violations.size());
    }

    @Test
    public void testInvalidCreateLongFirstName() {
        actorInput.setFirstName("1234567890123456789012345678901234567890123456");//46 char - too long
        actorInput.setLastName("Smith");
        actorInput.setFilms(new ArrayList<>());

        Set<ConstraintViolation<ActorInput>> violations = validator.validate(actorInput, ValidationGroup.Create.class);

        assertEquals(1, violations.size());
    }

    @Test
    public void testInvalidReplaceLongFirstName() {
        actorInput.setFirstName("1234567890123456789012345678901234567890123456");//46 char - too long
        actorInput.setLastName("Smith");
        actorInput.setFilms(new ArrayList<>());

        Set<ConstraintViolation<ActorInput>> violations = validator.validate(actorInput, ValidationGroup.Replace.class);

        assertEquals(1, violations.size());
    }

    @Test
    public void testInvalidUpdateLongFirstName() {
        actorInput.setFirstName("1234567890123456789012345678901234567890123456");//46 char - too long
        actorInput.setLastName("Smith");
        actorInput.setFilms(new ArrayList<>());

        Set<ConstraintViolation<ActorInput>> violations = validator.validate(actorInput, ValidationGroup.Update.class);

        assertEquals(1, violations.size());
    }

    @Test
    public void testInvalidCreateLastNameNull() {
        actorInput.setLastName(null);
        actorInput.setFirstName("John");
        actorInput.setFilms(new ArrayList<>());

        Set<ConstraintViolation<ActorInput>> violations = validator.validate(actorInput, ValidationGroup.Create.class);

        assertEquals(1, violations.size());
    }

    @Test
    public void testInvalidReplaceLastNameNull() {
        actorInput.setLastName(null);
        actorInput.setFirstName("John");
        actorInput.setFilms(new ArrayList<>());

        Set<ConstraintViolation<ActorInput>> violations = validator.validate(actorInput, ValidationGroup.Replace.class);

        assertEquals(1, violations.size());
    }

    @Test
    public void testInvalidCreateLastNameEmpty() {
        actorInput.setLastName("");
        actorInput.setFirstName("John");
        actorInput.setFilms(new ArrayList<>());

        Set<ConstraintViolation<ActorInput>> violations = validator.validate(actorInput, ValidationGroup.Create.class);

        assertEquals(1, violations.size());
    }

    @Test
    public void testInvalidReplaceLastNameEmpty() {
        actorInput.setLastName("");
        actorInput.setFirstName("John");
        actorInput.setFilms(new ArrayList<>());

        Set<ConstraintViolation<ActorInput>> violations = validator.validate(actorInput, ValidationGroup.Replace.class);

        assertEquals(1, violations.size());
    }

    @Test
    public void testInvalidUpdateLastNameEmpty() {
        actorInput.setLastName("");
        actorInput.setFirstName("John");
        actorInput.setFilms(new ArrayList<>());

        Set<ConstraintViolation<ActorInput>> violations = validator.validate(actorInput, ValidationGroup.Update.class);

        assertEquals(1, violations.size());
    }

    @Test
    public void testInvalidCreateLongLastName() {
        actorInput.setLastName("1234567890123456789012345678901234567890123456");//46 char - too long
        actorInput.setFirstName("John");
        actorInput.setFilms(new ArrayList<>());

        Set<ConstraintViolation<ActorInput>> violations = validator.validate(actorInput, ValidationGroup.Create.class);

        assertEquals(1, violations.size());
    }

    @Test
    public void testInvalidReplaceLongLastName() {
        actorInput.setLastName("1234567890123456789012345678901234567890123456");//46 char - too long
        actorInput.setFirstName("John");
        actorInput.setFilms(new ArrayList<>());

        Set<ConstraintViolation<ActorInput>> violations = validator.validate(actorInput, ValidationGroup.Replace.class);

        assertEquals(1, violations.size());
    }

    @Test
    public void testInvalidUpdateLongLastName() {
        actorInput.setLastName("1234567890123456789012345678901234567890123456");//46 char - too long
        actorInput.setFirstName("John");
        actorInput.setFilms(new ArrayList<>());

        Set<ConstraintViolation<ActorInput>> violations = validator.validate(actorInput, ValidationGroup.Update.class);

        assertEquals(1, violations.size());
    }

    @Test
    public void testInvalidCreateFilmsNull() {
        actorInput.setFirstName("John");
        actorInput.setLastName("Smith");

        Set<ConstraintViolation<ActorInput>> violations = validator.validate(actorInput, ValidationGroup.Create.class);

        assertEquals(1, violations.size());
    }

    @Test
    public void testInvalidReplaceFilmsNull() {
        actorInput.setFirstName("John");
        actorInput.setLastName("Smith");

        Set<ConstraintViolation<ActorInput>> violations = validator.validate(actorInput, ValidationGroup.Replace.class);

        assertEquals(1, violations.size());
    }

    @Test
    public void testInvalidUpdateFilmsNull() {
        actorInput.setFirstName("John");
        actorInput.setLastName("Smith");

        Set<ConstraintViolation<ActorInput>> violations = validator.validate(actorInput, ValidationGroup.Update.class);

        assertEquals(0, violations.size());
    }
}
