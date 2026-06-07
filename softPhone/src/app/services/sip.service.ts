import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  UserAgent,
  UserAgentOptions,
  Registerer,
  RegistererState,
  Inviter,
  Invitation,
  Session,
  SessionState,
} from 'sip.js';
import { v4 as uuidv4 } from 'uuid';

export interface CallState {
  isConnected: boolean;
  isRegistered: boolean;
  isInCall: boolean;
  currentCall: Session | null;
  callHistory: CallRecord[];
  contacts: Contact[];
}

export interface CallRecord {
  id: string;
  number: string;
  name?: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  type: 'incoming' | 'outgoing' | 'missed';
  status: 'completed' | 'failed' | 'missed';
  recordingUrl?: string;
}

export interface Contact {
  id: string;
  name: string;
  number: string;
  email?: string;
  avatar?: string;
  lastCall?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class SipService {
  private userAgent: UserAgent | null = null;
  private registerer: Registerer | null = null;
  private callState = new BehaviorSubject<CallState>({
    isConnected: false,
    isRegistered: false,
    isInCall: false,
    currentCall: null,
    callHistory: [],
    contacts: [],
  });

  constructor() {
    this.loadCallHistory();
    this.loadContacts();
  }

  getCallState(): Observable<CallState> {
    return this.callState.asObservable();
  }

  async initializeSip(config: {
    server: string;
    username: string;
    password: string;
    displayName?: string;
  }): Promise<void> {
    try {
      const options: UserAgentOptions = {
        uri: UserAgent.makeURI(`sip:${config.username}@${config.server}`),
        displayName: config.displayName || config.username,
        authorizationUsername: config.username,
        authorizationPassword: config.password,
        transportOptions: {
          server: `wss://${config.server}:7443`,
        },
        sessionDescriptionHandlerFactoryOptions: {
          peerConnectionConfiguration: {
            iceServers: [
              { urls: 'stun:stun.l.google.com:19302' },
              { urls: 'stun:stun1.l.google.com:19302' },
              { urls: 'stun:stun2.l.google.com:19302' },
            ],
          },
        },
        // Enable debug logging
        logLevel: 'debug',
      };

      this.userAgent = new UserAgent(options);
      this.registerer = new Registerer(this.userAgent);

      // Set up event listeners
      this.setupEventListeners();

      // Start the user agent
      await this.userAgent.start();

      this.updateCallState({ isConnected: true });

      // Register
      await this.register();
    } catch (error) {
      console.error('SIP initialization failed:', error);
      throw error;
    }
  }

  private setupEventListeners(): void {
    if (!this.userAgent || !this.registerer) return;

    // Registration events
    this.registerer.stateChange.addListener((newState) => {
      const isRegistered = newState === RegistererState.Registered;
      this.updateCallState({ isRegistered });
    });

    // Incoming call events
    this.userAgent.delegate = {
      onInvite: (invitation: Invitation) => {
        this.handleIncomingCall(invitation);
      },
    };
  }

  private async register(): Promise<void> {
    if (!this.registerer) return;
    await this.registerer.register();
  }

  private handleIncomingCall(invitation: Invitation): void {
    const callRecord: CallRecord = {
      id: uuidv4(),
      number: invitation.remoteIdentity?.uri?.user || 'Unknown',
      startTime: new Date(),
      type: 'incoming',
      status: 'missed',
    };

    this.appendCallRecord(callRecord);

    // Set current invitation but do not mark in-call until answered
    this.updateCallState({
      isInCall: false,
      currentCall: invitation,
    });
  }

  async makeCall(number: string): Promise<void> {
    if (
      !this.userAgent ||
      !this.registerer ||
      this.registerer.state !== RegistererState.Registered
    ) {
      throw new Error('Not registered to SIP server');
    }

    try {
      const target = UserAgent.makeURI(
        `sip:${number}@${this.userAgent.configuration.uri?.host}`
      );
      if (!target) throw new Error('Invalid target URI');

      const inviter = new Inviter(this.userAgent, target);

      const callRecord: CallRecord = {
        id: uuidv4(),
        number: number,
        startTime: new Date(),
        type: 'outgoing',
        status: 'failed',
      };

      this.appendCallRecord(callRecord);

      this.updateCallState({
        isInCall: true,
        currentCall: inviter,
      });

      // Set up call event listeners
      inviter.stateChange.addListener((newState) => {
        if (newState === SessionState.Terminated) {
          this.endCall();
        }
      });

      await inviter.invite();
    } catch (error) {
      console.error('Failed to make call:', error);
      throw error;
    }
  }

  async answerCall(): Promise<void> {
    const currentCall = this.callState.value.currentCall;
    if (currentCall && currentCall instanceof Invitation) {
      await currentCall.accept();
      this.updateCallState({ isInCall: true });
      this.markCurrentRecordAnswered();
    }
  }

  async rejectCall(): Promise<void> {
    const currentCall = this.callState.value.currentCall;
    if (currentCall && currentCall instanceof Invitation) {
      await currentCall.reject();
      this.endCall();
    }
  }

  async endCall(): Promise<void> {
    const currentCall = this.callState.value.currentCall;
    if (currentCall) {
      await currentCall.bye();
      this.finalizeCurrentRecord();
      this.updateCallState({
        isInCall: false,
        currentCall: null,
      });
    }
  }

  async holdCall(): Promise<void> {
    const currentCall = this.callState.value.currentCall;
    if (currentCall) {
      // Note: hold/unhold methods may not be available in all SIP.js versions
      // This is a placeholder implementation
      console.log(
        'Hold call functionality - implement based on your SIP.js version'
      );
    }
  }

  async unholdCall(): Promise<void> {
    const currentCall = this.callState.value.currentCall;
    if (currentCall) {
      // Note: hold/unhold methods may not be available in all SIP.js versions
      // This is a placeholder implementation
      console.log(
        'Unhold call functionality - implement based on your SIP.js version'
      );
    }
  }

  async muteCall(): Promise<void> {
    const currentCall = this.callState.value.currentCall;
    if (currentCall) {
      // Implementation depends on the specific WebRTC setup
      console.log(
        'Mute functionality - implement with WebRTC audio track control'
      );
    }
  }

  async unmuteCall(): Promise<void> {
    const currentCall = this.callState.value.currentCall;
    if (currentCall) {
      // Implementation depends on the specific WebRTC setup
      console.log(
        'Unmute functionality - implement with WebRTC audio track control'
      );
    }
  }

  sendDTMF(tone: string): void {
    const currentCall = this.callState.value.currentCall as Session | null;
    const sdh = (
      currentCall as unknown as {
        sessionDescriptionHandler?: { peerConnection: RTCPeerConnection };
      }
    )?.sessionDescriptionHandler;
    const pc: RTCPeerConnection | undefined = sdh?.peerConnection;
    if (!pc) return;
    const audioSender = pc
      .getSenders()
      .find((s) => s.track && s.track.kind === 'audio') as
      | RTCRtpSender
      | undefined;
    const dtmf = (audioSender &&
      (audioSender as unknown as { dtmf?: RTCDTMFSender }).dtmf) as
      | RTCDTMFSender
      | undefined;
    if (dtmf) {
      dtmf.insertDTMF(tone);
    }
  }

  addContact(contact: Omit<Contact, 'id'>): void {
    const newContact: Contact = {
      ...contact,
      id: uuidv4(),
    };
    const contacts = [...this.callState.value.contacts, newContact];
    this.updateCallState({ contacts });
    this.saveContacts();
  }

  updateContact(id: string, updates: Partial<Contact>): void {
    const contacts = this.callState.value.contacts.map((contact) =>
      contact.id === id ? { ...contact, ...updates } : contact
    );
    this.updateCallState({ contacts });
    this.saveContacts();
  }

  deleteContact(id: string): void {
    const contacts = this.callState.value.contacts.filter(
      (contact) => contact.id !== id
    );
    this.updateCallState({ contacts });
    this.saveContacts();
  }

  private updateCallState(updates: Partial<CallState>): void {
    const currentState = this.callState.value;
    this.callState.next({ ...currentState, ...updates });
  }

  private appendCallRecord(record: CallRecord): void {
    const history = [...this.callState.value.callHistory, record];
    this.updateCallState({ callHistory: history });
    this.saveCallHistory();
  }

  private markCurrentRecordAnswered(): void {
    const history = [...this.callState.value.callHistory];
    const last = history[history.length - 1];
    if (last) {
      last.status = 'completed';
    }
    this.updateCallState({ callHistory: history });
    this.saveCallHistory();
  }

  private finalizeCurrentRecord(): void {
    const history = [...this.callState.value.callHistory];
    const last = history[history.length - 1];
    if (last) {
      last.endTime = new Date();
      last.duration = Math.max(
        0,
        Math.floor(
          ((last.endTime as Date).getTime() - last.startTime.getTime()) / 1000
        )
      );
      if (last.status === 'failed' || last.status === 'missed') {
        // keep status
      } else {
        last.status = 'completed';
      }
    }
    this.updateCallState({ callHistory: history });
    this.saveCallHistory();
  }

  private loadCallHistory(): void {
    const history = localStorage.getItem('softphone-call-history');
    if (history) {
      try {
        const parsedHistory = JSON.parse(history).map((record: any) => ({
          ...record,
          startTime: new Date(record.startTime),
          endTime: record.endTime ? new Date(record.endTime) : undefined,
        }));
        this.updateCallState({ callHistory: parsedHistory });
      } catch (error) {
        console.error('Failed to load call history:', error);
      }
    }
  }

  private saveCallHistory(): void {
    localStorage.setItem(
      'softphone-call-history',
      JSON.stringify(this.callState.value.callHistory)
    );
  }

  clearCallHistory(): void {
    this.updateCallState({ callHistory: [] });
    this.saveCallHistory();
  }

  deleteCallRecord(id: string): void {
    const filtered = this.callState.value.callHistory.filter(
      (r) => r.id !== id
    );
    this.updateCallState({ callHistory: filtered });
    this.saveCallHistory();
  }

  private loadContacts(): void {
    const contacts = localStorage.getItem('softphone-contacts');
    if (contacts) {
      try {
        const parsedContacts = JSON.parse(contacts);
        this.updateCallState({ contacts: parsedContacts });
      } catch (error) {
        console.error('Failed to load contacts:', error);
      }
    }
  }

  private saveContacts(): void {
    localStorage.setItem(
      'softphone-contacts',
      JSON.stringify(this.callState.value.contacts)
    );
  }

  async disconnect(): Promise<void> {
    if (this.registerer) {
      await this.registerer.unregister();
    }
    if (this.userAgent) {
      await this.userAgent.stop();
    }
    this.updateCallState({
      isConnected: false,
      isRegistered: false,
      isInCall: false,
      currentCall: null,
    });
  }

  getExportData(): {
    contacts: Contact[];
    callHistory: CallRecord[];
    audioSettings?: any;
  } {
    let audioSettings: any = undefined;
    try {
      audioSettings = JSON.parse(
        localStorage.getItem('softphone-audio-settings') || 'null'
      );
    } catch {}
    return {
      contacts: this.callState.value.contacts,
      callHistory: this.callState.value.callHistory,
      audioSettings,
    };
  }
}
