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

//    @GetMapping("/films")
//    public List<FilmOutput> getAllFilms(@RequestParam(required= false) Optional<String> title){
//        return title.map(value -> filmRepo.findAllByTitleContainingIgnoreCase(value))
//                .orElseGet(()->filmRepo.findAll())
//                .stream()
//                .map(FilmOutput::from)
//                .toList();
//    }

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

//    @PostMapping ("/films")
//    public FilmOutput createFilm(@Validated(ValidationGroup.Create.class) @RequestBody FilmInput filmInput){
//        final var film= new Film();
//        film.setTitle(filmInput.getTitle().toUpperCase());
//        film.setDescription(filmInput.getDescription());
//        film.setReleaseYear(filmInput.getReleaseYear());
//        film.setLength(filmInput.getLength());
//        film.setRating(filmInput.getRating());
//
//        final var language= languageRepo.findById(filmInput.getLanguage().getId())
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid language"));
//        film.setLanguage(language);
//
//        final var cast= filmInput.getCast()
//                .stream()
//                .map(actorId -> actorRepo
//                        .findById(actorId)
//                        .orElseThrow(() -> new ResponseStatusException((HttpStatus.BAD_REQUEST))))
//                .toList();
//
//        film.setCast(cast);
//        final var saved= filmRepo.save(film);
//        return FilmOutput.from(saved);
//    }

    @PostMapping ("/films")
    public FilmOutput createFilm(@Validated(ValidationGroup.Create.class) @RequestBody FilmInput filmInput){
        return FilmOutput.from(filmService.createFilm(filmInput));
    }

//    @PutMapping("/films/{id}")
//    public FilmOutput updateFilm(@PathVariable Short id, @Validated(ValidationGroup.Replace.class) @RequestBody FilmInput filmInput) {
//        final var film= filmRepo.findById(id)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Film not found"));
//
//        film.setTitle(filmInput.getTitle().toUpperCase());
//        film.setDescription(filmInput.getDescription());
//        film.setReleaseYear(filmInput.getReleaseYear());
//        film.setLength(filmInput.getLength());
//        film.setRating(filmInput.getRating());
//
//        final var language= languageRepo.findById(filmInput.getLanguage().getId())
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid language"));
//        film.setLanguage(language);
//
//        final var cast= filmInput.getCast()
//                .stream()
//                .map(actorId -> actorRepo.findById(actorId)
//                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Actor not found")))
//                .collect(Collectors.toCollection(ArrayList::new));
//        film.setCast(cast);
//
//        final var updatedFilm= filmRepo.save(film);
//        return FilmOutput.from(updatedFilm);
//    }

    @PutMapping("/films/{id}")
    public FilmOutput replaceFilm(@PathVariable Short id, @Validated(ValidationGroup.Replace.class) @RequestBody FilmInput filmInput){
        return FilmOutput.from(filmService.updateFilm(id, filmInput));
    }

//    @PatchMapping("/films/{id}")
//    public FilmOutput modifyFilm(@PathVariable Short id, @Validated(ValidationGroup.Update.class) @RequestBody FilmInput filmInput){
//        final var film= filmRepo.findById(id)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Film not found"));
//
//        if (filmInput.getTitle()!=null){
//            film.setTitle(filmInput.getTitle().toUpperCase());
//        }
//        if (filmInput.getDescription()!=null){
//            film.setDescription(filmInput.getDescription());
//        }
//        if (filmInput.getReleaseYear()!=null){
//            film.setReleaseYear(filmInput.getReleaseYear());
//        }
//        if (filmInput.getLength()!=null){
//            film.setLength(filmInput.getLength());
//        }
//        if (filmInput.getRating()!=null){
//            film.setRating(filmInput.getRating());
//        }
//        if (filmInput.getLanguage()!=null){
//            final var language= languageRepo.findById(filmInput.getLanguage().getId())
//                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid language"));
//            film.setLanguage(language);
//        }
//        if (filmInput.getCast()!=null){
//            final var cast= filmInput.getCast()
//                    .stream()
//                    .map(actorId -> actorRepo.findById(actorId)
//                            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Actor not found")))
//                    .collect(Collectors.toCollection(ArrayList::new));
//            film.setCast(cast);
//        }
//
//        final var updatedFilm= filmRepo.save(film);
//        return FilmOutput.from(updatedFilm);
//    }

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
