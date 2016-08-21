import { Injectable } from "@angular/core";
import { AngularFire}  from "angularfire2";
import { FirebaseListObservable } from "angularfire2";

@Injectable()
export class CommentService {
  todo: FirebaseListObservable<any>;

  constructor(private af: AngularFire) { }

  createComment(id, comment) {
    this.af.database.list(`todos/${id}/comments`)
      .push({
        text: comment
    })
      .catch((error) => {
        console.log("ERROR: " + error);
    });
  }
}
