import { Comment } from "./comment";

export class ToDo {
  constructor(public active: boolean,
              public date: string,
              public comments: Comment[],
              public title: string,
              public priority: string,
              public user: string) { }
}
