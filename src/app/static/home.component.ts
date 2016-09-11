import { Component } from '@angular/core';
import { AuthService } from "../shared/auth.service";

@Component({
  moduleId: module.id,
  selector: 'web-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent {

  constructor(private authService: AuthService) { }

  isAuth() {
    return this.authService.isAuth;
  }
}
