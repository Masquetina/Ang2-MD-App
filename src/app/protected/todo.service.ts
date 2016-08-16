import { Injectable } from "@angular/core";

import { AngularFire, FirebaseListObservable } from "angularfire2";
import { ToDo } from "./todo";

@Injectable()
export class ToDoService {
  public todo: ToDo;
  users: FirebaseListObservable<any>;

  constructor(private af: AngularFire) {
    this.users = this.af.database.list('users');
  }
}
