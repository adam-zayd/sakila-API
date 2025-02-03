package com.example.sakila.dto.output;

import com.example.sakila.entities.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class CategoryOutput{
    private Byte id;
    private String name;
    private List<PartialFilmOutput> films;

    public static CategoryOutput from(Category category){
        return new CategoryOutput(
                category.getCategoryId(),
                category.getName(),
                category.getFilms()
                        .stream()
                        .map(PartialFilmOutput::from)
                        .toList());
    }
}
