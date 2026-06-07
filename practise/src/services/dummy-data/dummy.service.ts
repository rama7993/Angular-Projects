import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DummyService {
  private apiUrl = 'https://dummyjson.com/';

  constructor(private http: HttpClient) {}

  getDummyData(params: any): Observable<any> {
    return this.http.get<any>(
      this.apiUrl + 'quotes',
      this.getHttpOptionWithParams(params)
    );
  }

  getHttpOptionWithParams = (params: any) => {
    return {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
      params: params,
    };
  };
}
