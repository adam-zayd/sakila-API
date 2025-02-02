package com.example.sakila.services;

import com.example.sakila.dto.output.FilmOutput;
import com.example.sakila.entities.Actor;
import com.example.sakila.entities.Film;
import com.example.sakila.repositories.ActorRepository;
import com.example.sakila.repositories.FilmRepository;
import com.example.sakila.repositories.LanguageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import com.example.sakila.dto.input.FilmInput;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.server.ResponseStatusException;
import com.example.sakila.repositories.LanguageRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FilmService {

    private final ActorRepository actorRepo;
    private final FilmRepository filmRepo;
    private LanguageRepository languageRepo;

    @Autowired
    public FilmService(ActorRepository actorRepo, FilmRepository filmRepo) {
        this.actorRepo= actorRepo;
        this.filmRepo= filmRepo;
        this.languageRepo= languageRepo;
    }

    public List<Film> getAllFilms(Optional<String> title) {
        return title.map(filmRepo::findAllByTitleContainingIgnoreCase)
                .orElseGet(filmRepo::findAll);
    }

    public Film getFilmByID(Short id){
        return filmRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public void deleteFilm(Short id){
        final var film= filmRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Film not found"));
        filmRepo.delete(film);
    }

}
