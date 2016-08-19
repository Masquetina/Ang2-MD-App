import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import "rxjs/operator/filter";

import { AuthService } from "../shared/auth.service";
import { ToDoService } from "./todo.service";
import { ToDo } from "./todo";


@Component({
  moduleId: module.id,
  selector: 'web-protected',
  templateUrl: 'protected.component.html',
  styleUrls: ['protected.component.css'],
})

export class ProtectedComponent implements OnInit {
  modalDisplay = 'none';
  ToDoForm: FormGroup;
  todos: Array<ToDo>;

  constructor(private authService: AuthService, private todoService: ToDoService) { }

  createToDo() {
    var active = true;
    var date = new Date().toDateString();
    var title = this.ToDoForm.value.title;
    var description = this.ToDoForm.value.description;
    var user = this.authService.getUser().email;
    this.todoService.createToDo(active, date, title, description, user);
    this.closeModal();
  }

  doneToDo(id: number) {
    this.todoService.doneToDo(id);
  }

  deleteToDo(id: number) {
    this.todoService.deleteToDo(id);
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
        Validators.maxLength(100),
      ]),
    });

    this.todoService.getAll()
      .subscribe(data => this.todos = data);
  }
}
