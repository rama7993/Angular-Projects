import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Assign1Component } from './assign/assign1/assign1.component';
import { Assign2Component } from './assign/assign2/assign2.component';
import { Assign3Component } from './assign/assign3/assign3.component';
import { Assign4Component } from './assign/assign4/assign4.component';
import { Assign5Component } from './assign/assign5/assign5.component';
import { Assign6Component } from './assign/assign6/assign6.component';
import { Assign7Component } from './assign/assign7/assign7.component';
import { Assign8Component } from './assign/assign8/assign8.component';
import { CartComponent } from './cart/cart.component';
import { PipesComponent } from './pipes/pipes.component';
import { ProductComponent } from './product/product.component';
import { SampleComponent } from './sample/sample.component';
import { TodoComponent } from './todo/todo.component';


const routes: Routes = [
  { path:"todo", component: TodoComponent },
  {path:"sample", component:SampleComponent},
  {path:"pipe",component:PipesComponent},
  {path:"product",component:ProductComponent},
  {path:"cart",component:CartComponent},
  {path:"assgn1",component:Assign1Component},
  {path:"assgn2",component:Assign2Component},
  {path:"assgn3",component:Assign3Component},
  {path:"assgn4",component:Assign4Component},
  {path:"assgn5",component:Assign5Component},
  {path:"assgn6",component:Assign6Component},
  {path:"assgn7",component:Assign7Component},
  {path:"assgn8",component:Assign8Component},
  {path:'',redirectTo:'/todo',pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
