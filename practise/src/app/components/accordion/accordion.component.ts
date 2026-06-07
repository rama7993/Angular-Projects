import { Component, Input, OnInit } from '@angular/core';

export interface AccordionItem {
  title: string;
  content: string;
  isOpen?: boolean;
}

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {
  @Input() items: AccordionItem[] = [];
  @Input() allowMultiple: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (this.items.length === 0) {
      this.items = [
        { title: 'What is Angular?', content: 'Angular is a platform and framework for building single-page client applications using HTML and TypeScript.' },
        { title: 'What is a Component?', content: 'Components are the main building block for Angular applications. Each component consists of an HTML template, a TypeScript class, and a CSS selector.' },
        { title: 'What is an Accordion?', content: 'An accordion is a vertically stacked list of items, such as labels or thumbnails. Each item can be "expanded" or "collapsed" to reveal the content associated with that item.' }
      ];
    }
  }

  toggle(index: number) {
    if (!this.allowMultiple) {
      const isOpen = this.items[index].isOpen;
      this.items.forEach(item => item.isOpen = false);
      this.items[index].isOpen = !isOpen;
    } else {
      this.items[index].isOpen = !this.items[index].isOpen;
    }
  }
}
