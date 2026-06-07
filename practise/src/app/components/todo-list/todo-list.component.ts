import { Component, OnInit } from '@angular/core';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  isEditing: boolean;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  newTaskText: string = '';
  filter: 'all' | 'completed' | 'active' = 'all';

  constructor() { }

  ngOnInit(): void {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    }
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  addTask() {
    if (this.newTaskText.trim()) {
      this.todos.push({
        id: Date.now(),
        text: this.newTaskText.trim(),
        completed: false,
        isEditing: false
      });
      this.newTaskText = '';
      this.saveTodos();
    }
  }

  deleteTask(id: number) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.saveTodos();
  }

  toggleComplete(todo: Todo) {
    todo.completed = !todo.completed;
    this.saveTodos();
  }

  editTask(todo: Todo) {
    todo.isEditing = true;
  }

  saveEdit(todo: Todo, newText: string) {
    if (newText.trim()) {
      todo.text = newText.trim();
    }
    todo.isEditing = false;
    this.saveTodos();
  }

  get filteredTodos() {
    if (this.filter === 'completed') {
      return this.todos.filter(t => t.completed);
    } else if (this.filter === 'active') {
      return this.todos.filter(t => !t.completed);
    }
    return this.todos;
  }
}
