import { Injectable } from "@angular/core";

import { AngularFire, firebaseAuthConfig } from "angularfire2";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
  public isAuth = false;

  constructor(public af: AngularFire, private router: Router) {
    this.af.auth.subscribe(
      user => this.changeState(user),
      error => console.log("ERROR CODE: " + error.code)
    );
  }

  loginUser() {
    this.af.auth.login(firebaseAuthConfig)
      .then((res) => {
        if(res)
          this.router.navigate(['/protected']);
      })
      .catch((error) => {
        console.log("ERROR: " + error);
      });
  }

  logoutUser() {
    this.af.auth.logout();
  }

  changeState(user: any = null) {
    if(user) {
      this.isAuth = true;
      var user = this.getUserInfo(user);
        console.log(user.name);
        console.log(user.avatar);
        console.log(user.email);
        console.log(user.uid);
    }
    else {
      this.isAuth = false;
    }
  }

  getUserInfo(user: any): any {
    return {
      name: user.auth.providerData[0].displayName,
      avatar: user.auth.providerData[0].photoURL,
      email: user.auth.providerData[0].email,
      uid: user.auth.providerData[0].uid
    };
  }
}
