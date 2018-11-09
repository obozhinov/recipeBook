package com.olya.server.recipe;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
public class RecipeController {

    private RecipeRepository repository;

    public RecipeController(RecipeRepository repository) {
        this.repository = repository;
    }

    /*
    Function allRecipes returns a collection of all the Recipe object stored in the repository.
    They are send to "/recipes" address as JSON. @CrossOrigin annotation added, so that
    the client from port ":3000" can access the data.
     */
    @CrossOrigin(origins = "http://localhost/3000")
    @RequestMapping("/recipes")
    public Collection<Recipe> allRecipes(){
        return repository.findAll().stream()
                .collect(Collectors.toList());


    }
    /*
    Function addRecipe, excepts A Recipe object (parsed JSON form /add-recipe address), checks
    if the name, ingredients and steps are null and if not saves the updated recipe or returns null
    */
    @RequestMapping(value = "/add-recipe", method = RequestMethod.POST)
    public Recipe addRecipe(@RequestBody Recipe recipe) {
//            @RequestParam String name, @RequestParam String time,
//                             @RequestParam Integer portions, @RequestParam String ingredients,
//                             @RequestParam String steps){
        if(recipe.getName() == null ||
                recipe.getIngredients() == null || recipe.getSteps() == null) {
            return null;
        }
        repository.save(recipe);
        System.out.println(recipe);
        return recipe;
    }
    /*
    Function editRecipe, excepts A Recipe object (parsed JSON form /edit-recipe address), checks
    if the id exists in the repository, also if the name, ingredients and
     steps are null and returns null if not saves the updated recipe
     */
    @RequestMapping(value = "/edit-recipe", method = RequestMethod.POST)
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
    @RequestMapping("/recipe")
    public Recipe findRecipeById(@RequestParam(value = "id") Long id) {
        System.out.println(id);
        if(id != null) {
            System.out.println(repository.findById(id).get());
            return repository.findById(id).get();
        }
        return null;
    }
}
