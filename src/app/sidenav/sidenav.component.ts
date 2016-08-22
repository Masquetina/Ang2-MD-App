import { Component } from '@angular/core';
import { AuthService } from "../shared/auth.service";

@Component({
  moduleId: module.id,
  selector: 'web-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.css'],
})
export class SidenavComponent {

  constructor(private authService: AuthService) { }

  onLogout() {
    this.authService.logoutUser();
  }

  isAuth() {
    return this.authService.isAuth;
  }
}
