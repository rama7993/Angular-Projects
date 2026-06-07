import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { WeatherData } from '../models/weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly baseUrl = environment.weatherApi.baseUrl;
  private readonly headers = new HttpHeaders(environment.weatherApi.headers);

  constructor(private http: HttpClient) {}

  getWeatherData(city: string): Observable<WeatherData> {
    const params = new HttpParams().set('q', city);

    return this.http
      .get<WeatherData>(this.baseUrl, { headers: this.headers, params })
      .pipe(
        catchError((error) => {
          console.error('Error fetching weather data', error);
          return throwError(() => new Error(error));
        })
      );
  }

  getWeatherByCoords(lat: number, lon: number): Observable<WeatherData> {
    const params = new HttpParams().set('q', `${lat},${lon}`).set('aqi', 'yes');

    return this.http
      .get<WeatherData>(this.baseUrl, { headers: this.headers, params })
      .pipe(
        catchError((error) => {
          console.error('Error fetching weather data by coordinates', error);
          return throwError(() => new Error(error));
        })
      );
  }
}
