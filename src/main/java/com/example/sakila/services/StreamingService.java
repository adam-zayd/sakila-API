package com.example.sakila.services;

import com.example.sakila.dto.input.StreamingInput;
import com.example.sakila.entities.Streaming;
import com.example.sakila.repositories.FilmRepository;
import com.example.sakila.repositories.StreamingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StreamingService {

    private final StreamingRepository streamingRepo;
    private final FilmRepository filmRepo;

    @Autowired
    public StreamingService(StreamingRepository streamingRepo, FilmRepository filmRepo) {
        this.streamingRepo= streamingRepo;
        this.filmRepo= filmRepo;
    }

    private void updateFromStreamingInput(Streaming streaming, StreamingInput streamingInput) {
        if (streamingInput.getName()!= null) {
            streaming.setName(streamingInput.getName().toUpperCase());
        }
        if (streamingInput.getWebsite()!= null) {
            streaming.setWebsite(streamingInput.getWebsite());
        }
        if (streamingInput.getCost() != null) {
            streaming.setCost(streamingInput.getCost());
        }

        if (streamingInput.getFilms()!= null) {
            final var films = streamingInput.getFilms()
                    .stream()
                    .map(filmId -> filmRepo.findById(filmId)
                            .orElseThrow(() -> new ResponseStatusException((HttpStatus.BAD_REQUEST))))
                    .collect(Collectors.toCollection(ArrayList::new));
            streaming.setFilms(films);
        }
    }

    public List<Streaming> getAllStreamings(Optional<String> name){
        return name.map(streamingRepo::findAllByNameContainingIgnoreCase)
                .orElseGet(streamingRepo::findAll);
    }

    public Streaming getStreamingByID(Short id){
        return streamingRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }


    public Streaming createStreaming(StreamingInput streamingInput){
        final var streaming= new Streaming();
        updateFromStreamingInput(streaming, streamingInput);
        return streamingRepo.save(streaming);
    }

    public Streaming updateStreaming(Short id, StreamingInput streamingInput){
        final var streaming= streamingRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Stream not found"));
        updateFromStreamingInput(streaming, streamingInput);
        return streamingRepo.save(streaming);
    }

    public void deleteStreaming(Short id){
        final var streaming= streamingRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Stream not found"));
        streamingRepo.delete(streaming);
    }
}

