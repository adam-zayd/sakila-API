package com.example.sakila.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.sakila.entities.Language;

public interface LanguageRepository extends JpaRepository<Language,Byte>{
}
