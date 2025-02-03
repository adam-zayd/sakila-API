package com.example.sakila.dto.output;

import com.example.sakila.entities.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PartialCategoryOutput{
    private Byte categoryId;
    private String name;

    public static PartialCategoryOutput from(Category category) {
        return new PartialCategoryOutput(
                category.getCategoryId(),
                category.getName());
    }
}
