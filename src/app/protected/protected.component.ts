import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'web-protected',
  templateUrl: 'protected.component.html',
  styleUrls: ['protected.component.css']
})
export class ProtectedComponent implements OnInit {
  modalDisplay = 'none';
  constructor() { }

  openModal() {
    this.modalDisplay = 'block';
  }

  closeModal() {
    this.modalDisplay = 'none';
  }

  ngOnInit() {
  }
}
