import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnsplashService {

  baseUrl: string='https://api.unsplash.com/';
  accessKey:string='OO8f8zAvwvLphW1Dm4JH9zUbc3wV17p2oPAP71Nh09w';
  constructor(private http: HttpClient) { }

  getImages():Observable<any> {
    return this.http.get(this.baseUrl +'/photos/random/'+'?client_id=`${this.accessKey}` ')
  }
}
