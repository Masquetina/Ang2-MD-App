export class ToDo {

  constructor(public title: string,
              public description: string,
              public active: boolean,
              public date: Date) {
    this.title = title;
    this.description = description;
    this.active = true;
    this.date = new Date();
  }
}
