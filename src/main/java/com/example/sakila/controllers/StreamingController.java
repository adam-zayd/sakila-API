package com.example.sakila.controllers;

import com.example.sakila.dto.ValidationGroup;
import com.example.sakila.dto.input.StreamingInput;
import com.example.sakila.dto.output.StreamingOutput;
import com.example.sakila.services.StreamingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static com.example.sakila.dto.ValidationGroup.Update;

@RestController
public class StreamingController {
    private final StreamingService streamingService;

    @Autowired
    public StreamingController(StreamingService streamingService){
        this.streamingService= streamingService;
    }

    @GetMapping("/streams")
    public List<StreamingOutput> getAllStreamings(@RequestParam(required = false) Optional<String> name) {
        return streamingService.getAllStreamings(name)
                .stream()
                .map(StreamingOutput::from)
                .toList();
    }

    @GetMapping("/streams/{id}")
    public StreamingOutput getStreamingUsingId(@PathVariable Short id) {
        return StreamingOutput.from(streamingService.getStreamingByID(id));
    }


    @PostMapping ("/streams")
    public StreamingOutput createStreaming(@Validated(ValidationGroup.Create.class) @RequestBody StreamingInput streamingInput){
        return StreamingOutput.from(streamingService.createStreaming(streamingInput));
    }

    @PutMapping("/streams/{id}")
    public StreamingOutput replaceStreaming(@PathVariable Short id, @Validated(ValidationGroup.Replace.class) @RequestBody StreamingInput streamingInput){
        return StreamingOutput.from(streamingService.updateStreaming(id, streamingInput));
    }

    @PatchMapping("/streams/{id}")
    public StreamingOutput modifyStreaming(@PathVariable Short id, @Validated(Update.class) @RequestBody StreamingInput streamingInput){
        return StreamingOutput.from(streamingService.updateStreaming(id, streamingInput));
    }

    @DeleteMapping("/streams")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteStreaming(@RequestParam Short id){
        streamingService.deleteStreaming(id);
    }
}
