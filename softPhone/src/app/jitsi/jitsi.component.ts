import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SipService, Contact } from '../services/sip.service';
import { v4 as uuidv4 } from 'uuid';
declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-jitsi',
  templateUrl: './jitsi.component.html',
  styleUrls: ['./jitsi.component.scss'],
})
export class JitsiComponent implements OnInit, AfterViewInit {
  @ViewChild('jitsiMeetContainer') jitsiMeetContainer!: ElementRef;

  domain = 'meet.jit.si';
  roomName = 'SoftPhoneRoom';
  displayName = '';
  api: any;
  contacts: Contact[] = [];
  selectedContactId: string = '';

  constructor(private route: ActivatedRoute, private sipService: SipService) {}

  ngOnInit(): void {
    this.sipService.getCallState().subscribe((state) => {
      this.contacts = state.contacts;
    });

    this.route.queryParamMap.subscribe((params) => {
      const room = params.get('room');
      const name = params.get('name');
      const autostart = params.get('autostart');
      if (room) this.roomName = room;
      if (name) this.displayName = name;
      if (autostart === '1') {
        setTimeout(() => this.startMeeting(), 0);
      }
    });
  }

  ngAfterViewInit() {
    // Do not auto start; wait for user action
  }

  startMeeting(): void {
    if (this.api) return;
    const options = {
      roomName: this.roomName || 'SoftPhoneRoom',
      parentNode: this.jitsiMeetContainer.nativeElement,
      userInfo: { displayName: this.displayName || 'Guest' },
    };
    this.api = new JitsiMeetExternalAPI(this.domain, options);
  }

  endMeeting(): void {
    if (this.api) {
      this.api.dispose();
      this.api = null;
    }
  }

  onSelectContact(): void {
    const contact = this.contacts.find((c) => c.id === this.selectedContactId);
    if (!contact) return;
    const safeNumber = (contact.number || '')
      .replace(/[^0-9A-Za-z]/g, '')
      .slice(0, 32);
    this.roomName = `softphone-${
      safeNumber || contact.name?.replace(/\s+/g, '-') || 'room'
    }`;
    this.displayName = contact.name || this.displayName;
  }

  generateRoom(): void {
    const id = uuidv4().replace(/-/g, '').slice(0, 10);
    this.roomName = `softphone-${id}`;
  }

  copyInvite(): void {
    const external = this.externalLink();
    const internal = this.internalLink();
    const text = `Join via Jitsi: ${external}\nOpen in app: ${internal}`;
    navigator.clipboard.writeText(text).catch(() => {});
  }

  openExternal(): void {
    const external = this.externalLink();
    window.open(external, '_blank');
  }

  externalLink(): string {
    return `https://${this.domain}/${encodeURIComponent(this.roomName)}`;
  }

  internalLink(): string {
    const origin = location.origin;
    const params = `room=${encodeURIComponent(
      this.roomName
    )}&name=${encodeURIComponent(this.displayName || 'Guest')}&autostart=1`;
    return `${origin}/jitsi?${params}`;
  }
}
