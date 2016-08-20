import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

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
          this.todo = snapshot.val()
          this.id = snapshot.key
      });
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
      var description = this.ToDoForm.value.description;
      var user = this.authService.getUser().email;
      this.todoService.createToDo(active, date, title, description, user);
      this.closeModal();
    }
    if(this.button == 'edit') {
      title = this.ToDoForm.value.title;
      description = this.ToDoForm.value.description;
      this.todoService.editToDo(this.id, title, description);
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
