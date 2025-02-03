package com.example.sakila.dto.input;

import static com.example.sakila.dto.ValidationGroup.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;

import java.util.List;

@Getter
public class CategoryInput {
    @NotNull(groups= {Create.class, Replace.class}, message= "You must enter the Category name")
    @Size(min= 1,max= 25, message= "The name must be between 1 and 25 characters")
    private String name;

}