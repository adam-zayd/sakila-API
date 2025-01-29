package com.example.sakila.entities;

import jakarta.persistence.*;
import lombok.Getter;

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

}
