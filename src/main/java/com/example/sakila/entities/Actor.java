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

    @ManyToMany(mappedBy= "cast")
    //@Setter(AccessLevel.NONE)
    private List<Film> films=new ArrayList<>();

    @Formula("concat(first_name, ' ', last_name)")
    @Setter(AccessLevel.NONE)
    private String fullName;



}
