import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../model/todo.type';

@Component({
  selector: 'app-add-todo',
  imports: [FormsModule],
  templateUrl: './add-todo.html',
  styleUrl: './add-todo.scss'
})
export class AddTodo {
  todoAdded = output<Todo>()
  newTodoTitle = signal('')

  addTodo() {
    const title = this.newTodoTitle().trim()
    if (title) {
      const newTodo: Todo = {
        id: Date.now(), // Simple ID generation
        title: title,
        completed: false,
        userId: 1
      }
      this.todoAdded.emit(newTodo)
      this.newTodoTitle.set('')
    }
  }

  onSubmit(event: Event) {
    event.preventDefault()
    this.addTodo()
  }
}