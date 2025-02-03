package com.example.sakila.entities;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name="service")
@Getter
@Setter
public class Streaming {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @Column(name="service_id")
    private Short serviceId;

    @Column(name="name")
    private String name;

    @Column(name="website")
    private String website;

    @Column(name="cost_per_month")
    private float cost;

    @ManyToMany
    @JoinTable(
            name="film_service",
            joinColumns = {@JoinColumn(name="service_id")},
            inverseJoinColumns= {@JoinColumn(name="film_id")}
    )
    private List<Film> films;
}