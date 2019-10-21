import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private WEATHER_API_URL = `${environment.weatherApiUrl}`;
  private CITIES_API_URL = `${environment.citiesApiUrl}`;
  errorStatus = false;

  constructor(private http: HttpClient) { }

  getAllCities() {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain');
    return this.http.get(`${this.CITIES_API_URL}`, { responseType: 'text', headers });
  }

  getCurrentWeather(city: string) {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain');
    return this.http.post(`${this.WEATHER_API_URL}/data/2.5/weather`, { params: { q: city } })
      .pipe(
        catchError(this.formatError));
  }

  getHourlyForecast(city: string) {
    return this.http.post(`${this.WEATHER_API_URL}/data/2.5/forecast/hourly?q`, { params: city })
      .pipe(
        catchError(this.formatError));
  }

  getWeatherCondition(city: string) {
    return this.http.post(`${this.WEATHER_API_URL}/`, { params: city })
      .pipe(
        catchError(this.formatError));
  }

  private formatError(error: any) {
    console.error('Error Occurred', error);
    this.errorStatus = true;
    console.log('Server Error');
    return Observable.throw(error.json());
  }

}
