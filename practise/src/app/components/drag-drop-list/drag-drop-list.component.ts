import { Component } from '@angular/core';

@Component({
  selector: 'app-drag-drop-list',
  templateUrl: './drag-drop-list.component.html',
  styleUrls: ['./drag-drop-list.component.scss'],
})
export class DragDropListComponent {
  items = [
    'First Item',
    'Second Item',
    'Third Item',
    'Fourth Item',
    'Fifth Item',
  ];
  draggedIndex: number | null = null;

  onDragStart(index: number) {
    this.draggedIndex = index;
  }

  onDragOver(event: DragEvent, index: number) {
    event.preventDefault(); // Necessary to allow dropping
  }

  onDrop(event: DragEvent, dropIndex: number) {
    event.preventDefault();
    if (this.draggedIndex !== null && this.draggedIndex !== dropIndex) {
      const movedItem = this.items.splice(this.draggedIndex, 1)[0];
      this.items.splice(dropIndex, 0, movedItem);
    }
    this.draggedIndex = null;
  }

  onDragEnd() {
    this.draggedIndex = null;
  }
}
