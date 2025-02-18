package com.example.sakila.services;

import com.example.sakila.entities.Film;
import com.example.sakila.repositories.*;
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
    private final CategoryRepository categoryRepo;
    private final StreamingRepository streamingRepo;

    @Autowired
    public FilmService(ActorRepository actorRepo, FilmRepository filmRepo, LanguageRepository languageRepo, CategoryRepository categoryRepo, StreamingRepository streamingRepo) {
        this.actorRepo= actorRepo;
        this.filmRepo= filmRepo;
        this.languageRepo= languageRepo;
        this.categoryRepo= categoryRepo;
        this.streamingRepo= streamingRepo;
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
        if (filmInput.getLength() != null) {
            film.setLength(filmInput.getLength());
        }
        if (filmInput.getRating() != null) {
            film.setRating(filmInput.getRating());
        } else {
            film.setRating("G");
        }
        if (filmInput.getLanguage() != null) {
            if (filmInput.getLanguage().getId() == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Language ID cannot be null");
            }
            final var language = languageRepo.findById(filmInput.getLanguage().getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid language"));
            film.setLanguage(language);
        }
        if (filmInput.getCategories() != null) {
            final var categories = filmInput.getCategories()
                    .stream()
                    .map(categoryId -> categoryRepo
                            .findById(categoryId)
                            .orElseThrow(() -> new ResponseStatusException((HttpStatus.BAD_REQUEST),"Category ID invalid: "+categoryId)))
                    .collect(Collectors.toCollection(ArrayList::new));
            film.setCategories(categories);

        }
        if (filmInput.getCast() != null) {
            final var cast = filmInput.getCast()
                    .stream()
                    .map(actorId -> actorRepo
                            .findById(actorId)
                            .orElseThrow(() -> new ResponseStatusException((HttpStatus.BAD_REQUEST),"Actor ID invalid: "+actorId)))
                    .collect(Collectors.toCollection(ArrayList::new));
            film.setCast(cast);
        }
        if (filmInput.getStreams() != null) {
            final var streams = filmInput.getStreams()
                    .stream()
                    .map(serviceId -> streamingRepo
                            .findById(serviceId)
                            .orElseThrow(() -> new ResponseStatusException((HttpStatus.BAD_REQUEST),"Stream ID invalid: "+serviceId)))
                    .collect(Collectors.toCollection(ArrayList::new));
            film.setStreams(streams);
        }
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
