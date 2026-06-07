import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Node } from 'src/interfaces/checkbox-node';

@Component({
  selector: 'app-nested-checkbox',
  templateUrl: './nested-checkbox.component.html',
  styleUrls: ['./nested-checkbox.component.scss'],
})
export class NestedCheckboxComponent implements OnInit {
  @Input() items: Node[] = [];

  ngOnInit(): void {}

  onCheckedChange(item: Node, checked: boolean): void {
    item.checked = checked;
    item.indeterminate = false;
    if (item.children && item.children.length > 0) {
      this.toggleChildren(item.children, checked);
    }
    this.updateParentStateRecursive(item.parent!);
  }

  toggleChildren(children: Node[], checked: boolean): void {
    children.forEach((child: Node) => {
      child.checked = checked;
      child.indeterminate = false;
      if (child.children && child.children.length > 0) {
        this.toggleChildren(child.children, checked);
      }
    });
  }

  updateParentStateRecursive(parent: Node | null): void {
    if (!parent) return;

    const allChecked = parent.children!.every((child: Node) => child.checked);
    const noneChecked = parent.children!.every((child: Node) => !child.checked);
    parent.checked = allChecked;
    parent.indeterminate = !allChecked && !noneChecked;

    this.updateParentStateRecursive(parent.parent!);
  }
}
