package com.example.sakila.entities;

import jakarta.persistence.*;
import lombok.Getter;
import org.hibernate.annotations.Formula;

import java.util.List;

@Entity
@Table(name="actor")
@Getter
public class Actor {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="actor_id")
    private Short actorId;

    @Column(name="first_name")
    private String firstName;

    @Column(name="last_name")
    private String lastName;

    @ManyToMany(mappedBy= "cast")
    private List<Film> films;

    @Formula("concat(first_name, ' ', last_name)")
    private String fullName;



}
