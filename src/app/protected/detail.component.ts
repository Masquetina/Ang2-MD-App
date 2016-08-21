import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs";
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

import { CommentService } from "./comment.service";

@Component({
  moduleId: module.id,
  selector: 'web-detail',
  templateUrl: 'detail.component.html',
  styleUrls: ['detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  CommentsForm: FormGroup;
  todo: FirebaseObjectObservable<any>;
  comments: FirebaseListObservable<any>;
  id: string;

  constructor(private af: AngularFire,
              private route: ActivatedRoute,
              private commentService: CommentService) { }

  submitCommentsForm() {
    var comment = this.CommentsForm.value.comment;
    this.commentService.createComment(this.id, comment);
    this.CommentsForm.reset();
  }

  ngOnInit() {
    this.subscription = this.route.params
      .map(params => {
        return this.id = params['id'];
      })
      .subscribe(id => {
        this.todo = this.af.database.object(`todos/${id}`);
        this.comments = this.af.database.list(`todos/${id}/comments`);
      });
    //
    this.CommentsForm = new FormGroup({
      'comment': new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(250),
      ])
    });
  }

  ngOnDestroy() {
    this.subscription
      .unsubscribe();
  }
}
