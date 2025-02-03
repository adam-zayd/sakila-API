package com.example.sakila.dto.output;

import com.example.sakila.entities.Streaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import java.util.List;

@Getter
@AllArgsConstructor
public class StreamingOutput {
    private Short id;
    private String name;
    private String website;
    private float cost;
    private List<PartialFilmOutput> films;

    public static StreamingOutput from(Streaming streaming){
        return new StreamingOutput(
                streaming.getServiceId(),
                streaming.getName(),
                streaming.getWebsite(),
                streaming.getCost(),
                streaming.getFilms()
                        .stream()
                        .map(PartialFilmOutput::from)
                        .toList());
    }
}
