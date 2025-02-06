package com.example.sakila.dto.output;

import com.example.sakila.entities.*;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions;

import java.util.ArrayList;
import java.util.List;

public class FilmOutputTest {

    private Film film;
    private Language language;

    @BeforeAll
    public static void setUp() {
    }

    @BeforeEach
    public void init() {
        film = new Film();
        language= new Language();
    }

    @Test
    public void testFromWithCastCategoryStreamsAndMinimal() {
        Actor actor1= new Actor();
        actor1.setFirstName("John");
        actor1.setLastName("Smith");
        actor1.setFilms(List.of(film));

        Actor actor2= new Actor();
        actor2.setFirstName("John2");
        actor2.setLastName("Smith2");
        actor2.setFilms(List.of(film));

        Category category= new Category();
        category.setName("Fantasy");
        category.setFilms(List.of(film));

        Streaming streaming= new Streaming();
        streaming.setName("Disney Plus");
        streaming.setWebsite("https://www.disneyplus.com");
        streaming.setFilms(List.of(film));

        film.setTitle("Harry Potter");
        film.setLanguage(language);
        film.setCast(List.of(actor1, actor2));
        film.setCategories(List.of(category));
        film.setStreams(List.of(streaming));

        FilmOutput output = FilmOutput.from(film);

        Assertions.assertNotNull(output);
        Assertions.assertEquals("Harry Potter", output.getTitle());
        Assertions.assertNotNull(output.getLanguage());
        Assertions.assertEquals(2, output.getActors().size());
        Assertions.assertEquals(actor1.getActorId(), output.getActors().get(0).getActorId());
        Assertions.assertEquals("John Smith", output.getActors().get(0).getFullName());
        Assertions.assertEquals(actor2.getActorId(), output.getActors().get(1).getActorId());
        Assertions.assertEquals("John2 Smith2", output.getActors().get(1).getFullName());
        Assertions.assertEquals(1, output.getCategories().size());
        Assertions.assertEquals(category.getCategoryId(), output.getCategories().getFirst().getCategoryId());
        Assertions.assertEquals("Fantasy", output.getCategories().getFirst().getName());
        Assertions.assertEquals(1, output.getStreams().size());
        Assertions.assertEquals(streaming.getServiceId(), output.getStreams().getFirst().getServiceId());
        Assertions.assertEquals("Disney Plus", output.getStreams().getFirst().getName());
        Assertions.assertNull(output.getDescription());
        Assertions.assertNull(output.getReleaseYear());
        Assertions.assertNull(output.getLength());
        Assertions.assertNull(output.getRating());
    }

    @Test
    public void testFromWithoutCastCategoryStreamsAndMinimal() {
        film.setTitle("Harry Potter");
        film.setLanguage(language);
        film.setCast(new ArrayList<Actor>());
        film.setCategories(new ArrayList<Category>());
        film.setStreams(new ArrayList<Streaming>());

        FilmOutput output = FilmOutput.from(film);

        Assertions.assertNotNull(output);
        Assertions.assertEquals("Harry Potter", output.getTitle());
        Assertions.assertNotNull(output.getLanguage());
        Assertions.assertEquals(0, output.getActors().size());
        Assertions.assertEquals(0, output.getCategories().size());
        Assertions.assertEquals(0, output.getStreams().size());
    }

    @Test
    public void testFromWithAll() {
        String description= "Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends, Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry. The main story arc concerns Harry's conflict with Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic, and subjugate all wizards and Muggles (non-magical people).";
        String releaseYear= "2001";
        Short length= 152;
        String rating= "PG";

        Actor actor1= new Actor();
        actor1.setFirstName("John");
        actor1.setLastName("Smith");
        actor1.setFilms(List.of(film));

        Actor actor2= new Actor();
        actor2.setFirstName("John2");
        actor2.setLastName("Smith2");
        actor2.setFilms(List.of(film));

        Category category= new Category();
        category.setName("Fantasy");
        category.setFilms(List.of(film));

        Streaming streaming= new Streaming();
        streaming.setName("Disney Plus");
        streaming.setWebsite("https://www.disneyplus.com");
        streaming.setFilms(List.of(film));

        film.setTitle("Harry Potter");
        film.setDescription(description);
        film.setReleaseYear(releaseYear);
        film.setLength(length);
        film.setRating(rating);
        film.setLanguage(language);
        film.setCast(List.of(actor1, actor2));
        film.setCategories(List.of(category));
        film.setStreams(List.of(streaming));

        FilmOutput output = FilmOutput.from(film);

        Assertions.assertNotNull(output);
        Assertions.assertEquals("Harry Potter", output.getTitle());
        Assertions.assertEquals(description, output.getDescription());
        Assertions.assertEquals(releaseYear, output.getReleaseYear());
        Assertions.assertEquals(length, output.getLength());
        Assertions.assertEquals(rating, output.getRating());
        Assertions.assertNotNull(output.getLanguage());
        Assertions.assertEquals(2, output.getActors().size());
        Assertions.assertEquals(actor1.getActorId(), output.getActors().get(0).getActorId());
        Assertions.assertEquals("John Smith", output.getActors().get(0).getFullName());
        Assertions.assertEquals(actor2.getActorId(), output.getActors().get(1).getActorId());
        Assertions.assertEquals("John2 Smith2", output.getActors().get(1).getFullName());
        Assertions.assertEquals(1, output.getCategories().size());
        Assertions.assertEquals(category.getCategoryId(), output.getCategories().getFirst().getCategoryId());
        Assertions.assertEquals("Fantasy", output.getCategories().getFirst().getName());
        Assertions.assertEquals(1, output.getStreams().size());
        Assertions.assertEquals(streaming.getServiceId(), output.getStreams().getFirst().getServiceId());
        Assertions.assertEquals("Disney Plus", output.getStreams().getFirst().getName());
    }
}