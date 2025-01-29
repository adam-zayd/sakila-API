package com.example.sakila.dto.output;

import com.example.sakila.entities.Actor;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PartialActorOutput{
    private Short actorId;
    private String fullName;

    public static PartialActorOutput from(Actor actor) {
        return new PartialActorOutput(
                actor.getActorId(),
                actor.getFullName());
    }
}
