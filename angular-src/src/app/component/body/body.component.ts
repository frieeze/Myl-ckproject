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
  resp: any[];
  url: string;
  playlist = false;

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
    console.log("hihi j'ai cliqué");
    var self = this;
    this.playlist = false;
    this.constellation.sendMessageWithSaga(function(response){
      console.log("Réponse du serveur");
      self.resp = [];
      response.Data.Result.items.forEach(element => {
        var newPlaylist = {
          image: element.images[0].url,
          name: element.name,
          uri: element.uri
        };
        self.resp.push(newPlaylist);
      });
      console.log(self.resp);
    },
      { Scope: 'Package', Args: ['Spotify'] }, 'getPlayLists');
  }

  newUrl(uri){
    this.url = "http://open.spotify.com/embed?uri="+uri;
    this.playlist = true;
  }
}
