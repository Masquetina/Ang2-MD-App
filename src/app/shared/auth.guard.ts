import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from "angularfire2/angularfire2";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AngularFireAuth, private router: Router) {}

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):
    Observable<boolean>|boolean {
    this.auth.subscribe((auth) => {
      if (!auth) {
        this.router.navigate(['/login']);
        return false;
      }
    });
    return true;
  }
}
