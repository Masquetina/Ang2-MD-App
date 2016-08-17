import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'web-detail',
  templateUrl: 'detail.component.html',
  styleUrls: ['detail.component.css']
})
export class DetailComponent implements OnInit {
  todo: FirebaseObjectObservable<any>;

  constructor(private af: AngularFire, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .map(params => {
        return params['id']
      })
      .subscribe(id => {
        this.todo = this.af.database.object(`todos/${id}`);
      });
  }
}
