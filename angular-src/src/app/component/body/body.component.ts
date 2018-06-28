import {Component, OnInit} from '@angular/core';
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
  twitch = false;
  spotifyIframe = false;
  search: string;
  currentDisplay: string;

  constructor(private constellationService: ConstellationService) { };

  ngOnInit() {
    this.initConstellation();
  };

  initConstellation(){
    this.constellation = this.constellationService.constellationConsumer();
    this.constellation.initializeClient("http://localhost:8088", "issou", "Tigrou");
    this.constellation.onConnectionStateChanged(function (change) {
      if (change.newState === $.signalR.connectionState.connected) {
        console.log("Je suis connecté !");
      }
    });
    this.constellation.connect();
  };

  organize(){
    let organize = [];
    for(let i = 0; i<this.resp.length; i+=2){
      if(this.resp[i+1]) {
        let temp = [this.resp[i], this.resp[i + 1]]
        organize.push(temp);
      } else {
        let temp = [this.resp[i]];
        organize.push(temp);
      }
    }
    this.resp = organize;
    console.log('Organized');
    console.log(this.resp);
  };

  onClick(){
    console.log('PushBullet');
    this.constellation.sendMessage({ Scope: 'Package', Args: ['PushBullet'] }, 'PushNote','title', 'my_thermostat_id');
  };

  onSpotify(){
    console.log("La playlist svp !");
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
      self.organize();
      self.currentDisplay = 'spotify';
    },
      { Scope: 'Package', Args: ['Spotify'] }, 'getPlayLists');
  };

  onSpotifyGetArtist(){
    console.log("Je voudrais : "+this.search);
    var self = this;
    this.playlist = false;
    this.constellation.sendMessageWithSaga(function(response){
        console.log("Réponse du serveur");
        self.resp = [];
        response.Data.Result.artists.items.forEach(element => {
          var artist = {
            image: element.images[0].url,
            name: element.name,
            uri: element.uri,
            id: element.id
          };
          self.resp.push(artist);
        });
        self.organize();
        self.playlist = true;
      },
      { Scope: 'Package', Args: ['Spotify'] }, 'searchArtists',this.search);
  };

  onSpotifyAlbumsFromArtist(artist: string){
    console.log('get albums');
    console.log("Je voudrais : "+artist);
    let self = this;
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
        self.organize();
      },
      { Scope: 'Package', Args: ['Spotify'] }, 'getAlbumsFromArtist',artist);
  };

  onTwitch(){
    console.log("Twitch");
    let self = this;
    this.constellation.sendMessageWithSaga(function(response){
        console.log("Réponse du serveur");
        self.resp = [];
        response.Data.Result.streams.forEach(element => {
          var newLive = {
            image: element.preview.medium,
            name: element.channel.display_name,
            url: element.channel.url,
            title: element.channel.status,
            viewers: element.viewers,
            game: element.channel.game
          };
          self.resp.push(newLive);
        });
        self.organize();
        self.currentDisplay = 'twitch';
      },
      { Scope: 'Package', Args: ['Twitch'] }, 'getStreams');
  };

  onYoutube(){
    console.log("Youtube");
    let self = this;
    this.playlist = false;
    this.constellation.sendMessageWithSaga(function(response){
        console.log("Réponse du serveur");
        console.log(response);
        self.resp = [];
        response.Data.Result.items.forEach(element => {
          var newChannel = {
            image: element.snippet.thumbnails.default,
            name: element.snippet.title,
            id: element.snippet.channelId,
          };
          self.resp.push(newChannel);
        });
        self.organize();
        self.currentDisplay = 'youtube';
      },
      { Scope: 'Package', Args: ['YoutubeAPI'] }, 'getSubscriptions');
  };

  onYoutubeChannelVideo(id: string){
    console.log("Youtube je veux : "+id);
    let self = this;
    this.playlist = false;
    this.constellation.sendMessageWithSaga(function(response){
        console.log("Réponse du serveur");
        self.resp = [];
        response.Data.Result.items.forEach(element => {
          var newVideo = {
            image: element.snippet.thumbnails.medium.url,
            name: element.snippet.title,
            url: "https://www.youtube.com/watch?v="+element.id.videoId
          };
          self.resp.push(newVideo);
        });
        self.organize();
      },
      { Scope: 'Package', Args: ['YoutubeAPI'] }, 'getVideosFromChannel', id);
  };

  newUrl(uri){
    this.url = "http://open.spotify.com/embed?uri="+uri;
    this.spotifyIframe = true;
  };
}
