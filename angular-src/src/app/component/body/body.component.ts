import { Component, OnInit } from '@angular/core';
import {ConstellationService} from "../../service/constellation.service";
declare var $: any;

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  constellation: any;

  constructor(private constellationService: ConstellationService) {  }

  ngOnInit() {
    this.initConstellation();
  }

  initConstellation(){
    this.constellation = this.constellationService.constellationConsumer();
    this.constellation.initializeClient("http://localhost:8088", "issou", "Tigrou");
    this.constellation.onConnectionStateChanged(function (change) {
      if (change.newState === $.signalR.connectionState.connected) {
        console.log("Je suis connecté !");
      }
    });
    this.constellation.connect();
  }

  onClick(){
    this.constellation.sendMessage({ Scope: 'Package', Args: ['PushBullet'] }, 'PushNote',  ['test', 'Coucou c\'est moi Moumou la reine des mouettes']);
  }


}
