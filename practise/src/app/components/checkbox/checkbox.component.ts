import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input() label: string = '';
  @Input() checked: boolean = false;
  @Input() indeterminate: boolean = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    this.setIndeterminate(this.indeterminate);
  }

  setIndeterminate(isIndeterminate: boolean): void {
    const checkbox = this.el.nativeElement.querySelector(
      'input[type="checkbox"]'
    );
    this.renderer.setProperty(checkbox, 'indeterminate', isIndeterminate);
  }

  onChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.checked = input.checked;
    this.indeterminate = false; // Clear indeterminate state when user manually changes checkbox
    this.checkedChange.emit(this.checked);
  }
}
