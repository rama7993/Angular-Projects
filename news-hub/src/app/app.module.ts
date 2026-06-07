import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { TechnewsComponent } from './technews/technews.component';
import { HeaderComponent } from './header/header.component';
import { SportsNewsComponent } from './components/sports-news/sports-news.component';
import { BusinessNewsComponent } from './components/business-news/business-news.component';
import { HealthNewsComponent } from './components/health-news/health-news.component';
import { SearchNewsComponent } from './components/search-news/search-news.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TechnewsComponent,
    HeaderComponent,
    SportsNewsComponent,
    BusinessNewsComponent,
    HealthNewsComponent,
    SearchNewsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoadingBarHttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
