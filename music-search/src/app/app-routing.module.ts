import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsComponent } from './albums/albums.component';
import { ArtistsComponent } from './artists/artists.component';
import { SearchComponent } from './search/search.component';
import { TracksComponent } from './tracks/tracks.component';

const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'artists/:id', component: ArtistsComponent },
  { path: 'albums/:id', component: AlbumsComponent },
  { path: 'tracks/:id', component: TracksComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
