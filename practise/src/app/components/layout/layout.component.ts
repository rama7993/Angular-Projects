import { Component, OnInit } from '@angular/core';
import { Node } from 'src/interfaces/checkbox-node';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  isModalOpen = false;
  userRating = 3;

  componentsList = [
    { id: 'todo', name: 'Todo List' },
    { id: 'accordion', name: 'Accordion' },
    { id: 'modal', name: 'Modal / Popup' },
    { id: 'tabs', name: 'Tabs Component' },
    { id: 'star-rating', name: 'Star Rating' },
    { id: 'counter', name: 'Counter (Undo/Redo)' },
    { id: 'infinite-scroll', name: 'Infinite Scroll' },
    { id: 'autocomplete', name: 'Autocomplete Search' },
    { id: 'drag-drop', name: 'Drag and Drop List' },
    { id: 'form-validation', name: 'Form Validation' },
    { id: 'tic-tac-toe', name: 'Tic Tac Toe' },
    { id: 'timeline', name: 'Timeline' },
    { id: 'infinite-scroller-og', name: 'Infinite Scroller (OG)' },
    { id: 'checkbox', name: 'Checkbox' },
    { id: 'fetch-filter', name: 'Fetch Filter' },
    { id: 'user-list', name: 'User list' },
  ];

  activeComponent = 'todo';

  checkboxItems: Node[] = [
    {
      label: 'Parent 1',
      checked: false,
      indeterminate: false,
      children: [
        {
          label: 'Child 1.1',
          checked: false,
          indeterminate: false,
          parent: null,
          children: [
            {
              label: 'Grandchild 1.1.1',
              checked: false,
              indeterminate: false,
              parent: null,
            },
          ],
        },
        {
          label: 'Child 1.2',
          checked: false,
          indeterminate: false,
          parent: null,
        },
      ],
    },
    {
      label: 'Parent 2',
      checked: false,
      indeterminate: false,
      children: [
        {
          label: 'Child 2.1',
          checked: false,
          indeterminate: false,
          parent: null,
        },
        {
          label: 'Child 2.2',
          checked: false,
          indeterminate: false,
          parent: null,
        },
      ],
    },
  ];

  constructor() {
    this.setParentReferences(this.checkboxItems, null);
  }

  ngOnInit(): void {}

  selectComponent(id: string) {
    this.activeComponent = id;
  }

  setParentReferences(items: any[], parent: any): void {
    items.forEach((item) => {
      item.parent = parent;
      if (item.children && item.children.length > 0) {
        this.setParentReferences(item.children, item);
      }
    });
  }
}
