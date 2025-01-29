package com.example.sakila.entities;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Table(name="film")
@Getter
public class Film {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
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

}
