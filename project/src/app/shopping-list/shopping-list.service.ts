import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService{
    ingredientschanged=new Subject<Ingredient[]>()
    startedEditing=new Subject<number>()
   private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ];
      
      getIngredients(){
        return this.ingredients.slice()
      }
      getIngredient(idx:number){
        return this.ingredients[idx]
      }
      addIngredient(ingredient:Ingredient){
       this.ingredients.push(ingredient)
       this.ingredientschanged.next(this.ingredients.slice())
      }
      addIngredients(ingredient:Ingredient[]){
        this.ingredients.push(...ingredient)
        this.ingredientschanged.next(this.ingredients.slice())
      }
      updateIngredient(idx:number,newIngredient:Ingredient){
             this.ingredients[idx]=newIngredient
             this.ingredientschanged.next(this.ingredients.slice())
      }
      deleteIngredient(idx:number){
       this.ingredients.splice(idx,1)
       this.ingredientschanged.next(this.ingredients.slice())
      }
}