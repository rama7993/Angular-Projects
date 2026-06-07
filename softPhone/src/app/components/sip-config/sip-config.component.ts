import { Component, OnInit } from '@angular/core';
import { SipService } from '../../services/sip.service';

@Component({
  selector: 'app-sip-config',
  templateUrl: './sip-config.component.html',
  styleUrls: ['./sip-config.component.scss'],
})
export class SipConfigComponent implements OnInit {
  sipConfig = {
    server: '',
    username: '',
    password: '',
    displayName: '',
  };

  isConnected = false;
  connectionStatus = 'Disconnected';
  availableProviders = [
    {
      name: 'FreeSIP',
      server: 'freesip.org',
      description: 'Free SIP service for testing',
      port: 5060,
      secure: false,
    },
    {
      name: 'SIP.US',
      server: 'sip.us',
      description: 'Free SIP service with US numbers',
      port: 5060,
      secure: false,
    },
    {
      name: 'Linphone',
      server: 'sip.linphone.org',
      description: 'Linphone SIP service',
      port: 5060,
      secure: false,
    },
    {
      name: 'Custom Server',
      server: '',
      description: 'Your own SIP server',
      port: 5060,
      secure: false,
    },
  ];

  selectedProvider = this.availableProviders[0];

  constructor(private sipService: SipService) {}

  ngOnInit(): void {
    this.sipService.getCallState().subscribe((state) => {
      this.isConnected = state.isRegistered;
      this.connectionStatus = state.isRegistered ? 'Connected' : 'Disconnected';
    });
  }

  onProviderChange(): void {
    if (this.selectedProvider.name !== 'Custom Server') {
      this.sipConfig.server = this.selectedProvider.server;
    }
  }

  applyProvider(provider: { name: string; server: string }): void {
    const match = this.availableProviders.find(
      (p) => p.name === provider.name || p.server === provider.server
    );
    this.selectedProvider = match
      ? match
      : { ...this.selectedProvider, ...provider };
    this.sipConfig.server = provider.server;
    this.onProviderChange();
  }

  async connectToSip(): Promise<void> {
    try {
      if (
        !this.sipConfig.server ||
        !this.sipConfig.username ||
        !this.sipConfig.password
      ) {
        alert('Please fill in all required fields');
        return;
      }

      this.connectionStatus = 'Connecting...';

      await this.sipService.initializeSip({
        server: this.sipConfig.server,
        username: this.sipConfig.username,
        password: this.sipConfig.password,
        displayName: this.sipConfig.displayName || this.sipConfig.username,
      });

      this.connectionStatus = 'Connected';
      alert('Successfully connected to SIP server!');
    } catch (error) {
      console.error('SIP connection failed:', error);
      this.connectionStatus = 'Connection Failed';
      alert('Failed to connect to SIP server. Please check your credentials.');
    }
  }

  async disconnectFromSip(): Promise<void> {
    try {
      await this.sipService.disconnect();
      this.connectionStatus = 'Disconnected';
      alert('Disconnected from SIP server');
    } catch (error) {
      console.error('Disconnect failed:', error);
    }
  }

  getStatusColor(): string {
    switch (this.connectionStatus) {
      case 'Connected':
        return 'text-success';
      case 'Connecting...':
        return 'text-warning';
      case 'Connection Failed':
        return 'text-danger';
      default:
        return 'text-muted';
    }
  }
}
