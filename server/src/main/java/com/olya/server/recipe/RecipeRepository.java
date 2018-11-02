package com.olya.server.recipe;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
}
