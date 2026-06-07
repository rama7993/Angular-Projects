import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  baseUrl = 'https://spotify81.p.rapidapi.com/';

  XRapidAPIHostHeaderName = 'X-RapidAPI-Host';
  XRapidAPIHostHeaderValue = 'spotify81.p.rapidapi.com';

  XRapidAPIKeyHeaderName = 'X-RapidAPI-Key';
  XRapidAPIKeyHeaderValue =
    '4720593e57msh3abdd3843c498c8p11c153jsn6dba63cf1c8e';

  constructor(private http: HttpClient) {}

  search(query: string, type: string): Observable<any> {
    const body = {
      headers: new HttpHeaders()
        .set(this.XRapidAPIHostHeaderName, this.XRapidAPIHostHeaderValue)
        .set(this.XRapidAPIKeyHeaderName, this.XRapidAPIKeyHeaderValue),

      params: new HttpParams().set('q', query).set('type', type),
    };

    return this.http.get(this.baseUrl + 'search', body);
  }

  getTracks(id: string): Observable<any> {
    const body = {
      headers: new HttpHeaders()
        .set(this.XRapidAPIHostHeaderName, this.XRapidAPIHostHeaderValue)
        .set(this.XRapidAPIKeyHeaderName, this.XRapidAPIKeyHeaderValue),

      params: new HttpParams().set('ids', id),
    };

    return this.http.get(this.baseUrl + 'tracks', body);
  }

  getArtists(id: string): Observable<any> {
    const body = {
      headers: new HttpHeaders()
        .set(this.XRapidAPIHostHeaderName, this.XRapidAPIHostHeaderValue)
        .set(this.XRapidAPIKeyHeaderName, this.XRapidAPIKeyHeaderValue),

      params: new HttpParams().set('ids', id),
    };

    return this.http.get(this.baseUrl + 'artists', body);
  }

  getAlbums(id: string): Observable<any> {
    const body = {
      headers: new HttpHeaders()
        .set(this.XRapidAPIHostHeaderName, this.XRapidAPIHostHeaderValue)
        .set(this.XRapidAPIKeyHeaderName, this.XRapidAPIKeyHeaderValue),

      params: new HttpParams().set('ids', id),
    };

    return this.http.get(this.baseUrl + 'albums', body);
  }

  getOverview(id: string): Observable<any> {
    const body = {
      headers: new HttpHeaders()
        .set(this.XRapidAPIHostHeaderName, this.XRapidAPIHostHeaderValue)
        .set(this.XRapidAPIKeyHeaderName, this.XRapidAPIKeyHeaderValue),

      params: new HttpParams().set('ids', id),
    };

    return this.http.get(this.baseUrl + 'artist_albums', body);
  }
}
