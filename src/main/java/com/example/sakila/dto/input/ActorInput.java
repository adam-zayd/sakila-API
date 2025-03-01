package com.example.sakila.dto.input;

import static com.example.sakila.dto.ValidationGroup.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ActorInput {
    @NotNull(groups= {Create.class, Replace.class}, message= "You must enter a First Name")
    @Size(min= 1,max= 45, message= "First name must be between 1 and 45 characters")
    private String firstName;

    @NotNull (groups= {Create.class, Replace.class}, message= "You must enter a Last Name")
    @Size(min= 1,max= 45, message= "Last name must be between 1 and 45 characters")
    private String lastName;

    @NotNull(groups= {Create.class, Replace.class}, message= "You must enter films, it can be an empty list.")
    private List<Short> films;
}
