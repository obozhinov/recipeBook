package com.olya.server.repository;

import com.olya.server.recipe.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
}
