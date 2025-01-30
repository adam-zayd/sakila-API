package com.example.sakila.dto.input;

import com.example.sakila.entities.Language;
import lombok.Getter;
import java.util.List;

@Getter
public class FilmInput {

    private String title;
    private String description;
    private String releaseYear;
    private Short length;
    private String rating;
    private Language language;
    private List<Short> cast;
}