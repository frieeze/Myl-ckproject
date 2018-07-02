import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })};


@Injectable()
export class CastService {

  constructor(private httpClient: HttpClient) { }

  piCast(url: any){
    console.log(url);
    return this.httpClient.post('http://localhost:8080/cast', url, httpOptions);
  };

  piAdd(url: string){
    return this.httpClient.post('http://localhost:8080/add', {url: url});
  }

  piPlay(){
    return this.httpClient.post('http://localhost:8080/play', '');
  }

  piPause(){
    return this.httpClient.post('http://localhost:8080/pause', '');
  }

  piSkip(){
    return this.httpClient.post('http://localhost:8080/skip', '');
  }

  piStop(){
    return this.httpClient.post('http://localhost:8080/stop', '');
  }

  piVolDown(){
    return this.httpClient.post('http://localhost:8080/voldown', '');
  }

  piVolUp(){
    return this.httpClient.post('http://localhost:8080/volup', '');
  }

}
