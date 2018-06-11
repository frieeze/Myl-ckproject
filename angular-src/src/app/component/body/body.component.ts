import { Component, OnInit } from '@angular/core';
import {ConstellationService} from "../../service/constellation.service";
import {SignalR} from "ng2-signalr";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  click = 12;
  constructor(private constellation: ConstellationService) {  }

  ngOnInit() {
  }

  onClick(){
    this.constellation.startConnection();
  }

}
