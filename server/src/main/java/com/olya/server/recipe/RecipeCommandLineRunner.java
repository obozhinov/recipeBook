package com.olya.server.recipe;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.stream.Stream;

@Component
public class RecipeCommandLineRunner implements CommandLineRunner {

    private final RecipeRepository repository;

    public RecipeCommandLineRunner(RecipeRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {
        //Top recipe from some site
//        Stream.of("Kentucky Brunch Brand Stout", "Good Morning", "Very Hazy", "King Julius",
//                "Budweiser", "Coors Light", "PBR").forEach(name -> repository.save(new Recipe(name)));
        ArrayList<Recipe> list = new ArrayList<>();
        for(int i = 0; i < 5; i++) {
            list.add(new Recipe("name" + i, "20:0" + i, i, "ingrediants" + i, "steps" + i));
        }
        repository.saveAll(list);


        repository.findAll().forEach(System.out::println);
    }
}
