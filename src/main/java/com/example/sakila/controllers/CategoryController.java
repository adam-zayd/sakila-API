package com.example.sakila.controllers;

import com.example.sakila.dto.ValidationGroup;
import com.example.sakila.dto.input.CategoryInput;
import com.example.sakila.dto.output.CategoryOutput;
import com.example.sakila.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import static com.example.sakila.dto.ValidationGroup.Update;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
public class CategoryController {
    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService){
        this.categoryService= categoryService;
    }

    @GetMapping("/categories")
    public List<CategoryOutput> getAllCategories(@RequestParam(required = false) Optional<String> name) {
        return categoryService.getAllCategories(name)
                .stream()
                .map(CategoryOutput::from)
                .toList();
    }

    @GetMapping("/categories/{id}")
    public CategoryOutput getCategoryUsingId(@PathVariable Byte id) {
        return CategoryOutput.from(categoryService.getCategoryByID(id));
    }


    @PostMapping ("/categories")
    public CategoryOutput createCategory(@Validated(ValidationGroup.Create.class) @RequestBody CategoryInput categoryInput){
        return CategoryOutput.from(categoryService.createCategory(categoryInput));
    }

    @PutMapping("/categories/{id}")
    public CategoryOutput replaceCategory(@PathVariable Byte id, @Validated(ValidationGroup.Replace.class) @RequestBody CategoryInput categoryInput){
        return CategoryOutput.from(categoryService.updateCategory(id, categoryInput));
    }

    @PatchMapping("/categories/{id}")
    public CategoryOutput modifyCategory(@PathVariable Byte id, @Validated(Update.class) @RequestBody CategoryInput categoryInput){
        return CategoryOutput.from(categoryService.updateCategory(id, categoryInput));
    }

    @DeleteMapping("/categories")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCategory(@RequestParam Byte id){
        categoryService.deleteCategory(id);
    }
}
