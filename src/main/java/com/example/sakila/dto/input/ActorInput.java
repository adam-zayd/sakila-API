package com.example.sakila.dto.input;

import static com.example.sakila.dto.ValidationGroup.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;

import java.util.List;

@Getter
public class ActorInput {
    @NotNull(groups={Create.class})
    @Size(min=1,max=45)
    private String firstName;

    @NotNull
    @Size(min=1,max=45)
    private String lastName;

    private List<Short> films;
}
