import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Ingredient } from "src/app/shared/ingredient.model";

import { ShoppingListService } from "../shopping-list.service";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') slForm:NgForm
  subscribe: Subscription
  editMode:Boolean=false
  editedIndex:number
  editedItem:Ingredient
  constructor(private sls: ShoppingListService) { }

  ngOnInit() {
    this.subscribe = this.sls.startedEditing.subscribe(
      (idx:number)=>{
        this.editedIndex=idx
        this.editMode=true
        this.editedItem=this.sls.getIngredient(idx)
        this.slForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        })
      }
    )
  }
  ngOnDestroy() {
    this.subscribe.unsubscribe()
  }

  onAddItem(form: NgForm) {
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount)
    if(this.editMode){
      this.sls.updateIngredient(this.editedIndex,newIngredient)
    }
    else{
      this.sls.addIngredient(newIngredient)
    }
    this.editMode=false
    form.reset()
  }
  onClear(){
    this.slForm.reset()
    this.editMode=false
  }
  onDelete(){
    this.sls.deleteIngredient(this.editedIndex)
    this.onClear()
  }
   
  
}
