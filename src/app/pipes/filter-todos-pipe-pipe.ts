import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../model/todo.type';

@Pipe({
  name: 'filterTodosPipe'
})
export class FilterTodosPipePipe implements PipeTransform {

  transform(todos: Todo[],searchTerm: string): Todo[] {
    if(!searchTerm) {
      return todos
    }
    const text = searchTerm
    return todos.filter((todo) => {
      return todo.title.toLowerCase().includes(text)
    });
  }

}
