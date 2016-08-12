import { Injectable } from "@angular/core";

import { AngularFire, AuthProviders, AuthMethods } from "angularfire2";

@Injectable()
export class AuthService {
  public isAuth = false;
  public user = { };

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(
      user => this.changeState(user),
      error => console.trace(error)
    );
  }

  loginUser() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
  }

  logoutUser() {
    this.af.auth.logout();
  }

  changeState(user: any = null) {
    if(user) {
      this.isAuth = true;
      this.user = this.getUserInfo(user)
    }
    else {
      this.isAuth = false;
      this.user = {};
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
