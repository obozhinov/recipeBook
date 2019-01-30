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

    @RequestMapping(value = "/delete-recipe", method = RequestMethod.DELETE)
    public Recipe deleteRecipe(@RequestBody Long id) {
//            @RequestParam String name, @RequestParam String time,
//                             @RequestParam Integer portions, @RequestParam String ingredients,
//                             @RequestParam String steps){
        if(id == null) {
            return null;
        }
        Recipe recipe = repository.findById(id).get();
        System.out.println("To be deleted: " + recipe);
        repository.deleteById(id);
        System.out.println("Recipe " + id + "has been deleted successfully!");
        return recipe;
    }

    /*
    Function editRecipe, excepts A Recipe object (parsed JSON form /edit-recipe address), checks
    if the id exists in the repository, also if the name, ingredients and
     steps are null and returns null if not saves the updated recipe
     */
    @RequestMapping(value = "/edit-recipe", method = RequestMethod.PUT)
    public Recipe editRecipe(@RequestBody Recipe recipe) {
        //check if there's no valid id, recipe name, ingredients or steps, then can't update
        if(repository.findById(recipe.getId()) == null ||recipe.getName() == null ||
                recipe.getIngredients() == null || recipe.getSteps() == null) {
            System.out.println("No valid ID, can't edit recipe.");
            return null;
        }
        repository.save(recipe);
        System.out.println(recipe);
        return recipe;
    }

    /*
    Function findRecipeById accepts an Long id value and returns the Recipe object
    with the corresponding id from the repository. The object is send to "/recipe"
    address as JSON. @CrossOrigin annotation added, so that the client from port
    ":3000" can access the data.
     */
    @CrossOrigin(origins = "http://localhost/3000")
    @GetMapping("/recipe")//try next @GetMapping("/recipe/{id}")
    public Recipe findRecipeById(@RequestParam(value = "id") Long id) {
        System.out.println(id);
        if(id != null) {
            System.out.println(repository.findById(id).get());
            return repository.findById(id).get();
        }
        return null;
    }
}
