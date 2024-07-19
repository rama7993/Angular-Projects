import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients: Ingredient[] =[]
  private igChangeSub:Subscription
  constructor(private sls:ShoppingListService) {
   
   }

  ngOnInit() {
    this.ingredients=this.sls.getIngredients()
    this.igChangeSub = this.sls.ingredientschanged.subscribe( (ing:Ingredient[])=> this.ingredients=ing)
    
  }
  onEditItem(id:number){
    this.sls.startedEditing.next(id)
  }
  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe()
  }
}
