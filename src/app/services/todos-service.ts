import { inject, Injectable } from '@angular/core';
import { Todo } from '../model/todo.type';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  http = inject(HttpClient)

  getTodoFromApi() {
    const url = `https://jsonplaceholder.cypress.io/todos`
    return this.http.get<Array<Todo>>(url)
  }

  addTodo(todo: Todo) {
    // Since this is a demo API, we'll simulate adding a todo
    // In a real app, this would POST to the API
    return of(todo)
  }
}
