import { Injectable } from "@angular/core";
import { AngularFire}  from "angularfire2";
import { FirebaseListObservable } from "angularfire2";

@Injectable()
export class CommentService {
  todo: FirebaseListObservable<any>;

  constructor(private af: AngularFire) { }

  createComment(commentId, date, comment) {
    this.af.database.list(`todos/${commentId}/comments`)
      .push({
        date: date,
        text: comment
      })
      .catch((error) => {
        console.log("ERROR: " + error);
      });
  }

  getComment(todoId, commentId) {
    return this.af.database
      .object(`todos/${todoId}/comments/${commentId}`, { preserveSnapshot: true });
  }

  editComment(todoId, commentId, comment) {
    this.af.database.object(`todos/${todoId}/comments/${commentId}`)
      .update({
        text: comment,
      })
      .catch((error) => {
        console.log("ERROR: " + error);
      });
  }

  deleteComment(todoId, commentId) {
    this.af.database.object(`todos/${todoId}/comments/${commentId}`)
      .remove()
      .catch((error) => {
        console.log("ERROR: " + error);
      });
  }
}
