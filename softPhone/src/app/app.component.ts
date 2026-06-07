import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SipService } from './services/sip.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'SoftPhone';

  constructor(private router: Router, private sipService: SipService) {}

  openSipSettings(): void {
    this.router.navigate(['/sip-config']);
  }

  openAudioSettings(): void {
    this.router.navigate(['/sip-config'], { fragment: 'audio-settings' });
  }

  exportData(): void {
    const data = this.sipService.getExportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `softphone-export-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
