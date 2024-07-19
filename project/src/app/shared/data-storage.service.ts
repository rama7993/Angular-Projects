import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable({providedIn:'root'})

export class DataStorageService{
 constructor(private http:HttpClient,private rs:RecipeService){}
 storeRecipes(){
    const recipes=this.rs.getRecipes()
    this.http.put('https://course-project-824a5-default-rtdb.firebaseio.com/recipes.json',recipes).subscribe(
     response=> console.log(response)
    )
   }
 fetchRecipes(){
    this.http.get<Recipe[]>('https://course-project-824a5-default-rtdb.firebaseio.com/recipes.json').subscribe(
        recipes=>this.rs.setRecipes(recipes)
    )
 }
}