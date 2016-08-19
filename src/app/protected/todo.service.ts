import { Injectable } from "@angular/core";

import { AngularFire}  from "angularfire2";
import { Observable } from "rxjs";
import "rxjs/operator/filter";

import { AuthService } from "../shared/auth.service";

@Injectable()
export class ToDoService {
  todos: Observable<any>;

  constructor(private af: AngularFire, private authService: AuthService) { }

  getAll() {
    return this.todos = this.af.database.list('todos')
      .map(todos => {
        const filtered = todos.filter(todo =>
          todo.user === this.authService.getUser().email && todo.active === true);
        return filtered;
      });
  }

  createToDo(active, date, title, description, user) {
    const todos = this.af.database.list('/todos');
    todos.push({
      active: active,
      date: date,
      title: title,
      description: description,
      user: user
    });
  }

  doneToDo(id: number) {
    this.af.database.object('todos/' + id).update({
      active: false
    });
  }

  deleteToDo(id: number) {
    this.af.database.object('todos/' + id).remove();
  }
}
