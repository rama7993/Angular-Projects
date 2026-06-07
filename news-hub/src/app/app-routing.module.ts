import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TechnewsComponent } from './technews/technews.component';
import { SportsNewsComponent } from './components/sports-news/sports-news.component';
import { BusinessNewsComponent } from './components/business-news/business-news.component';
import { HealthNewsComponent } from './components/health-news/health-news.component';
import { SearchNewsComponent } from './components/search-news/search-news.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'tech', component: TechnewsComponent },
  { path: 'sports', component: SportsNewsComponent },
  { path: 'business', component: BusinessNewsComponent },
  { path: 'health', component: HealthNewsComponent },
  { path: 'search', component: SearchNewsComponent },
  { path: '**', redirectTo: 'home' }, // Wildcard route for 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
