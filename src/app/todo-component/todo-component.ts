import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../services/todos-service';
import { Todo } from '../model/todo.type';
import { catchError } from 'rxjs';
import { TodoItem } from '../components/todo-item/todo-item';
import { AddTodo } from '../components/add-todo/add-todo';
import { FormsModule } from '@angular/forms';
import { FilterTodosPipePipe } from '../pipes/filter-todos-pipe-pipe';
// import { NgIf } from '@angular/common';

@Component({
  selector: 'app-todo-component',
  imports: [TodoItem, AddTodo, FormsModule, FilterTodosPipePipe],
  templateUrl: './todo-component.html',
  styleUrl: './todo-component.scss'
})
export class TodoComponent implements OnInit {
    todoService = inject(TodosService)
    todoitems = signal<Array<Todo>>([])
    searchTerm = signal('')
    ngOnInit(): void {
      this.todoService.getTodoFromApi().pipe(catchError((err)=>{
        console.log(err)
        throw err
      })).subscribe((todos)=>{
        this.todoitems.set(todos)
      })
    }

    updateTodoToggled(todoItem: Todo) {
       this.todoitems.update((todos)=>{
        return todos.map(todo => {
          if (todo.id == todoItem.id){
            return {
              ...todo,
              completed: !todo.completed
            }
          }
          return todo
        })
       })
    }

    onTodoAdded(newTodo: Todo) {
      this.todoService.addTodo(newTodo).subscribe((todo) => {
        this.todoitems.update((todos) => [todo, ...todos])
      })
    }

    deleteTodo(todoToDelete: Todo) {
      this.todoitems.update((todos) => {
        return todos.filter(todo => todo.id !== todoToDelete.id)
      })
    }

    updateTodo(updatedTodo: Todo) {
      this.todoitems.update((todos) => {
        return todos.map(todo => {
          if (todo.id === updatedTodo.id) {
            return updatedTodo
          }
          return todo
        })
      })
    }
}
