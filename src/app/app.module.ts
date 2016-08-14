import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";
import { ReactiveFormsModule } from "@angular/forms";

import {
  AngularFire,
  FIREBASE_PROVIDERS,
  defaultFirebase,
  firebaseAuthConfig,
  AuthMethods,
  AuthProviders
} from 'angularfire2';

import { MdToolbarModule } from "@angular2-material/toolbar";
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdButtonModule } from "@angular2-material/button";
import { MdListModule } from "@angular2-material/list";
import { MdIconModule } from "@angular2-material/icon";

import { AppComponent } from "./app.component";
import { SidenavComponent } from "./sidenav/sidenav.component";
import { MdProgressCircleModule } from "@angular2-material/progress-circle";
import { MdRippleModule } from "@angular2-material/core";
import { MdGridListModule } from "@angular2-material/grid-list";
import { MdCardModule } from "@angular2-material/card";

import { routing } from "./app.routes";
import { HomeComponent} from "./static/home.component";
import { LoginComponent } from "./login/login.component";
import { ProtectedComponent } from "./protected/protected.component";
import { AuthService } from "./shared/auth.service";
import { AuthGuard } from "./shared/auth.guard";
import { NonAuthGuard } from "./shared/non-auth.guard";

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    MdToolbarModule,
    MdSidenavModule,
    MdButtonModule,
    MdListModule,
    MdIconModule,
    MdProgressCircleModule,
    MdRippleModule,
    MdGridListModule,
    MdCardModule,
    routing
  ],
  declarations: [
    AppComponent,
    SidenavComponent,
    HomeComponent,
    LoginComponent,
    ProtectedComponent,
  ],
  providers: [
    AngularFire,
    FIREBASE_PROVIDERS,
    defaultFirebase({
      apiKey: "AIzaSyBppZV9s2nJS-gnjj1XijDx61-P588Wwes",
      authDomain: "web-md-backend.firebaseapp.com",
      databaseURL: "https://web-md-backend.firebaseio.com",
      storageBucket: "web-md-backend.appspot.com",
    }),
    firebaseAuthConfig({
      method: AuthMethods.Popup,
      provider: AuthProviders.Google
    }),
    AuthService,
    AuthGuard,
    NonAuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
