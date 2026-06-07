import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import RecordRTC from 'recordrtc';

export interface RecordingState {
  isRecording: boolean;
  duration: number;
  recordingUrl?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CallRecordingService {
  private recorder: RecordRTC | null = null;
  private recordingState = new BehaviorSubject<RecordingState>({
    isRecording: false,
    duration: 0,
  });
  private durationInterval: any;

  getRecordingState(): Observable<RecordingState> {
    return this.recordingState.asObservable();
  }

  async startRecording(stream: MediaStream): Promise<void> {
    try {
      this.recorder = new RecordRTC(stream, {
        type: 'audio',
        mimeType: 'audio/webm',
        timeSlice: 1000,
        ondataavailable: (blob: Blob) => {
          // Handle data chunks if needed
        },
      });

      await this.recorder.startRecording();

      this.recordingState.next({
        isRecording: true,
        duration: 0,
      });

      // Start duration counter
      this.startDurationCounter();
    } catch (error) {
      console.error('Failed to start recording:', error);
      this.recordingState.next({
        isRecording: false,
        duration: 0,
        error: 'Failed to start recording',
      });
    }
  }

  async stopRecording(): Promise<string | null> {
    if (!this.recorder) return null;

    try {
      return new Promise((resolve, reject) => {
        this.recorder!.stopRecording(() => {
          const blob = this.recorder!.getBlob();
          const url = URL.createObjectURL(blob);

          this.recordingState.next({
            isRecording: false,
            duration: 0,
            recordingUrl: url,
          });

          this.stopDurationCounter();
          resolve(url);
        });
      });
    } catch (error) {
      console.error('Failed to stop recording:', error);
      this.recordingState.next({
        isRecording: false,
        duration: 0,
        error: 'Failed to stop recording',
      });
      return null;
    }
  }

  async pauseRecording(): Promise<void> {
    if (this.recorder && this.recordingState.value.isRecording) {
      this.recorder.pauseRecording();
    }
  }

  async resumeRecording(): Promise<void> {
    if (this.recorder) {
      this.recorder.resumeRecording();
    }
  }

  downloadRecording(): void {
    const state = this.recordingState.value;
    if (state.recordingUrl) {
      const link = document.createElement('a');
      link.href = state.recordingUrl;
      link.download = `call-recording-${new Date().toISOString()}.webm`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  private startDurationCounter(): void {
    this.durationInterval = setInterval(() => {
      const currentState = this.recordingState.value;
      this.recordingState.next({
        ...currentState,
        duration: currentState.duration + 1,
      });
    }, 1000);
  }

  private stopDurationCounter(): void {
    if (this.durationInterval) {
      clearInterval(this.durationInterval);
      this.durationInterval = null;
    }
  }

  formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  }
}
