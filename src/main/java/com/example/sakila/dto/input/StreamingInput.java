package com.example.sakila.dto.input;

import com.example.sakila.dto.ValidationGroup;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;

import java.util.List;

@Getter
public class StreamingInput {
        @NotNull(groups= {ValidationGroup.Create.class, ValidationGroup.Replace.class}, message= "You must enter a Name")
        @Size(min= 1,max= 45, message= "First name must be between 1 and 45 characters")
        private String name;

        @NotNull (groups= {ValidationGroup.Create.class, ValidationGroup.Replace.class}, message= "You must enter a Last Name")
        @Size(min= 1,max= 255, message= "Last name must be between 1 and 255 characters")
        private String website;

        @Digits(integer= 3,fraction= 2)
        private Float cost;

        @NotNull(groups= {ValidationGroup.Create.class, ValidationGroup.Replace.class}, message= "You must enter films, it can be an empty list.")
        private List<Short> films;
    }
