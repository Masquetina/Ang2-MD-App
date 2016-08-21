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
  id: string;

  constructor(private authService: AuthService, private todoService: ToDoService) { }

  openModal(id: number) {
    this.modalDisplay = 'block';
    if(id) {
      this.button = 'edit';
      this.todoService.getToDo(id)
        .subscribe(snapshot => {
          this.todo = snapshot.val();
          this.id = snapshot.key;
      })
    }
    if(!id) {
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
      this.todoService.editToDo(this.id, title);
      this.closeModal();
    }
  }

  doneToDo(id: number) {
    this.todoService.doneToDo(id);
  }

  deleteToDo(id: number) {
    this.todoService.deleteToDo(id);
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
    this.subscription = this.todoService.getAll()
      .subscribe(
        data => this.todos = data,
        error => console.log("ERROR: " + error)
      );
    //
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
