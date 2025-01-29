package com.example.sakila.dto.output;

import com.example.sakila.entities.Film;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PartialFilmOutput{
    private Short filmId;
    private String title;

    public static PartialFilmOutput from(Film film){
        return new PartialFilmOutput(
                film.getFilmId(),
                film.getTitle());
        }
    }
