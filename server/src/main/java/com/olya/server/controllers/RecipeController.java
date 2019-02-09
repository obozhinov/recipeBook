package com.olya.server.controllers;

import java.util.Collection;
import java.util.stream.Collectors;

import com.olya.server.recipe.Recipe;
import com.olya.server.repository.RecipeRepository;
import com.olya.server.service.RecipeService;
import com.olya.server.service.ValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/recipe")
public class RecipeController {

    @Autowired
    private RecipeRepository repository;

    @Autowired
    private RecipeService recipeService;

    @Autowired
    private ValidationErrorService validation;


    /*
    Function allRecipes returns a collection of all the Recipe object stored in the repository.
    They are send to "/recipes" address as JSON. @CrossOrigin annotation added, so that
    the client from port ":3000" can access the data.
     */
    @RequestMapping("/all")
    public Collection<Recipe> allRecipes(){
        return repository.findAll().stream()
                .collect(Collectors.toList());


    }
    /*
    Function addRecipe, excepts A Recipe object (parsed JSON form /add-recipe address), checks
    if the name, ingredients and steps are null and if not saves the updated recipe or returns null
    */
    @PostMapping("")
    public ResponseEntity<?> createRecipe(@Valid @RequestBody Recipe recipe, BindingResult result) throws Exception {

        ResponseEntity<?> errorMap = validation.ValidationErrorService(result);
        if(errorMap != null) return errorMap;

        recipeService.saveOrUpdateRecipe(recipe);
        return new ResponseEntity<Recipe>(recipe, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRecipe(@PathVariable Long id) {
       recipeService.deleteProject(id);

       return new ResponseEntity<String>("Recipe with id: " + id + "Has been deleted!", HttpStatus.OK);
    }

    /*
    Function findRecipeById accepts an Long id value and returns the Recipe object
    with the corresponding id from the repository. The object is send to "/recipe"
    address as JSON. @CrossOrigin annotation added, so that the client from port
    ":3000" can access the data.
     */
    @GetMapping("/{id}")//try next @GetMapping("/recipe/{id}")
    public ResponseEntity<?> findRecipeById(@PathVariable Long id) {
        Recipe recipe = recipeService.findRecipeById(id);

        return new ResponseEntity<Recipe>(recipe, HttpStatus.OK);
    }
}
