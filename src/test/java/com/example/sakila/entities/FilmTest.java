package com.example.sakila.entities;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class FilmTest {

    private Film film;

    @BeforeEach
    public void initFilm(){
        film = new Film();
    }

    @Test
    public void testFilmId(){
        assertNull(film.getFilmId());
    }

    @Test
    public void testFilmTitle(){
        assertNull(film.getTitle());
    }

    @Test
    public void testFilmDescription(){
        assertNull(film.getDescription());
    }

    @Test
    public void testFilmReleaseYear(){
        assertNull(film.getReleaseYear());
    }

    @Test
    public void testFilmLength(){
        assertNull(film.getLength());
    }

    @Test
    public void testFilmRating(){
        assertNull(film.getRating());
    }

    @Test
    public void testFilmLanguage(){
        assertNull(film.getLanguage());
    }

    @Test
    public void testFilmCast(){
        assertNull(film.getCast());
    }

    @Test
    public void testFilmCategories(){
        assertNull(film.getCategories());
    }

    @Test
    public void testFilmStreams(){
        assertNull(film.getStreams());
    }
}