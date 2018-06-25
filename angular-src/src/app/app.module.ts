import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import {RouterModule, Routes} from "@angular/router";
import { BodyComponent } from './component/body/body.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import {ConstellationService} from "./service/constellation.service";
import { SafePipe } from './pipe/safe.pipe';
import { SpotifyComponent } from './component/spotify/spotify.component';
import {componentFactoryName} from "@angular/compiler";


const appRoutes: Routes = [
  {path: 'spotify', component: SpotifyComponent},
  {path: 'home', component: BodyComponent},
  {path: '', component: BodyComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BodyComponent,
    SidebarComponent,
    SafePipe,
    SpotifyComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),

  ],
  providers: [
    ConstellationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
