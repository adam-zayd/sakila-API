package com.example.sakila.controllers;

import com.example.sakila.dto.input.ActorInput;
import com.example.sakila.dto.input.FilmInput;
import com.example.sakila.dto.output.ActorOutput;
import com.example.sakila.dto.output.FilmOutput;
import com.example.sakila.entities.Actor;
import com.example.sakila.entities.Film;
import com.example.sakila.repositories.ActorRepository;
import com.example.sakila.repositories.FilmRepository;
import com.example.sakila.repositories.LanguageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.Optional;

@RestController
public class FilmController {
    private FilmRepository filmRepo;
    private ActorRepository actorRepo;
    private LanguageRepository languageRepo;

    @Autowired
    public FilmController(FilmRepository filmRepo, ActorRepository actorRepo, LanguageRepository languageRepo){
        this.actorRepo= actorRepo;
        this.filmRepo= filmRepo;
        this.languageRepo = languageRepo;
    }

    @GetMapping("/films")
    public List<FilmOutput> getAllFilms(@RequestParam(required = false) Optional<String> title){
        return title.map(value -> filmRepo.findAllByTitleContainingIgnoreCase(value))
                .orElseGet(()->filmRepo.findAll())
                .stream()
                .map(FilmOutput::from)
                .toList();
    }

    @GetMapping("/films/{id}")
    public FilmOutput getFilmUsingID(@PathVariable Short id){
        return  filmRepo.findById(id)
                .map(FilmOutput::from)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }


    @PostMapping ("/films")
    public FilmOutput createFilm(@RequestBody FilmInput filmInput) {
        final var film= new Film();
        film.setTitle(filmInput.getTitle().toUpperCase());
        film.setDescription(filmInput.getDescription());
        film.setReleaseYear(filmInput.getReleaseYear());
        film.setLength(filmInput.getLength());
        film.setRating(filmInput.getRating());

        final var language = languageRepo.findById(filmInput.getLanguage().getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid language"));
        film.setLanguage(language);

        final var cast= filmInput.getCast()
                .stream()
                .map(actorId -> actorRepo
                        .findById(actorId)
                        .orElseThrow(()-> new ResponseStatusException((HttpStatus.BAD_REQUEST))))
                .toList();

        film.setCast(cast);
        final var saved= filmRepo.save(film);
        return FilmOutput.from(saved);
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
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFilm(@RequestParam Short id){
            final var film = filmRepo.findById(id)
                                      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Film not found"));
            filmRepo.delete(film);
        }
    }
