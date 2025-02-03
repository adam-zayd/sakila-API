package com.example.sakila.dto.output;

import com.example.sakila.entities.Streaming;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PartialStreamingOutput {
    private Short serviceId;
    private String name;

    public static PartialStreamingOutput from(Streaming streaming) {
        return new PartialStreamingOutput(
                streaming.getServiceId(),
                streaming.getName());
    }
}
