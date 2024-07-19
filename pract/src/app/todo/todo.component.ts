import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  items: string[] = []
  newTask: string = ''

  addToList() {
    if (this.newTask == '') { }
    else {
      this.items.push(this.newTask)
      this.newTask = ''
    }
  }

  deleteTask(index: number) {
    this.items.splice(index, 1)
  }

}
