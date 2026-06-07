import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-audio-settings',
  templateUrl: './audio-settings.component.html',
  styleUrls: ['./audio-settings.component.scss'],
})
export class AudioSettingsComponent implements OnInit {
  availableMics: MediaDeviceInfo[] = [];
  availableSpeakers: MediaDeviceInfo[] = [];
  availableCams: MediaDeviceInfo[] = [];

  selectedMicId: string = '';
  selectedSpeakerId: string = '';
  selectedCamId: string = '';

  audioOptions = {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: false,
  };

  previewStream: MediaStream | null = null;

  @ViewChild('previewVideo') previewVideo!: ElementRef<HTMLVideoElement>;

  ngOnInit(): void {
    this.loadAudioSettings();
    this.enumerateDevices();
  }

  async enumerateDevices(): Promise<void> {
    try {
      await navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then((stream) => {
          stream.getTracks().forEach((t) => t.stop());
        })
        .catch(() => {});
      const devices = await navigator.mediaDevices.enumerateDevices();
      this.availableMics = devices.filter((d) => d.kind === 'audioinput');
      this.availableSpeakers = devices.filter((d) => d.kind === 'audiooutput');
      this.availableCams = devices.filter((d) => d.kind === 'videoinput');
    } catch (e) {
      console.error('Failed to enumerate devices', e);
    }
  }

  saveAudioSettings(): void {
    const data = {
      micId: this.selectedMicId,
      speakerId: this.selectedSpeakerId,
      camId: this.selectedCamId,
      options: this.audioOptions,
    };
    localStorage.setItem('softphone-audio-settings', JSON.stringify(data));
  }

  loadAudioSettings(): void {
    const raw = localStorage.getItem('softphone-audio-settings');
    if (!raw) return;
    try {
      const data = JSON.parse(raw);
      this.selectedMicId = data.micId || '';
      this.selectedSpeakerId = data.speakerId || '';
      this.selectedCamId = data.camId || '';
      this.audioOptions = {
        echoCancellation: !!(data.options?.echoCancellation ?? true),
        noiseSuppression: !!(data.options?.noiseSuppression ?? true),
        autoGainControl: !!(data.options?.autoGainControl ?? false),
      };
    } catch {}
  }

  async playTestTone(): Promise<void> {
    try {
      const audio = document.createElement('audio') as HTMLAudioElement & {
        setSinkId?: (id: string) => Promise<void>;
      };
      const ctx = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = ctx.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.value = 440;
      const destination = ctx.createMediaStreamDestination();
      oscillator.connect(destination);
      oscillator.start();

      audio.srcObject = destination.stream as any;
      audio.play();
      if (this.selectedSpeakerId && typeof audio.setSinkId === 'function') {
        await audio.setSinkId(this.selectedSpeakerId).catch(() => {});
      }

      setTimeout(() => {
        oscillator.stop();
        audio.pause();
        ctx.close();
      }, 1000);
    } catch (e) {
      console.error('Failed to play test tone', e);
    }
  }

  async startCameraPreview(): Promise<void> {
    try {
      if (this.previewStream) return;
      const constraints: MediaStreamConstraints = {
        video: this.selectedCamId
          ? { deviceId: { exact: this.selectedCamId } }
          : true,
        audio: false,
      };
      this.previewStream = await navigator.mediaDevices.getUserMedia(
        constraints
      );
      if (this.previewVideo?.nativeElement) {
        this.previewVideo.nativeElement.srcObject = this.previewStream;
        await this.previewVideo.nativeElement.play();
      }
    } catch (e) {
      console.error('Failed to start camera preview', e);
    }
  }

  stopCameraPreview(): void {
    if (this.previewStream) {
      this.previewStream.getTracks().forEach((t) => t.stop());
      this.previewStream = null;
    }
    if (this.previewVideo?.nativeElement) {
      this.previewVideo.nativeElement.srcObject = null;
    }
  }
}
