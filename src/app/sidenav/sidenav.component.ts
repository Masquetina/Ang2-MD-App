import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'web-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.css']
})
export class SidenavComponent {

  views: Object[] = [
    {
      icon: "home",
      name: "Home",
      description: "Back to basics",
      path: ""
    },
    {
      icon: "view_list",
      name: "ToDo List",
      description: "Let's get productive!",
      path: ""
    },
    {
      icon: "launch",
      name: "Login",
      description: "Feeling productive today?",
      path: ""
    },
    {
      icon: "info_outline",
      name: "About",
      description: "Aren't you curious?",
      path: "about"
    }
  ];
}
