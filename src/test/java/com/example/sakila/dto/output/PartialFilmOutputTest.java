package com.example.sakila.dto.output;

import com.example.sakila.entities.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions;

import java.util.List;

public class PartialFilmOutputTest {

    private Film film;
    private Language language;
    @BeforeEach
    public void init() {
        language= new Language();
        film = new Film();
    }

    @Test
    public void testFrom() {
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

        PartialFilmOutput output = PartialFilmOutput.from(film);

        Assertions.assertNotNull(output);
        Assertions.assertEquals(film.getFilmId(),output.getFilmId());
        Assertions.assertEquals(film.getTitle(),output.getTitle());
    }
}