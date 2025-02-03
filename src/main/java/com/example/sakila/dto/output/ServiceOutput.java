package com.example.sakila.dto.output;

import com.example.sakila.entities.Service;
import lombok.AllArgsConstructor;
import lombok.Getter;
import java.util.List;

@Getter
@AllArgsConstructor
public class ServiceOutput{
    private Short id;
    private String name;
    private String website;
    private float cost;
    private List<PartialFilmOutput> films;

    public static ServiceOutput from(Service service){
        return new ServiceOutput(
                service.getServiceId(),
                service.getName(),
                service.getWebsite(),
                service.getCost(),
                service.getFilms()
                        .stream()
                        .map(PartialFilmOutput::from)
                        .toList());
    }
}
