import { Component, input, output } from '@angular/core';
import { Todo } from '../../model/todo.type';
import { AppHighlightCompletedTodo } from '../../directives/app-highlight-completed-todo';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  imports: [AppHighlightCompletedTodo, UpperCasePipe],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.scss'
})
export class TodoItem {
  todo = input.required<Todo>()
  todoToggled = output<Todo>()

  todoClicked() {
    this.todoToggled.emit(this.todo())
  }
}
