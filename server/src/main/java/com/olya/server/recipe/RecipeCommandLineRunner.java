package com.olya.server.recipe;

import com.olya.server.repository.RecipeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class RecipeCommandLineRunner implements CommandLineRunner {

    private final RecipeRepository repository;

    public RecipeCommandLineRunner(RecipeRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {
        //name + i recipe
        ArrayList<Recipe> list = new ArrayList<>();
        for(int i = 0; i < 5; i++) {
            list.add(new Recipe("name" + i, "20:0" + i, i, "ingrediants" + i, "steps" + i));
        }
        repository.saveAll(list);


        repository.findAll().forEach(System.out::println);
    }
}
