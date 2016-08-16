import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFire } from "angularfire2";
import { Observable } from "rxjs";
import "rxjs/operator/filter";

import { AuthService } from "../shared/auth.service";
//import { ToDoService } from "./todo.service";

@Component({
  moduleId: module.id,
  selector: 'web-protected',
  templateUrl: 'protected.component.html',
  styleUrls: ['protected.component.css'],
})

export class ProtectedComponent implements OnInit {
  modalDisplay = 'none';
  ToDoForm: FormGroup;
  todos: Observable<any>;

  constructor(private af: AngularFire, private authService: AuthService) {
    this.todos = this.af.database.list('todos')
      .map(todos => {
        const filtered = todos.filter(todo =>
        todo.user === this.authService.getUser().email && todo.active === true);
        return filtered;
      });
  }

  getToDo(key: number) {
    this.af.database.object('todos/' + key)
      .subscribe(todo =>
        console.log(todo.description)
      );
  }

  openModal() {
    this.modalDisplay = 'block';
  }

  closeModal() {
    this.modalDisplay = 'none';
    this.ToDoForm.reset();
  }

  onCancel(event) {
    event.preventDefault();
    this.closeModal();
  }

  onSave() {

  }

  ngOnInit(): any {
    this.ToDoForm = new FormGroup({
      'title': new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
      ]),
      'description': new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
      ]),
    });
  }
}
