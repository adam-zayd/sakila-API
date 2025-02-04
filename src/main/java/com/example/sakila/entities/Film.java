package com.example.sakila.entities;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name="film")
@Getter
@Setter
public class Film {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @Column(name="film_id")
    private Short filmId;

    @Column(name="title")
    private String title;

    @Column(name="Description")
    private String description;

    @Column(name="release_year")
    private String releaseYear;

    @Column(name="length")
    private Short length;

    @Column(name="rating")
    private String rating;

    @ManyToOne
    @JoinColumn(name="language_id")
    private Language language;

    @ManyToMany
    @JoinTable(
            name="film_actor",
            joinColumns = {@JoinColumn(name="film_id")},
            inverseJoinColumns= {@JoinColumn(name="actor_id")}
    )
    private List<Actor> cast;

    @ManyToMany
    @JoinTable(
            name="film_category",
            joinColumns = {@JoinColumn(name="film_id")},
            inverseJoinColumns= {@JoinColumn(name="category_id")}
    )
    private List<Category> categories;

    @ManyToMany
    @JoinTable(
            name="film_service",
            joinColumns = {@JoinColumn(name="film_id")},
            inverseJoinColumns= {@JoinColumn(name="service_id")}
    )
    private List<Streaming> streams;
}
