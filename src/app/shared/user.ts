export class User {

  constructor(public name: string,
              public email: string,
              public photoURL: string,
              public uid: any) {
    this.name = name;
    this.email = email;
    this.photoURL = photoURL;
    this.uid = uid;
  }
}
