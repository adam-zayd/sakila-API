package com.example.sakila.entities;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name="category")
@Getter
@Setter
public class Category {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @Column(name="category_id")
    private Byte categoryId;

    @Column(name="name")
    private String name;

    @ManyToMany
    @JoinTable(
            name="film_category",
            joinColumns = {@JoinColumn(name="category_id")},
            inverseJoinColumns= {@JoinColumn(name="film_id")}
    )
    private List<Film> films;
}
