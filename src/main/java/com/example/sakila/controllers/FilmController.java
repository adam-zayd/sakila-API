package com.example.sakila.controllers;

import com.example.sakila.entities.Actor;
import com.example.sakila.entities.Film;
import com.example.sakila.repositories.FilmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
public class FilmController {
    private FilmRepository filmRepo;

    @Autowired
    public FilmController(FilmRepository filmRepo){
        this.filmRepo= filmRepo;
    }

    @GetMapping("/films")
    public List<Film> getAllFilms(){
        return filmRepo.findAll();
    }

    @GetMapping("/films/{id}")
    public Film getFilmUsingID(@PathVariable Short id){
        return filmRepo.findById(id)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }


    @PostMapping ("/films")
    public Film createFilm(@RequestBody Film film) {
        return filmRepo.save(film);
    }

    @PutMapping ("/films")
    public String replaceFilm(){
        return "Updates a film by replacing with req body";
    }

    @PatchMapping("/films")
    public String updateFilm(){
        return "updates film by modifying fields using req body";
    }

    @DeleteMapping("/films")
    public String deleteFilm(@RequestParam Short id){
        return "deletes film using film_id";
    }
}