import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';
import {
  AudioPlayerService,
  AudioState,
} from '../services/audio-player.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css'],
})
export class TracksComponent implements OnInit, OnDestroy {
  id!: string;
  tracks!: any;
  loading: boolean = true;
  audioState: AudioState = {
    isPlaying: false,
    currentTrack: null,
    currentTime: 0,
    duration: 0,
    volume: 0.7,
  };
  private audioSubscription?: Subscription;

  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private audioPlayerService: AudioPlayerService
  ) {
    route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.loadTrackDetails();

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

  loadTrackDetails(): void {
    this.loading = true;

    this.spotifyService.getTracks(this.id).subscribe({
      next: (resp: any) => {
        this.tracks = resp?.tracks;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error('Track loading error:', err);
      },
    });
  }

  back(): void {
    this.location.back();
  }

  formatDuration(durationMs: number): string {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  toggleFavorite(id: string, type: string): void {
    console.log(`Toggling favorite: ${type} with id: ${id}`);
    // In a real app, you'd save this to localStorage or a backend
  }

  viewAlbum(albumId: string): void {
    this.router.navigate(['/albums', albumId]);
  }

  togglePlayPause(previewUrl: string): void {
    if (this.audioPlayerService.isCurrentTrack(previewUrl)) {
      this.audioPlayerService.togglePlayPause();
    } else {
      this.audioPlayerService.playTrack(previewUrl);
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

  setVolume(volume: number): void {
    this.audioPlayerService.setVolume(volume);
  }

  seekTo(time: number): void {
    this.audioPlayerService.seekTo(time);
  }

  stopAudio(): void {
    this.audioPlayerService.stop();
  }

  formatTime(seconds: number): string {
    if (!seconds || isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  getProgressPercentage(): number {
    if (!this.audioState.duration) return 0;
    return (this.audioState.currentTime / this.audioState.duration) * 100;
  }

  seekToTrack(event: MouseEvent): void {
    if (!this.audioState.duration) return;
    const progressBar = event.currentTarget as HTMLElement;
    const rect = progressBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * this.audioState.duration;
    this.seekTo(newTime);
  }

  onVolumeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.setVolume(parseFloat(target.value));
    }
  }
}
