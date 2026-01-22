import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { ForecastResponse, MeteoData } from '../models/weather.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3001/api/forecast';

  // Fallback data matching your forecast_data.json + Knowledge Engine logic
  // This ensures your UI works even if you haven't started the Node server yet.
  private MOCK_DATA: MeteoData[] = [
    { date: "2026-02-01", tmax: 35.2, rhum: 45.0, wspd: 12.0, alert: null },
    { date: "2026-02-02", tmax: 36.5, rhum: 40.0, wspd: 10.0, alert: null },
    { date: "2026-02-03", tmax: 42.1, rhum: 18.0, wspd: 5.0, alert: {
        type: "HEATWAVE_CRITICAL",
        level: "CRITICAL",
        message: "Critical temperature detected: 42.1°C exceeds safety limit.",
        date: "2026-02-03"
    }},
    { date: "2026-02-04", tmax: 43.5, rhum: 15.0, wspd: 4.0, alert: {
        type: "PERSISTENT_HEATWAVE",
        level: "EXTREME",
        message: "Extreme Heatwave: Temperature > 40°C for 3 consecutive days.",
        date: "2026-02-04"
    }}
  ];

  getForecast(): Observable<ForecastResponse> {
    return this.http.get<ForecastResponse>(this.apiUrl).pipe(
      tap(data => console.log('Connection to Knowledge Engine established:', data)),
      catchError((error: HttpErrorResponse) => {
        console.warn('Backend unreachable (is node server.js running?). Using Mock Data.', error.message);
        
        // Return a mock structure that mimics the real API response
        return of({
          status: 'simulated',
          source: 'Fallback_Mock_Data',
          data: this.MOCK_DATA
        } as ForecastResponse);
      })
    );
  }
}