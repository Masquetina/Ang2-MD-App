import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./static/home.component";
import { LoginComponent } from "./login/login.component";
import { ProtectedComponent } from "./protected/protected.component";
import { DetailComponent } from "./protected/detail.component";
import { NonAuthGuard } from "./shared/non-auth.guard";
import { AuthGuard } from "./shared/auth.guard";

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [NonAuthGuard] },
  { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] },
  { path: 'protected/:id', component: DetailComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
