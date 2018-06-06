import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import {RouterModule, Routes} from "@angular/router";
import { BodyComponent } from './component/body/body.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';

const appRoutes: Routes = [
]


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BodyComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
