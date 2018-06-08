import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  lightOn: boolean;
  lightOff:boolean;
  constructor() {
    this.lightOff = false;
    this.lightOn = true;
  }

  ngOnInit() {
  }

  lumiere(){
    if (this.lightOn && this.lightOff == false) {
      this.lightOn = false;
      this.lightOff = true;
    } else {
      this.lightOn = true;
      this.lightOff = false;
    }
  }

}
