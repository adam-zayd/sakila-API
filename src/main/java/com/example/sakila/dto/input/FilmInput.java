package com.example.sakila.dto.input;

import static com.example.sakila.dto.ValidationGroup.*;
import jakarta.validation.constraints.*;
import com.example.sakila.entities.Language;
import lombok.Getter;
import java.util.List;

@Getter
public class FilmInput {
    @NotNull(groups={Create.class})
    @Size(min=1, max=128)
    private String title;

    private String description;

    @NotNull(groups={Create.class})
    private String releaseYear;

    @NotNull(groups={Create.class})
    private Short length;

    private String rating;

    @NotNull(groups={Create.class})
    private Language language;

    private List<Short> cast;
}