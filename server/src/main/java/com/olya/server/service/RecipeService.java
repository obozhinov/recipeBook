package com.olya.server.service;

import com.olya.server.recipe.Recipe;
import com.olya.server.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository repository;

    public Recipe saveOrUpdateRecipe(Recipe recipe) {

        return repository.save(recipe);
    }

    public Recipe findRecipeById(Long id) {
        return repository.findById(id).get();
    }

    public void deleteProject(Long id) {
        Recipe recipe = findRecipeById(id);
        repository.delete(recipe);
    }
}
