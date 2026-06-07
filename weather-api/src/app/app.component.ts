import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WeatherData } from './models/weather.model';
import { WeatherService } from './services/weather.service';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title: string = 'weather';
  city: string = 'London';
  dupCity = this.city;
  data?: WeatherData;
  checkCity: boolean = false;
  loading: boolean = false;
  errorMessage: string = '';
  currentTime: Date = new Date();
  isDarkTheme: boolean = false;
  lastSearchedCity: string = '';

  private destroy$ = new Subject<void>();

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.updateTime();
    this.loadTheme();
    this.common(this.city);
    this.city = '';

    // Update time every minute
    interval(60000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateTime();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(form: NgForm) {
    if (this.city.trim()) {
      this.lastSearchedCity = this.city.trim();
      this.common(this.city.trim());
      this.dupCity = this.city.trim();
      this.city = '';
    }
  }

  onInputChange(): void {
    this.clearError();
  }

  getCurrentLocation(): void {
    if (navigator.geolocation) {
      this.loading = true;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          this.getWeatherByCoords(lat, lon);
        },
        (error) => {
          this.loading = false;
          this.errorMessage =
            'Unable to get your location. Please search for a city.';
          console.error('Geolocation error:', error);
        }
      );
    } else {
      this.errorMessage = 'Geolocation is not supported by this browser.';
    }
  }

  private getWeatherByCoords(lat: number, lon: number): void {
    this.weatherService.getWeatherByCoords(lat, lon).subscribe({
      next: (response) => {
        this.data = response;
        this.dupCity = response.location.name;
        this.loading = false;
        this.checkCity = false;
        this.clearError();
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Unable to get weather data for your location.';
        console.error(err);
      },
    });
  }

  private common(city: string): void {
    this.loading = true;
    this.clearError();

    this.weatherService.getWeatherData(city).subscribe({
      next: (response) => {
        this.data = response;
        this.loading = false;
        this.checkCity = false;
        this.clearError();
        console.log(response);
      },
      error: (err) => {
        this.loading = false;
        this.checkCity = true;
        this.errorMessage = `City "${city}" not found. Please try a different city.`;
        console.error(err);
      },
      complete: () => {
        console.log('Weather data fetch complete.');
      },
    });
  }

  private updateTime(): void {
    this.currentTime = new Date();
  }

  clearError(): void {
    this.errorMessage = '';
    this.checkCity = false;
  }

  getAQIClass(aqi: number): string {
    if (aqi <= 1) return 'aqi-good';
    if (aqi <= 2) return 'aqi-moderate';
    if (aqi <= 3) return 'aqi-unhealthy-sensitive';
    if (aqi <= 4) return 'aqi-unhealthy';
    if (aqi <= 5) return 'aqi-very-unhealthy';
    return 'aqi-hazardous';
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.saveTheme();
    this.applyTheme();
  }

  loadTheme(): void {
    const savedTheme = localStorage.getItem('weather-theme');
    this.isDarkTheme = savedTheme === 'dark';
    this.applyTheme();
  }

  saveTheme(): void {
    localStorage.setItem('weather-theme', this.isDarkTheme ? 'dark' : 'light');
  }

  applyTheme(): void {
    document.body.classList.toggle('dark-theme', this.isDarkTheme);
  }

  refreshWeather(): void {
    if (this.lastSearchedCity) {
      this.common(this.lastSearchedCity);
    } else if (this.dupCity) {
      this.common(this.dupCity);
    }
  }
}
