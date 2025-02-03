package com.example.sakila.services;

import com.example.sakila.entities.Film;
import com.example.sakila.repositories.ActorRepository;
import com.example.sakila.repositories.FilmRepository;
import com.example.sakila.repositories.LanguageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import com.example.sakila.dto.input.FilmInput;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FilmService {

    private final ActorRepository actorRepo;
    private final FilmRepository filmRepo;
    private final LanguageRepository languageRepo;

    @Autowired
    public FilmService(ActorRepository actorRepo, FilmRepository filmRepo, LanguageRepository languageRepo) {
        this.actorRepo= actorRepo;
        this.filmRepo= filmRepo;
        this.languageRepo= languageRepo;
    }

    private void updateFromFilmInput(Film film, FilmInput filmInput) {
        if (filmInput.getTitle() != null) {
            film.setTitle(filmInput.getTitle().toUpperCase());
        }
        if (filmInput.getDescription() != null) {
            film.setDescription(filmInput.getDescription());
        }
        if (filmInput.getReleaseYear() != null) {
            film.setReleaseYear(filmInput.getReleaseYear());
        }
        if (filmInput.getLength() != null){
            film.setLength(filmInput.getLength());
        }
        if (filmInput.getRating()!=null){
            film.setRating(filmInput.getRating());
        }
        if (filmInput.getLanguage()!=null) {
            final var language = languageRepo.findById(filmInput.getLanguage().getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid language"));
            film.setLanguage(language);
        }
        if (filmInput.getCast()== null) {
            return;
        }
        if (filmInput.getCast().isEmpty()) {
            return;
        }
        final var cast= filmInput.getCast()
                .stream()
                .map(actorId -> actorRepo
                        .findById(actorId)
                        .orElseThrow(() -> new ResponseStatusException((HttpStatus.BAD_REQUEST))))
                .collect(Collectors.toCollection(ArrayList::new));
        film.setCast(cast);
    }

    public List<Film> getAllFilms(Optional<String> title) {
        return title.map(filmRepo::findAllByTitleContainingIgnoreCase)
                .orElseGet(filmRepo::findAll);
    }

    public Film getFilmByID(Short id){
        return filmRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public Film createFilm(FilmInput filmInput){
        final var film= new Film();
        updateFromFilmInput(film, filmInput);
        return filmRepo.save(film);
    }

    public Film updateFilm(Short id, FilmInput filmInput){
        final var film= filmRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Film not found"));
        updateFromFilmInput(film, filmInput);
        return filmRepo.save(film);
    }

    public void deleteFilm(Short id){
        final var film= filmRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Film not found"));
        filmRepo.delete(film);
    }

}
