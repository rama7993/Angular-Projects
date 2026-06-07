import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css'],
})
export class AlbumsComponent implements OnInit {
  id!: string;
  albums?: any;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService,
    private location: Location,
    private router: Router
  ) {
    route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.loadAlbumDetails();
  }

  loadAlbumDetails(): void {
    this.loading = true;
    
    this.spotifyService.getAlbums(this.id).subscribe({
      next: (resp: any) => {
        this.albums = resp.albums;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error('Album loading error:', err);
      }
    });
  }

  back(): void {
    this.location.back();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatDuration(durationMs: number): string {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  toggleFavorite(id: string, type: string): void {
    console.log(`Toggling favorite: ${type} with id: ${id}`);
    // In a real app, you'd save this to localStorage or a backend
  }

  viewArtist(artistId: string): void {
    this.router.navigate(['/artists', artistId]);
  }
}
