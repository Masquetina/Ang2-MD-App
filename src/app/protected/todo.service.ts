import { Injectable } from "@angular/core";
import { AngularFire }  from "angularfire2";
import { Observable } from "rxjs";
import "rxjs/operator/filter";

import { AuthService } from "../shared/auth.service";

@Injectable()
export class ToDoService {
  todos: Observable<any>;
  message: string;

  constructor(private af: AngularFire, private authService: AuthService) { }

  getAll() {
    return this.todos = this.af.database.list('todos')
      .map(todos => {
        return todos
          .filter(todo =>
            todo.user === this.authService.getUser().email && todo.active === true)
      });
  }

  getToDo(todoId) {
    return this.af.database
      .object(`todos/${todoId}`, { preserveSnapshot: true })
  }

  createToDo(active, date, title, priority, comments, user) {
    const promise = this.af.database.list('/todos')
      .push({
        active: active,
        date: date,
        title: title,
        priority: priority,
        comments: comments,
        user: user
      });
    promise
      .then(() => {
        console.log('success')
      })
      .catch(error => {
        console.log("ERROR: " + error);
      });
  }

  editToDo(todoId, title, priority) {
    const promise = this.af.database.object(`todos/${todoId}`)
      .update({
        title: title,
        priority: priority
      });
    promise
      .then(() => {
        this.message = 'Updated!';
        console.log(this.message);
      })
      .catch(error => {
        console.log("ERROR: " + error);
      });
  }

  doneToDo(todoId) {
    const promise = this.af.database.object(`todos/${todoId}`)
      .update({
        active: false
      });
    promise
      .then(() => {
        console.log('success')
      })
      .catch(error => {
        console.log("ERROR: " + error);
      });
  }

  deleteToDo(todoId) {
    const promise = this.af.database.object(`todos/${todoId}`)
      .remove();
    promise
      .then(() => {
        console.log('success')
      })
      .catch(error => {
        console.log("ERROR: " + error);
      });
  }
}
