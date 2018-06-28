import {Component, OnInit} from '@angular/core';
import {ConstellationService} from "../../service/constellation.service";
import {CastService} from "../../service/cast.service";

declare var $: any;

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  constellation: any;
  resp: any[];
  url = 'http://open.spotify.com/embed?uri=spotify:user:ea0jxvpxfcr18v16yb5332wpz:playlist:2DqvejrdIyoaRbmyi0M9b4';
  iframe = false;
  search: string;
  currentDisplay: string;

  constructor(private constellationService: ConstellationService,
              private castService: CastService) {
  };

  ngOnInit() {
    this.initConstellation();
  };

  initConstellation() {
    this.constellation = this.constellationService.constellationConsumer();
    this.constellation.initializeClient("http://localhost:8088", "issou", "Tigrou");
    this.constellation.onConnectionStateChanged(function (change) {
      if (change.newState === $.signalR.connectionState.connected) {
        console.log("Je suis connecté !");
      }
    });
    this.constellation.connect();
  };

  organize() {
    let organize = [];
    for (let i = 0; i < this.resp.length; i += 2) {
      if (this.resp[i + 1]) {
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

  onClick(elt) {
    console.log('Click');
    console.log(elt);
    if (this.currentDisplay == 'spotify') {
      if (elt.type == 'playlist' || elt.type == 'album') {
        console.log(this.url);
        this.newUrl(elt.uri);
        /*var ifrm = document.createElement("iframe");
        ifrm.setAttribute("src", this.url);
        ifrm.style.width = "640px";
        ifrm.style.height = "480px";
        $('#spotifyIframe').append(ifrm);*/
      } else {
        this.onSpotifyAlbumsFromArtist(elt.id);
      }
    } else if (this.currentDisplay == 'youtube') {
      if (elt.type == 'channel') {
        this.onYoutubeChannelVideo(elt.id)
      } else {
        const url = {
          url: elt.url
        };
        this.castService.piCast(url).subscribe((data) => {
          console.log('Cast Callback');
          console.log(data);
        });
      }
    } else if (this.currentDisplay == 'twitch') {
      const url = {
        url: elt.url,
      };
      this.castService.piCast(url).subscribe((data) => {
        console.log('Cast Callback');
        console.log(data);
      });
    }
    console.log('Iframe : '+this.iframe);
  };

  onSpotify() {
    console.log("La playlist svp !");
    this.iframe = false;
    var self = this;
    this.constellation.sendMessageWithSaga(function (response) {
        console.log("Réponse du serveur");
        self.resp = [];
        response.Data.Result.items.forEach(element => {
          var newPlaylist = {
            type: 'playlist',
            image: element.images[0].url,
            name: element.name,
            uri: element.uri
          };
          self.resp.push(newPlaylist);
        });
        self.organize();
        self.currentDisplay = 'spotify';
      },
      {Scope: 'Package', Args: ['Spotify']}, 'getPlayLists');
  };

  onSpotifyGetArtist() {
    console.log("Je voudrais : " + this.search);
    var self = this;
    this.constellation.sendMessageWithSaga(function (response) {
        console.log("Réponse du serveur");
        self.resp = [];
        response.Data.Result.artists.items.forEach(element => {
          var artist = {
            type: 'artist',
            image: element.images[0].url,
            name: element.name,
            uri: element.uri,
            id: element.id
          };
          self.resp.push(artist);
        });
        self.organize();
      },
      {Scope: 'Package', Args: ['Spotify']}, 'searchArtists', this.search);
  };

  onSpotifyAlbumsFromArtist(artist: string) {
    console.log('get albums');
    console.log("Je voudrais : " + artist);
    let self = this;
    this.constellation.sendMessageWithSaga(function (response) {
        console.log("Réponse du serveur");
        self.resp = [];
        response.Data.Result.items.forEach(element => {
          var newPlaylist = {
            type: 'album',
            image: element.images[0].url,
            name: element.name,
            uri: element.uri
          };
          self.resp.push(newPlaylist);
        });
        self.organize();
      },
      {Scope: 'Package', Args: ['Spotify']}, 'getAlbumsFromArtist', artist);
  };

  onTwitch() {
    console.log("Twitch");
    this.iframe = false;
    let self = this;
    this.constellation.sendMessageWithSaga(function (response) {
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
      {Scope: 'Package', Args: ['Twitch']}, 'getStreams');
  };

  onYoutube() {
    console.log("Youtube");
    this.iframe = false;
    let self = this;
    this.constellation.sendMessageWithSaga(function (response) {
        console.log("Réponse du serveur");
        console.log(response);
        self.resp = [];
        response.Data.Result.items.forEach(element => {
          var newChannel = {
            type: 'channel',
            image: element.snippet.thumbnails.default.url,
            name: element.snippet.title,
            id: element.snippet.resourceId.channelId,
          };
          self.resp.push(newChannel);
        });
        self.organize();
        self.currentDisplay = 'youtube';
      },
      {Scope: 'Package', Args: ['YoutubeAPI']}, 'getSubscriptions');
  };

  onYoutubeChannelVideo(id: string) {
    console.log("Youtube je veux : " + id);
    let self = this;
    this.constellation.sendMessageWithSaga(function (response) {
        console.log("Réponse du serveur");
        self.resp = [];
        response.Data.Result.items.forEach(element => {
          var newVideo = {
            type: 'video',
            image: element.snippet.thumbnails.medium.url,
            name: element.snippet.title,
            url: "https://www.youtube.com/watch?v=" + element.id.videoId
          };
          self.resp.push(newVideo);
        });
        self.organize();
      },
      {Scope: 'Package', Args: ['YoutubeAPI']}, 'getVideosFromChannel', id);
  };
  newUrl(uri){
    this.url = "http://open.spotify.com/embed?uri="+uri;
    this.iframe = true;
    };
}
