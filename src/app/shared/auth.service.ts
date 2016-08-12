import { Injectable } from "@angular/core";

import { AngularFire, firebaseAuthConfig } from "angularfire2";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
  public isAuth = false;
  public user = { };

  constructor(public af: AngularFire, private router: Router) {
    this.af.auth.subscribe(
      user => this.changeState(user),
      error => console.trace(error)
    );
  }

  loginUser() {
    this.af.auth.login(firebaseAuthConfig)
      .then((res) => {
      if(res)
        this.router.navigate(['/']);
    });
  }

  logoutUser() {
    this.af.auth.logout();
    this.router.navigate(['/']);
  }

  changeState(user: any = null) {
    if(user) {
      this.isAuth = true;
      this.user = this.getUserInfo(user);
      //console.log(user.auth.providerData[0].displayName);
    }
    else {
      this.isAuth = false;
      this.user = { };
    }
  }

  getUserInfo(user: any): any {
    if(!user) {
      return { };
    }
    let data = user.auth.providerData[0];
    return {
      name: data.displayName,
      avatar: data.photoURL,
      email: data.email,
      provider: data.providerId
    };
  }
}
