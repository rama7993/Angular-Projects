import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SampleComponent } from './sample/sample.component';
import { TodoComponent } from './todo/todo.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { PipesComponent } from './pipes/pipes.component';
import { AssignComponent } from './assign/assign.component';
import { Assign1Component } from './assign/assign1/assign1.component';
import { Assign5Component } from './assign/assign5/assign5.component';
import { GamecontrolComponent } from './assign/assign5/gamecontrol/gamecontrol.component';
import { OddComponent } from './assign/assign5/odd/odd.component';
import { EvenComponent } from './assign/assign5/even/even.component';

import { WarningComponent } from './assign/assign1/warning/warning.component';
import { SuccessComponent } from './assign/assign1/success/success.component';
import { Assign2Component } from './assign/assign2/assign2.component';
import { Assign3Component } from './assign/assign3/assign3.component';
import { Assign4Component } from './assign/assign4/assign4.component';
import { ActiveUsersComponent } from './assign/assign4/active-users/active-users.component';
import { InactiveUsersComponent } from './assign/assign4/inactive-users/inactive-users.component';
import { CounterService } from './assign/assign4/counter.service';
import { Assign6Component } from './assign/assign6/assign6.component';
import { Assign7Component } from './assign/assign7/assign7.component';
import { Assign8Component } from './assign/assign8/assign8.component';
import { ShortenPipe } from './pipes/shorten.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { ReversePipe } from './assign/assign8/reverse.pipe';
import { SortPipe } from './assign/assign8/sort.pipe';


@NgModule({
  declarations: [
    AppComponent,
    SampleComponent,
    TodoComponent,
    ProductComponent,
    CartComponent,
    PipesComponent,
    AssignComponent,
    Assign1Component,
    Assign5Component,
    GamecontrolComponent,
    OddComponent,
    EvenComponent,
    WarningComponent,
    SuccessComponent,
    Assign2Component,
    Assign3Component,
    Assign4Component,
    ActiveUsersComponent,
    InactiveUsersComponent,
    Assign6Component,
    Assign7Component,
    Assign8Component,
    ShortenPipe,
    FilterPipe,
    ReversePipe,
    SortPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [CounterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
