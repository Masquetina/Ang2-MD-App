export class ToDo {

  constructor(public active: boolean,
              public date: string,
              public description: string,
              public title: string,
              public user: string
              ) {
    this.active = true;
    this.date = date;
    this.description = description;
    this.title = title;
    this.user = user;
  }
}
