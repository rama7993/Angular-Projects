import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css'],
})
export class ArtistsComponent implements OnInit {
  id!: string;
  artists!: any;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private spotify: SpotifyService,
    private location: Location,
    private router: Router
  ) {
    route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.loadArtistDetails();
  }

  loadArtistDetails(): void {
    this.loading = true;
    
    this.spotify.getArtists(this.id).subscribe({
      next: (resp: any) => {
        this.artists = resp.artists;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error('Artist loading error:', err);
      }
    });
  }

  back(): void {
    this.location.back();
  }

  formatNumber(num: number): string {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  toggleFavorite(id: string, type: string): void {
    console.log(`Toggling favorite: ${type} with id: ${id}`);
    // In a real app, you'd save this to localStorage or a backend
  }

  viewAlbums(artistId: string): void {
    // Navigate to albums view for this artist
    this.router.navigate(['/albums', artistId]);
  }
}
