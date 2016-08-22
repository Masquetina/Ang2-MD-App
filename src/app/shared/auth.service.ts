import { Injectable } from "@angular/core";
import { AngularFire, firebaseAuthConfig } from "angularfire2";
import { Router } from "@angular/router";
import { User } from "./user";

@Injectable()
export class AuthService {
  public isAuth: boolean = false;
  public user: User;

  constructor(public af: AngularFire, private router: Router) {
    this.af.auth.subscribe(
      user => this.changeState(user),
      error => console.log("ERROR: " + error)
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
      this.user = {
        name: user.auth.providerData[0].displayName,
        email: user.auth.providerData[0].email,
        photoURL: user.auth.providerData[0].photoURL,
        uid: user.auth.providerData[0].uid
      };
    }
    else {
      this.isAuth = false;
      this.user = null;
    }
  }

  getUser(): any {
    return this.user;
  }
}
