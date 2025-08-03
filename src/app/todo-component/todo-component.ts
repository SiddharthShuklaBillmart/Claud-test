import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../services/todos-service';
import { Todo } from '../model/todo.type';
import { catchError } from 'rxjs';
import { TodoItem } from '../components/todo-item/todo-item';
import { FormsModule } from '@angular/forms';
import { FilterTodosPipePipe } from '../pipes/filter-todos-pipe-pipe';
// import { NgIf } from '@angular/common';

@Component({
  selector: 'app-todo-component',
  imports: [TodoItem,FormsModule,FilterTodosPipePipe],
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
}
