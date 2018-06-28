import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class CastService {

  constructor(private httpClient: HttpClient) { }

  piCast(url: string){
    console.log(url);
    //return this.httpClient.post('http://localhost:8080/cast', {url: url});
  }

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


}
