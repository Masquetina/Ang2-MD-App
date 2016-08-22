import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from "rxjs";
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

import { CommentService } from "./comment.service";
import { ToDoService } from "./todo.service";
import { Comment } from "./comment";

@Component({
  moduleId: module.id,
  selector: 'web-detail',
  templateUrl: 'detail.component.html',
  styleUrls: ['detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  CommentForm: FormGroup;
  todo: FirebaseObjectObservable<any>;
  comments: FirebaseListObservable<any>;
  @Input() commentObj: Comment = null;
  button: string = 'create';
  todoId: string;
  commentId: string;

  constructor(private af: AngularFire,
              private route: ActivatedRoute,
              private commentService: CommentService,
              private todoService: ToDoService,
              private router: Router) {
    this.CommentForm = new FormGroup({
      'comment': new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(250),
      ])
    });
  }

  doneToDo() {
    this.todoService.doneToDo(this.todoId);
    this.router.navigate(['/protected']);
  }

  submitCommentForm() {
    if(this.button == 'create') {
      var comment = this.CommentForm.value.comment;
      this.commentService.createComment(this.todoId, comment);
    }
    if(this.button == 'edit') {
      var comment = this.CommentForm.value.comment;
      this.commentService.editComment(this.todoId, this.commentId, comment);
    }
    this.resetCommentForm();
  }

  editComment(commentId) {
    this.button = 'edit';
    this.commentService.getComment(this.todoId, commentId)
      .subscribe(snapshot => {
        this.commentObj = snapshot.val();
        this.commentId = snapshot.key;
      });
  }

  deleteComment(commentId) {
    this.commentService.deleteComment(this.todoId, commentId);
  }

  onCancel(event) {
    event.preventDefault();
    this.resetCommentForm();
  }

  resetCommentForm() {
    this.button = 'create';
    this.commentObj = null;
    this.CommentForm.reset();
  }

  ngOnInit() {
    this.subscription = this.route.params
      .map(params => {
        return this.todoId = params['id'];
      })
      .subscribe(todoId => {
        this.todo = this.af.database.object(`todos/${todoId}`);
        this.comments = this.af.database.list(`todos/${todoId}/comments`);
      });
  }

  ngOnDestroy() {
    this.subscription
      .unsubscribe();
  }
}
