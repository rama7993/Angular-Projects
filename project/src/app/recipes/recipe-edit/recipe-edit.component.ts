import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number
  edit: Boolean = false
  recipeform: FormGroup

  constructor(private route: ActivatedRoute, private rs: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']
        this.edit= params['id'] != null
        this.InitForm()
      }
    )
  }

  private InitForm() {
    let recipeName = ''
    let recipeImgPath = ''
    let recipeDesc = ''
    let recipeIngredients=new FormArray([])
    if (this.edit) {
      const recipe = this.rs.getRecipe(this.id)
      recipeName = recipe.name
      recipeImgPath = recipe.imagePath
      recipeDesc = recipe.description
    

    }
    this.recipeform = new FormGroup({
      'name': new FormControl(recipeName),
      'imgPath': new FormControl(recipeImgPath),
      'desc': new FormControl(recipeDesc)
    }
    )
  }
  onSubmit(){
    console.log(this.recipeform)
  }
  
}
