import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnsplashService {

  newsApiUrl: string = ' https://newsapi.org/v2/top-headlines?country=us&apiKey=ff60dd9700074b3a80829465ba3d2d99'

  constructor(private http: HttpClient) { }

  getImages(): Observable<any> {
    return this.http.get(this.newsApiUrl)
  }

  getVideos(): Observable<any> {
    return this.http.get("../assets/videos.json");
  }

}
