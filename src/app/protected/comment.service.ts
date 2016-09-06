import { Injectable } from "@angular/core";
import { AngularFire}  from "angularfire2";
import { FirebaseListObservable } from "angularfire2";

@Injectable()
export class CommentService {
  todo: FirebaseListObservable<any>;

  constructor(private af: AngularFire) { }

  getComment(todoId, commentId) {
    return this.af.database
      .object(`todos/${todoId}/comments/${commentId}`, { preserveSnapshot: true })
  }

  createComment(todoId, date, comment) {
    const promise = this.af.database.list(`todos/${todoId}/comments`)
      .push({
        date: date,
        text: comment
      });
    promise
      .then(() => {
        console.log('success')
      })
      .catch(error => {
        console.log("ERROR: " + error);
      });
  }

  editComment(todoId, commentId, comment) {
    const promise = this.af.database.object(`todos/${todoId}/comments/${commentId}`)
      .update({
        text: comment,
      });
    promise
      .then(() => {
        console.log('success')
      })
      .catch(error => {
        console.log("ERROR: " + error);
      });
  }

  deleteComment(todoId, commentId) {
    const promise = this.af.database.object(`todos/${todoId}/comments/${commentId}`)
      .remove();
    promise
      .then(() => {
        console.log('success')
      })
      .catch(error => {
        console.log("ERROR: " + error);
      });
  }
}
