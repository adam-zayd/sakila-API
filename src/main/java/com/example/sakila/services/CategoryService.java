package com.example.sakila.services;

import com.example.sakila.entities.Category;
import com.example.sakila.repositories.CategoryRepository;
import com.example.sakila.repositories.FilmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import com.example.sakila.dto.input.CategoryInput;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepo;
    private final FilmRepository filmRepo;

    @Autowired
    public CategoryService(CategoryRepository categoryRepo, FilmRepository filmRepo) {
        this.categoryRepo= categoryRepo;
        this.filmRepo= filmRepo;
    }

    private void updateFromCategoryInput(Category category, CategoryInput categoryInput) {
        if (categoryInput.getName()!= null) {
            category.setName(categoryInput.getName().toUpperCase());
        }
        if (categoryInput.getFilms()!= null) {
            if (!categoryInput.getFilms().isEmpty()) {
                final var films = categoryInput.getFilms()
                        .stream()
                        .map(filmId -> filmRepo.findById(filmId)
                                .orElseThrow(() -> new ResponseStatusException((HttpStatus.BAD_REQUEST))))
                        .collect(Collectors.toCollection(ArrayList::new));
                category.setFilms(films);
            }
        }
    }

    public List<Category> getAllCategories(Optional<String> name){
        return name.map(categoryRepo::findAllByNameContainingIgnoreCase)
                .orElseGet(categoryRepo::findAll);
    }

    public Category getCategoryByID(Byte id){
        return categoryRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public Category createCategory(CategoryInput categoryInput){
        final var category= new Category();
        updateFromCategoryInput(category, categoryInput);
        return categoryRepo.save(category);
    }

    public Category updateCategory(Byte id, CategoryInput categoryInput){
        final var category= categoryRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));
        updateFromCategoryInput(category, categoryInput);
        return categoryRepo.save(category);
    }

    public void deleteCategory(Byte id){
        final var category= categoryRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));
        categoryRepo.delete(category);
    }
}

