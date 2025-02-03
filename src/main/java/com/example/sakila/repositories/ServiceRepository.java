package com.example.sakila.repositories;

import com.example.sakila.entities.Service;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceRepository extends JpaRepository<Service,Short>{
    List<Service> findAllByNameContainingIgnoreCase(String name);
}
