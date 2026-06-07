import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements AfterViewInit {
  @Input() title: string = 'Modal Title';
  @Input()
  set isOpen(value: boolean) {
    this._isOpen = value;
    if (value) {
      setTimeout(() => this.trapFocus());
    }
  }
  get isOpen(): boolean {
    return this._isOpen;
  }

  @Output() isOpenChange = new EventEmitter<boolean>();

  @ViewChild('modalContent') modalContent!: ElementRef;

  private _isOpen = false;
  private focusableElements!: HTMLElement[];
  private firstFocusableElement!: HTMLElement;
  private lastFocusableElement!: HTMLElement;

  constructor() {}

  ngAfterViewInit() {
    if (this.isOpen) {
      this.trapFocus();
    }
  }

  close() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent) {
    if (this.isOpen) {
      this.close();
    }
  }

  @HostListener('document:keydown.tab', ['$event'])
  onTabKey(event: KeyboardEvent) {
    if (
      !this.isOpen ||
      !this.focusableElements ||
      this.focusableElements.length === 0
    )
      return;

    if (event.shiftKey) {
      if (document.activeElement === this.firstFocusableElement) {
        this.lastFocusableElement.focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === this.lastFocusableElement) {
        this.firstFocusableElement.focus();
        event.preventDefault();
      }
    }
  }

  private trapFocus() {
    if (!this.modalContent) return;

    const focusableElementsString =
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
    let elements = Array.from(
      this.modalContent.nativeElement.querySelectorAll(focusableElementsString),
    ) as HTMLElement[];

    if (elements.length > 0) {
      this.focusableElements = elements;
      this.firstFocusableElement = elements[0];
      this.lastFocusableElement = elements[elements.length - 1];
      this.firstFocusableElement.focus();
    }
  }
}
