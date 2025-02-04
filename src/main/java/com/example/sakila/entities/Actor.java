package com.example.sakila.entities;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Formula;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="actor")
@Getter
@Setter
public class Actor {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @Column(name="actor_id")
    private Short actorId;

    @Column(name="first_name")
    private String firstName;

    @Column(name="last_name")
    private String lastName;

    @ManyToMany
    @JoinTable(
            name="film_actor",
            joinColumns = {@JoinColumn(name="actor_id")},
            inverseJoinColumns= {@JoinColumn(name="film_id")}
    )
    private List<Film> films;

    @Formula("concat(first_name, ' ', last_name)")
    @Setter(AccessLevel.NONE)
    private String fullName;

    public String getFullName(){
        return firstName + " " + lastName;
    }
}
