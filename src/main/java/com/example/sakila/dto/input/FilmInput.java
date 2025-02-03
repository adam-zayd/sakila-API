package com.example.sakila.dto.input;

import static com.example.sakila.dto.ValidationGroup.*;
import jakarta.validation.constraints.*;
import com.example.sakila.entities.Language;
import lombok.Getter;
import java.util.List;

@Getter
public class FilmInput {
    @NotNull(groups= {Create.class, Replace.class}, message= "Title can not be empty")
    @Size(min= 1, max= 128, message= "Title must be between 1 and 128 characters")
    private String title;

    private String description;

    @Pattern(regexp= "\\d{4}", message= "Year must be in the format 'YYYY'")
    private String releaseYear;

    @Min(value= 1, message= "Film length must be at least 1")
    @Max(value=65535, message= "Film length can not be more than 65535")
    private Short length;

    @Pattern(regexp= "^(G|PG|PG-13|R|NC-17)$", message= "Ratings must be one of: G/PG/PG-13/R/NC-17")
    private String rating;

    @NotNull(groups= {Create.class, Replace.class}, message= "You must enter a language ID")
    private Language language;

    @NotNull(groups= {Create.class, Replace.class}, message= "You must enter a cast, it can be an empty list.")
    private List<Short> cast;

    @NotNull(groups= {Create.class, Replace.class}, message= "You must enter categories, it can be an empty list.")
    private List<Byte> categories;
}