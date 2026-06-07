import { Component } from '@angular/core';

@Component({
  selector: 'app-counter-history',
  templateUrl: './counter-history.component.html',
  styleUrls: ['./counter-history.component.scss']
})
export class CounterHistoryComponent {
  history: number[] = [0];
  pointer: number = 0;

  get currentValue(): number {
    return this.history[this.pointer];
  }

  increment() {
    this.updateValue(this.currentValue + 1);
  }

  decrement() {
    this.updateValue(this.currentValue - 1);
  }

  multiply() {
    this.updateValue(this.currentValue * 2);
  }

  divide() {
    this.updateValue(Math.floor(this.currentValue / 2));
  }

  private updateValue(newValue: number) {
    if (this.pointer < this.history.length - 1) {
      this.history = this.history.slice(0, this.pointer + 1);
    }
    this.history.push(newValue);
    this.pointer++;
  }

  undo() {
    if (this.pointer > 0) {
      this.pointer--;
    }
  }

  redo() {
    if (this.pointer < this.history.length - 1) {
      this.pointer++;
    }
  }

  get canUndo(): boolean {
    return this.pointer > 0;
  }

  get canRedo(): boolean {
    return this.pointer < this.history.length - 1;
  }
}
