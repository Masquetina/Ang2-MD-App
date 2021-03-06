import { Component } from '@angular/core';
import { AuthService } from "../shared/auth.service";

@Component({
  moduleId: module.id,
  selector: 'web-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService) { }

  onLogin() {
    this.authService.loginUser();
  }
}
