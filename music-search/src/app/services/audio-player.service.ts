import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AudioState {
  isPlaying: boolean;
  currentTrack: string | null;
  currentTime: number;
  duration: number;
  volume: number;
}

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {
  private audio: HTMLAudioElement | null = null;
  private audioState = new BehaviorSubject<AudioState>({
    isPlaying: false,
    currentTrack: null,
    currentTime: 0,
    duration: 0,
    volume: 0.7
  });

  public audioState$ = this.audioState.asObservable();

  constructor() {
    this.initializeAudio();
  }

  private initializeAudio(): void {
    this.audio = new Audio();
    this.audio.preload = 'metadata';
    this.audio.volume = 0.7;

    // Update state when audio events occur
    this.audio.addEventListener('loadedmetadata', () => {
      this.updateState({ duration: this.audio?.duration || 0 });
    });

    this.audio.addEventListener('timeupdate', () => {
      this.updateState({ currentTime: this.audio?.currentTime || 0 });
    });

    this.audio.addEventListener('ended', () => {
      this.updateState({ isPlaying: false, currentTime: 0 });
    });

    this.audio.addEventListener('play', () => {
      this.updateState({ isPlaying: true });
    });

    this.audio.addEventListener('pause', () => {
      this.updateState({ isPlaying: false });
    });

    this.audio.addEventListener('error', (error) => {
      console.error('Audio playback error:', error);
      this.updateState({ isPlaying: false });
    });
  }

  private updateState(updates: Partial<AudioState>): void {
    const currentState = this.audioState.value;
    this.audioState.next({ ...currentState, ...updates });
  }

  playTrack(previewUrl: string): void {
    if (!this.audio) return;

    // Stop current track if playing
    if (this.audioState.value.isPlaying) {
      this.pause();
    }

    // Load new track
    this.audio.src = previewUrl;
    this.updateState({ currentTrack: previewUrl, currentTime: 0 });

    // Play the track
    this.audio.play().catch(error => {
      console.error('Error playing audio:', error);
      this.updateState({ isPlaying: false });
    });
  }

  pause(): void {
    if (this.audio && !this.audio.paused) {
      this.audio.pause();
    }
  }

  resume(): void {
    if (this.audio && this.audio.paused) {
      this.audio.play().catch(error => {
        console.error('Error resuming audio:', error);
      });
    }
  }

  stop(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.updateState({ isPlaying: false, currentTime: 0, currentTrack: null });
    }
  }

  setVolume(volume: number): void {
    if (this.audio) {
      this.audio.volume = Math.max(0, Math.min(1, volume));
      this.updateState({ volume: this.audio.volume });
    }
  }

  seekTo(time: number): void {
    if (this.audio) {
      this.audio.currentTime = time;
    }
  }

  togglePlayPause(): void {
    if (this.audioState.value.isPlaying) {
      this.pause();
    } else {
      this.resume();
    }
  }

  isCurrentTrack(previewUrl: string): boolean {
    return this.audioState.value.currentTrack === previewUrl;
  }

  getCurrentState(): AudioState {
    return this.audioState.value;
  }
}
