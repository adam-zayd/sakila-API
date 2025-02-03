package com.example.sakila.dto.output;

import com.example.sakila.entities.Service;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PartialServiceOutput{
    private Short serviceId;
    private String name;

    public static PartialServiceOutput from(Service service) {
        return new PartialServiceOutput(
                service.getServiceId(),
                service.getName());
    }
}
