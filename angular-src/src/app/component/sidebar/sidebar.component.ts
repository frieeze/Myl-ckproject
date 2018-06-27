import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  lightOn: boolean;
  lightOff:boolean;
  shuttersOpened:boolean;
  shuttersClosed:boolean;
  constructor() {
    this.lightOff = false;
    this.lightOn = true;
    this.shuttersOpened = true;
    this.shuttersClosed = false;
  }

  ngOnInit() {
  }

  lightsButton(){
    if (this.lightOn && this.lightOff == false) {
      this.lightOn = false;
      this.lightOff = true;
    } else {
      this.lightOn = true;
      this.lightOff = false;
    }
  }

  shuttersButton(){
    if(this.shuttersOpened && this.shuttersClosed == false){
      this.shuttersOpened = false;
      this.shuttersClosed = true;
    } else{
      this.shuttersOpened = true;
      this.shuttersClosed = false;
    }
  }







}
