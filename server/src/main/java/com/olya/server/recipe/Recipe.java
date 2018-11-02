package com.olya.server.recipe;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Recipe {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String timeNeeded;
    private Integer portions;
    private String ingredients;
    private String steps;

    public Recipe(){};

    public Recipe(String name) {
        this.name = name;
    }

    public Recipe(String name, String timeNeeded, Integer portions, String ingredients, String steps) {
        this.name = name;
        this.timeNeeded = timeNeeded;
        this.portions = portions;
        this.ingredients = ingredients;
        this.steps = steps;
    }

    public String getTimeNeeded() {
        return timeNeeded;
    }

    public void setTimeNeeded(String timeNeeded) {
        this.timeNeeded = timeNeeded;
    }

    public Integer getPortions() {
        return portions;
    }

    public void setPortions(Integer portions) {
        this.portions = portions;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public String getSteps() {
        return steps;
    }

    public void setSteps(String steps) {
        this.steps = steps;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Recipe{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", timeNeeded='" + timeNeeded + '\'' +
                ", portions=" + portions +
                ", ingredients='" + ingredients + '\'' +
                ", steps='" + steps + '\'' +
                '}';
    }
}
