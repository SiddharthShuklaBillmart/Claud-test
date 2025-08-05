import { Component, input, output } from '@angular/core';
import { Todo } from '../../model/todo.type';
import { AppHighlightCompletedTodo } from '../../directives/app-highlight-completed-todo';
import { UpperCasePipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  imports: [AppHighlightCompletedTodo, UpperCasePipe, NgIf, FormsModule],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.scss'
})
export class TodoItem {
  todo = input.required<Todo>()
  todoToggled = output<Todo>()
  todoDeleted = output<Todo>()
  todoUpdated = output<Todo>()
  
  isEditing = false
  editedTitle = ''

  todoClicked() {
    this.todoToggled.emit(this.todo())
  }

  deleteTodo() {
    this.todoDeleted.emit(this.todo())
  }

  startEdit() {
    this.isEditing = true
    this.editedTitle = this.todo().title
  }

  saveEdit() {
    if (this.editedTitle.trim()) {
      const updatedTodo = { ...this.todo(), title: this.editedTitle.trim() }
      this.todoUpdated.emit(updatedTodo)
      this.isEditing = false
    }
  }

  cancelEdit() {
    this.isEditing = false
    this.editedTitle = ''
  }
}
