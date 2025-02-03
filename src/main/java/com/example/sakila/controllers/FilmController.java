package com.example.sakila.controllers;

import com.example.sakila.dto.ValidationGroup;
import com.example.sakila.dto.input.FilmInput;
import com.example.sakila.dto.output.FilmOutput;
import com.example.sakila.services.FilmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class FilmController {
    private final FilmService filmService;

    @Autowired
    public FilmController(FilmService filmService){
        this.filmService= filmService;
    }

    @GetMapping("/films")
    public List<FilmOutput> getAllFilms(@RequestParam(required = false) Optional<String> title) {
        return filmService.getAllFilms(title)
                .stream()
                .map(FilmOutput::from)
                .toList();
    }

    @GetMapping("/films/{id}")
    public FilmOutput getFilmUsingID(@PathVariable Short id){
        return FilmOutput.from(filmService.getFilmByID(id));
    }

    @PostMapping ("/films")
    public FilmOutput createFilm(@Validated(ValidationGroup.Create.class) @RequestBody FilmInput filmInput){
        return FilmOutput.from(filmService.createFilm(filmInput));
    }

    @PutMapping("/films/{id}")
    public FilmOutput replaceFilm(@PathVariable Short id, @Validated(ValidationGroup.Replace.class) @RequestBody FilmInput filmInput){
        return FilmOutput.from(filmService.updateFilm(id, filmInput));
    }

    @PatchMapping("/films/{id}")
    public FilmOutput modifyFilm(@PathVariable Short id, @Validated(ValidationGroup.Update.class) @RequestBody FilmInput filmInput){
        return FilmOutput.from(filmService.updateFilm(id, filmInput));
    }

    @DeleteMapping("/films")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFilm(@RequestParam Short id){
        filmService.deleteFilm(id);
        }
    }
