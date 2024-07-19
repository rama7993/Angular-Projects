import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {

    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 'This is simply a test', 'assets/images/recipe.jpg',
            [new Ingredient('Apple', 2), new Ingredient('Orange', 2)]),
        new Recipe('A Test Recipe', 'This is simply a test', 'assets/images/recipe1.jpg',
            [new Ingredient('Chilly', 2), new Ingredient('Butter', 2)])]

    constructor(private sls: ShoppingListService) { }

    recipesChanged=new Subject<Recipe[]>()
    setRecipes(recipe:Recipe[]) {
          this.recipes=recipe
          this.recipesChanged.next(this.recipes.slice())
    }
    getRecipes() {
        return this.recipes.slice()
    }
    
    addIngredientsToShoppingList(ing: Ingredient[]) {
        this.sls.addIngredients(ing)
    }

    getRecipe(id: number) {
        return this.recipes[id]
    }
    
      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }
    
      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }
    
      deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
      }
}