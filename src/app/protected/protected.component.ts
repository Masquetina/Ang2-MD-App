import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  moduleId: module.id,
  selector: 'web-protected',
  templateUrl: 'protected.component.html',
  styleUrls: ['protected.component.css']
})

export class ProtectedComponent implements OnInit {
  modalDisplay = 'none';
  ToDoForm: FormGroup;

  constructor() { }

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
