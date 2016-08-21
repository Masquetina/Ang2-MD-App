import { Injectable } from "@angular/core";

import { AngularFire }  from "angularfire2";
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
        return todos
          .filter(todo =>
            todo.user === this.authService.getUser().email && todo.active === true)
    })
  }

  getToDo(id: number) {
    return this.af.database
      .object(`todos/${id}`, {preserveSnapshot: true})
  }

  createToDo(active, date, title, comments, user) {
    this.af.database.list('/todos')
      .push({
        active: active,
        date: date,
        title: title,
        comments: comments,
        user: user
    })
      .catch((error) => {
        console.log("ERROR: " + error);
    });
  }

  editToDo(id, title) {
    this.af.database.object(`todos/${id}`)
      .update({
        title: title
    })
      .catch((error) => {
        console.log("ERROR: " + error);
    });
  }

  doneToDo(id: number) {
    this.af.database.object(`todos/${id}`)
      .update({
        active: false
    })
      .catch((error) => {
        console.log("ERROR: " + error);
    });
  }

  deleteToDo(id: number) {
    this.af.database.object(`todos/${id}`)
      .remove()
      .catch((error) => {
        console.log("ERROR: " + error);
    });
  }
}
