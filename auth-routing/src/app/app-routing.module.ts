import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductsComponent } from './components/products/products.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { AuthGuardService } from './services/auth.guard.service';

const routes: Routes = [

  // basic routes
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  // authentication demo
  { path: 'login', component: LoginComponent },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [ AuthGuardService ]
  },

  //child routes
  { path: 'product', component: ProductsComponent, canActivate : [AuthGuardService], 
  canActivateChild:[AuthGuardService],
      children: [
      {  path: 'view/:id', component: ProductViewComponent},
      {  path: 'edit/:id', component: ProductEditComponent },
      {  path: 'add', component: ProductAddComponent}
      ]  
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
