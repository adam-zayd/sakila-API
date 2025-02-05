package com.example.sakila.controllers;

import com.example.sakila.dto.ValidationGroup;
import com.example.sakila.dto.input.ActorInput;
import com.example.sakila.dto.output.ActorOutput;
import com.example.sakila.services.ActorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import static com.example.sakila.dto.ValidationGroup.Update;
import java.util.List;
import java.util.Optional;

@RestController
public class ActorController {
    private final ActorService actorService;

    @Autowired
    public ActorController(ActorService actorService){
        this.actorService= actorService;
    }

    @GetMapping("/actors")
    public List<ActorOutput> getAllActors(@RequestParam(required = false) Optional<String> name) {
        return actorService.getAllActors(name)
                .stream()
                .map(ActorOutput::from)
                .toList();
    }

    @GetMapping("/actors/{id}")
    public ActorOutput getActorUsingId(@PathVariable Short id) {
        return ActorOutput.from(actorService.getActorByID(id));
    }


    @PostMapping ("/actors")
    public ActorOutput createActor(@Validated(ValidationGroup.Create.class) @RequestBody ActorInput actorInput){
        return ActorOutput.from(actorService.createActor(actorInput));
    }

    @PutMapping("/actors/{id}")
    public ActorOutput replaceActor(@PathVariable Short id, @Validated(ValidationGroup.Replace.class) @RequestBody ActorInput actorInput){
        return ActorOutput.from(actorService.updateActor(id, actorInput));
    }
    
    @PatchMapping("/actors/{id}")
    public ActorOutput modifyActor(@PathVariable Short id, @Validated(ValidationGroup.Update.class) @RequestBody ActorInput actorInput){
        return ActorOutput.from(actorService.updateActor(id, actorInput));
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/actors")
    public void deleteActor(@RequestParam Short id){
        actorService.deleteActor(id);
    }
}
