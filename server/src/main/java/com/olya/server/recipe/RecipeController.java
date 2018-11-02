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

   // @GetMapping("/recipes")
    @CrossOrigin(origins = "http://localhost/3000")
    @RequestMapping("/recipes")
    public Collection<Recipe> allRecipes(){
        return repository.findAll().stream()
                .collect(Collectors.toList());


    }

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
