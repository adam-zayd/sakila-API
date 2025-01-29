package com.example.sakila.dto.output;

import com.example.sakila.entities.Film;
import lombok.AllArgsConstructor;
import lombok.Getter;
import java.util.List;

@Getter
@AllArgsConstructor
public class FilmOutput{
    private Short id;
    private String title;
    private String description;
    private String releaseYear;
    private Short length;
    private String rating;
    private String language;

    private List<PartialActorOutput> actors;

    public static FilmOutput from(Film film){
        return new FilmOutput(
                film.getFilmId(),
                film.getTitle(),
                film.getDescription(),
                film.getReleaseYear(),
                film.getLength(),
                film.getRating(),
                film.getLanguage(),
                film.getCast()
                        .stream()
                        .map(PartialActorOutput::from)
                        .toList());
    }
}
