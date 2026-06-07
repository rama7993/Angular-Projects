import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SipService, Contact } from '../../services/sip.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  searchTerm: string = '';
  showAddForm: boolean = false;
  editingContact: Contact | null = null;

  newContact: Partial<Contact> = {
    name: '',
    number: '',
    email: '',
  };

  private subscriptions: Subscription[] = [];

  constructor(private sipService: SipService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.sipService.getCallState().subscribe((state) => {
        this.contacts = state.contacts;
        this.filterContacts();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  filterContacts(): void {
    if (!this.searchTerm.trim()) {
      this.filteredContacts = [...this.contacts];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredContacts = this.contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(term) ||
          contact.number.includes(term) ||
          (contact.email && contact.email.toLowerCase().includes(term))
      );
    }
  }

  onSearchChange(): void {
    this.filterContacts();
  }

  showAddContactForm(): void {
    this.showAddForm = true;
    this.editingContact = null;
    this.newContact = { name: '', number: '', email: '' };
  }

  editContact(contact: Contact): void {
    this.editingContact = contact;
    this.newContact = { ...contact };
    this.showAddForm = true;
  }

  saveContact(): void {
    if (!this.newContact.name || !this.newContact.number) {
      return;
    }

    if (this.editingContact) {
      this.sipService.updateContact(
        this.editingContact.id,
        this.newContact as Contact
      );
    } else {
      this.sipService.addContact(this.newContact as Omit<Contact, 'id'>);
    }

    this.cancelEdit();
  }

  deleteContact(contact: Contact): void {
    if (confirm(`Are you sure you want to delete ${contact.name}?`)) {
      this.sipService.deleteContact(contact.id);
    }
  }

  cancelEdit(): void {
    this.showAddForm = false;
    this.editingContact = null;
    this.newContact = { name: '', number: '', email: '' };
  }

  callContact(contact: Contact): void {
    // This would trigger a call through the SIP service
    console.log('Calling:', contact.number);
    // Implementation would depend on how the call interface is integrated
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }
}
