import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NestedCheckboxComponent } from './components/checkbox/nested-checkbox/nested-checkbox.component';
import { InfiniteScrollerComponent } from './components/infinite-scroller/infinite-scroller.component';
import { HttpClientModule } from '@angular/common/http';
import { TimelineComponent } from './components/timeline/timeline.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { LayoutComponent } from './components/layout/layout.component';
import { TicTacToeComponent } from './components/tic-tac-toe/tic-tac-toe.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { ModalComponent } from './components/modal/modal.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { CounterHistoryComponent } from './components/counter-history/counter-history.component';
import { InfiniteScrollCustomComponent } from './components/infinite-scroll-custom/infinite-scroll-custom.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { DragDropListComponent } from './components/drag-drop-list/drag-drop-list.component';
import { FormValidationComponent } from './components/form-validation/form-validation.component';
import { FetchFilterComponent } from './components/fetch-filter/fetch-filter.component';
import { HighlightPipe } from './components/fetch-filter/highlight.pipe';
import { UsersListComponent } from './components/users-list/users-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckboxComponent,
    NestedCheckboxComponent,
    InfiniteScrollerComponent,
    TimelineComponent,
    LayoutComponent,
    TicTacToeComponent,
    TodoListComponent,
    AccordionComponent,
    ModalComponent,
    TabsComponent,
    StarRatingComponent,
    CounterHistoryComponent,
    InfiniteScrollCustomComponent,
    AutocompleteComponent,
    DragDropListComponent,
    FormValidationComponent,
    FetchFilterComponent,
    HighlightPipe,
    UsersListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
