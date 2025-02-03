package com.example.sakila.dto.output;

import com.example.sakila.entities.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CategoryOutput{
    private Byte id;
    private String name;

    public static CategoryOutput from(Category category){
        return new CategoryOutput(
                category.getCategoryId(),
                category.getName());
    }
}
