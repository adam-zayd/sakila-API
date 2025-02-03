package com.example.sakila.repositories;

import com.example.sakila.entities.Streaming;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StreamingRepository extends JpaRepository<Streaming,Short>{
    List<Streaming> findAllByNameContainingIgnoreCase(String name);
}
