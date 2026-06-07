import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Session } from 'sip.js';
import { Subscription } from 'rxjs';
import { SipService, CallState } from '../../services/sip.service';
import {
  CallRecordingService,
  RecordingState,
} from '../../services/call-recording.service';

@Component({
  selector: 'app-call-interface',
  templateUrl: './call-interface.component.html',
  styleUrls: ['./call-interface.component.scss'],
})
export class CallInterfaceComponent implements OnInit, OnDestroy {
  @ViewChild('localVideo', { static: false })
  localVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo', { static: false })
  remoteVideo!: ElementRef<HTMLVideoElement>;

  callState: CallState | null = null;
  recordingState: RecordingState | null = null;
  localStream: MediaStream | null = null;
  remoteStream: MediaStream | null = null;

  private subscriptions: Subscription[] = [];

  constructor(
    private sipService: SipService,
    private recordingService: CallRecordingService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.sipService.getCallState().subscribe((state) => {
        this.callState = state;
      })
    );

    this.subscriptions.push(
      this.recordingService.getRecordingState().subscribe((state) => {
        this.recordingState = state;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  async makeCall(number: string): Promise<void> {
    try {
      await this.sipService.makeCall(number);
      await this.setupLocalVideo();
      this.attachMediaToSession();
    } catch (error) {
      console.error('Failed to make call:', error);
    }
  }

  async answerCall(): Promise<void> {
    try {
      await this.sipService.answerCall();
      await this.setupLocalVideo();
      this.attachMediaToSession();
    } catch (error) {
      console.error('Failed to answer call:', error);
    }
  }

  async rejectCall(): Promise<void> {
    try {
      await this.sipService.rejectCall();
    } catch (error) {
      console.error('Failed to reject call:', error);
    }
  }

  async endCall(): Promise<void> {
    try {
      await this.sipService.endCall();
      this.stopLocalVideo();
    } catch (error) {
      console.error('Failed to end call:', error);
    }
  }

  async holdCall(): Promise<void> {
    try {
      if (this.localStream) {
        this.localStream.getTracks().forEach((t) => (t.enabled = false));
      }
    } catch (error) {
      console.error('Failed to hold call:', error);
    }
  }

  async unholdCall(): Promise<void> {
    try {
      if (this.localStream) {
        this.localStream.getTracks().forEach((t) => (t.enabled = true));
      }
    } catch (error) {
      console.error('Failed to unhold call:', error);
    }
  }

  async muteCall(): Promise<void> {
    try {
      if (this.localStream) {
        this.localStream.getAudioTracks().forEach((t) => (t.enabled = false));
      }
    } catch (error) {
      console.error('Failed to mute call:', error);
    }
  }

  async unmuteCall(): Promise<void> {
    try {
      if (this.localStream) {
        this.localStream.getAudioTracks().forEach((t) => (t.enabled = true));
      }
    } catch (error) {
      console.error('Failed to unmute call:', error);
    }
  }

  async startRecording(): Promise<void> {
    if (this.localStream) {
      await this.recordingService.startRecording(this.localStream);
    }
  }

  async stopRecording(): Promise<void> {
    await this.recordingService.stopRecording();
  }

  downloadRecording(): void {
    this.recordingService.downloadRecording();
  }

  private async setupLocalVideo(): Promise<void> {
    try {
      const raw = localStorage.getItem('softphone-audio-settings');
      let micId = '';
      let camId = '';
      let options = {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: false,
      };
      if (raw) {
        try {
          const data = JSON.parse(raw);
          micId = data.micId || '';
          camId = data.camId || '';
          options = {
            echoCancellation: !!(data.options?.echoCancellation ?? true),
            noiseSuppression: !!(data.options?.noiseSuppression ?? true),
            autoGainControl: !!(data.options?.autoGainControl ?? false),
          };
        } catch {}
      }

      const constraints: MediaStreamConstraints = {
        video: camId ? { deviceId: { exact: camId } } : true,
        audio: {
          deviceId: micId ? { exact: micId } : undefined,
          echoCancellation: options.echoCancellation,
          noiseSuppression: options.noiseSuppression,
          autoGainControl: options.autoGainControl,
        } as MediaTrackConstraints,
      };

      this.localStream = await navigator.mediaDevices.getUserMedia(constraints);

      if (this.localVideo) {
        this.localVideo.nativeElement.srcObject = this.localStream;
      }
    } catch (error) {
      console.error('Failed to access camera/microphone:', error);
    }
  }

  private attachMediaToSession(): void {
    const session = this.callState?.currentCall as unknown as Session & {
      sessionDescriptionHandler?: { peerConnection: RTCPeerConnection };
    };
    if (!session || !this.localStream) return;

    const sdh = session.sessionDescriptionHandler;
    const pc: RTCPeerConnection | undefined = sdh?.peerConnection;
    if (!pc) return;

    this.localStream.getTracks().forEach((track) => {
      pc.getSenders().find((s) => s.track === track) ||
        pc.addTrack(track, this.localStream as MediaStream);
    });

    pc.ontrack = (event: RTCTrackEvent) => {
      if (!this.remoteStream) {
        this.remoteStream = new MediaStream();
        if (this.remoteVideo) {
          this.remoteVideo.nativeElement.srcObject = this.remoteStream;
          const raw = localStorage.getItem('softphone-audio-settings');
          if (raw) {
            try {
              const data = JSON.parse(raw);
              const speakerId = data.speakerId || '';
              const element = this.remoteVideo.nativeElement as any;
              if (speakerId && typeof element.setSinkId === 'function') {
                element.setSinkId(speakerId).catch(() => {});
              }
            } catch {}
          }
        }
      }
      this.remoteStream.addTrack(event.track);
    };
  }

  private stopLocalVideo(): void {
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => track.stop());
      this.localStream = null;
    }
  }

  formatDuration(seconds: number): string {
    return this.recordingService.formatDuration(seconds);
  }

  getStatusText(): string {
    if (!this.callState) return 'Disconnected';
    if (this.callState.isInCall) return 'In Call';
    if (this.callState.isRegistered) return 'Connected';
    return 'Disconnected';
  }

  getCallerInfo(): string {
    if (!this.callState?.currentCall) return 'Unknown';
    const session = this.callState.currentCall as unknown as Session;
    const remoteUser = (session as any)?.remoteIdentity?.uri?.user;
    return remoteUser || 'Unknown';
  }

  dialerNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];
  dialerNumber: string = '';

  addToDialer(number: string): void {
    if (this.callState?.isInCall) {
      this.sipService.sendDTMF(number);
    } else {
      this.dialerNumber += number;
    }
  }

  clearDialer(): void {
    this.dialerNumber = this.dialerNumber.slice(0, -1);
  }
}
