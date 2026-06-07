import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SpotifyService } from '../services/spotify.service';
import {
  AudioPlayerService,
  AudioState,
} from '../services/audio-player.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  query: string = '';
  type: string = 'tracks';
  searchResults?: any;
  loading: boolean = false;
  error: string = '';
  hasSearched: boolean = false; // Track if user has performed a search
  audioState: AudioState = {
    isPlaying: false,
    currentTrack: null,
    currentTime: 0,
    duration: 0,
    volume: 0.7,
  };
  private audioSubscription?: Subscription;

  searchTypes = [
    { value: 'tracks', label: 'Tracks', icon: '🎵' },
    { value: 'artists', label: 'Artists', icon: '🎤' },
    { value: 'albums', label: 'Albums', icon: '💿' },
  ];

  constructor(
    private spotifyService: SpotifyService,
    private audioPlayerService: AudioPlayerService
  ) {}

  ngOnInit(): void {
    // Subscribe to audio state changes
    this.audioSubscription = this.audioPlayerService.audioState$.subscribe(
      (state) => {
        this.audioState = state;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.audioSubscription) {
      this.audioSubscription.unsubscribe();
    }
  }

  onSubmit(form: NgForm) {
    if (this.query.trim()) {
      this.performSearch();
    }
  }

  onTypeChange() {
    if (this.query.trim() && this.hasSearched) {
      this.performSearch();
    }
  }

  performSearch() {
    this.loading = true;
    this.error = '';
    this.searchResults = null;
    this.hasSearched = true; // Mark that user has performed a search

    this.spotifyService.search(this.query, this.type).subscribe({
      next: (resp: any) => {
        this.searchResults = resp[this.type] || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to search. Please try again.';
        this.loading = false;
        console.error('Search error:', err);
      },
    });
  }

  getResultCount(): number {
    return this.searchResults?.length || 0;
  }

  getSearchTypeLabel(): string {
    const typeObj = this.searchTypes.find((t) => t.value === this.type);
    return typeObj?.label || 'Results';
  }

  playPreview(previewUrl: string) {
    if (previewUrl) {
      this.audioPlayerService.playTrack(previewUrl);
    }
  }

  togglePlayPause(previewUrl: string) {
    if (this.audioPlayerService.isCurrentTrack(previewUrl)) {
      this.audioPlayerService.togglePlayPause();
    } else {
      this.playPreview(previewUrl);
    }
  }

  isCurrentTrack(previewUrl: string): boolean {
    return this.audioPlayerService.isCurrentTrack(previewUrl);
  }

  isPlaying(previewUrl: string): boolean {
    return (
      this.audioPlayerService.isCurrentTrack(previewUrl) &&
      this.audioState.isPlaying
    );
  }

  toggleFavorite(id: string, type: string) {
    // This would integrate with a favorites service
    // For now, we'll just show a simple alert
    console.log(`Toggling favorite: ${type} with id: ${id}`);
    // In a real app, you'd save this to localStorage or a backend
  }

  resetSearch() {
    this.query = '';
    this.hasSearched = false;
    this.searchResults = null;
    this.error = '';
  }
}
