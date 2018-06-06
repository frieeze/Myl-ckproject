import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isOn: boolean;
  constructor() {
    this.isOn = false;
  }

  ngOnInit() {
  }

  lumiere(){
    if (this.isOn) {
      this.isOn = false;
    } else {
      this.isOn = true;
    }
  }

}
