import { Component, OnInit } from '@angular/core';
import {CastService} from "../../service/cast.service";
declare var $:any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  lightOn: boolean;
  lightOff:boolean;
  storesOpened:boolean;
  storesClosed:boolean;
  constructor(private castService: CastService) {
    this.lightOff = false;
    this.lightOn = true;
    this.storesOpened = true;
    this.storesClosed = false;
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

  storesButton(){
    if(this.storesOpened && this.storesClosed == false){
      this.storesOpened = false;
      this.storesClosed = true;
    } else{
      this.storesOpened = true;
      this.storesClosed = false;
    }
  }

  volumeUp(){
    this.castService.piVolUp().subscribe((data) => {
      console.log(data);
    })
  }

  volumeDown(){
    this.castService.piVolDown().subscribe((data) => {
      console.log(data);
    })
  }







}
