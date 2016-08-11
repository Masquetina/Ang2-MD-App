import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";
import { ReactiveFormsModule } from "@angular/forms";

import { MdToolbarModule } from "@angular2-material/toolbar";
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdButtonModule } from "@angular2-material/button";
import { MdListModule } from "@angular2-material/list";
import { MdIconModule } from "@angular2-material/icon";

import { AppComponent } from "./app.component";
import { SidenavComponent } from "./sidenav/sidenav.component";
import { MdProgressCircleModule } from "@angular2-material/progress-circle";
import { MdRippleModule } from "@angular2-material/core";

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
    MdRippleModule
  ],
  declarations: [
    AppComponent,
    SidenavComponent
  ],
  //providers: [
  //
  //],
  bootstrap: [AppComponent],
})
export class AppModule {}
