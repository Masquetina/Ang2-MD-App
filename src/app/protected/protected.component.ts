import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

import { AuthService } from "../shared/auth.service";
import { ToDoService } from "./todo.service";
import { ToDo } from "./todo";

@Component({
  moduleId: module.id,
  selector: 'web-protected',
  templateUrl: 'protected.component.html',
  styleUrls: ['protected.component.css'],
})
export class ProtectedComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  modalDisplay = 'none';
  ToDoForm: FormGroup;
  todos: Array<ToDo>;
  @Input() todo: ToDo = null;
  button: string;
  todoId: string;
  load: boolean = true;
  asyncLoading = new Promise((resolve, reject) => {
    setTimeout(() => resolve(
      this.subscription = this.todoService.getAll()
        .subscribe(
          data => this.todos = data,
          error => console.log("ERROR: " + error)
        )
    ), 1000);
  });

  constructor(private authService: AuthService, private todoService: ToDoService) { }

  isLoading() {
    if(this.todos == null) {
      this.load = true;
    }
    if(this.todos != null) {
      this.load = false;
    }
    return this.load;
  }

  openModal(todoId) {
    this.modalDisplay = 'block';
    if(todoId) {
      this.button = 'edit';
      this.todoService.getToDo(todoId)
        .subscribe(snapshot => {
          this.todo = snapshot.val();
          this.todoId = snapshot.key;
        });
    }
    if(!todoId) {
      this.button = 'create';
    }
  }

  submitToDoForm () {
    if(this.button == 'create') {
      var active = true;
      var date = new Date().toDateString();
      var title = this.ToDoForm.value.title;
      var comments = null;
      var user = this.authService.getUser().email;
      this.todoService.createToDo(active, date, title, comments, user);
      this.closeModal();
    }
    if(this.button == 'edit') {
      var title = this.ToDoForm.value.title;
      this.todoService.editToDo(this.todoId, title);
      this.closeModal();
    }
  }

  doneToDo(todoId) {
    this.todoService.doneToDo(todoId);
  }

  deleteToDo(todoId) {
    this.todoService.deleteToDo(todoId);
  }

  closeModal() {
    this.modalDisplay = 'none';
    this.ToDoForm.reset();
    this.todo = null;
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
      ])
    });
  }

  ngOnDestroy() {
    this.subscription
      .unsubscribe();
  }
}
