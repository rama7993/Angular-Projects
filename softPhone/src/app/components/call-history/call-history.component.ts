import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SipService, CallRecord } from '../../services/sip.service';

@Component({
  selector: 'app-call-history',
  templateUrl: './call-history.component.html',
  styleUrls: ['./call-history.component.scss'],
})
export class CallHistoryComponent implements OnInit, OnDestroy {
  callHistory: CallRecord[] = [];
  filteredHistory: CallRecord[] = [];
  searchTerm: string = '';
  filterType: 'all' | 'incoming' | 'outgoing' | 'missed' = 'all';
  sortBy: 'date' | 'duration' | 'name' = 'date';
  sortOrder: 'asc' | 'desc' = 'desc';

  private subscriptions: Subscription[] = [];

  constructor(private sipService: SipService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.sipService.getCallState().subscribe((state) => {
        this.callHistory = state.callHistory;
        this.applyFilters();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  applyFilters(): void {
    let filtered = [...this.callHistory];

    // Filter by type
    if (this.filterType !== 'all') {
      filtered = filtered.filter((record) => record.type === this.filterType);
    }

    // Filter by search term
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (record) =>
          record.number.includes(term) ||
          (record.name && record.name.toLowerCase().includes(term))
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (this.sortBy) {
        case 'date':
          comparison = a.startTime.getTime() - b.startTime.getTime();
          break;
        case 'duration':
          const durationA = a.duration || 0;
          const durationB = b.duration || 0;
          comparison = durationA - durationB;
          break;
        case 'name':
          const nameA = a.name || a.number;
          const nameB = b.name || b.number;
          comparison = nameA.localeCompare(nameB);
          break;
      }

      return this.sortOrder === 'asc' ? comparison : -comparison;
    });

    this.filteredHistory = filtered;
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.applyFilters();
  }

  clearHistory(): void {
    if (confirm('Are you sure you want to clear all call history?')) {
      this.sipService.clearCallHistory();
    }
  }

  deleteRecord(record: CallRecord): void {
    if (confirm('Are you sure you want to delete this call record?')) {
      this.sipService.deleteCallRecord(record.id);
    }
  }

  callBack(record: CallRecord): void {
    this.sipService
      .makeCall(record.number)
      .catch((err) => console.error('Call back failed:', err));
  }

  formatDuration(seconds?: number): string {
    if (!seconds) return '--';

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs
        .toString()
        .padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }

  getCallIcon(type: string): string {
    switch (type) {
      case 'incoming':
        return 'fas fa-phone-volume';
      case 'outgoing':
        return 'fas fa-phone';
      case 'missed':
        return 'fas fa-phone-slash';
      default:
        return 'fas fa-phone';
    }
  }

  getCallStatusClass(status: string): string {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'failed':
        return 'text-danger';
      case 'missed':
        return 'text-warning';
      default:
        return 'text-muted';
    }
  }

  getCallTypeClass(type: string): string {
    switch (type) {
      case 'incoming':
        return 'badge bg-success';
      case 'outgoing':
        return 'badge bg-primary';
      case 'missed':
        return 'badge bg-warning';
      default:
        return 'badge bg-secondary';
    }
  }

  getTotalCalls(): number {
    return this.callHistory.length;
  }

  getIncomingCalls(): number {
    return this.callHistory.filter((record) => record.type === 'incoming')
      .length;
  }

  getOutgoingCalls(): number {
    return this.callHistory.filter((record) => record.type === 'outgoing')
      .length;
  }

  getTotalDuration(): string {
    const totalSeconds = this.callHistory.reduce((total, record) => {
      return total + (record.duration || 0);
    }, 0);
    return this.formatDuration(totalSeconds);
  }

  downloadRecording(record: CallRecord): void {
    if (record.recordingUrl) {
      const link = document.createElement('a');
      link.href = record.recordingUrl;
      link.download = `call-recording-${
        record.number
      }-${record.startTime.toISOString()}.webm`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
