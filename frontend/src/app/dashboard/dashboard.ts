import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common'; // Needed for Pipes (Date, Number)
import { toSignal } from '@angular/core/rxjs-interop';
import { WeatherService } from '../services/weather';
import { MeteoData } from '../models/weather.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css' // We will use Tailwind classes in HTML, so this can stay empty
})
export class DashboardComponent {
  private weatherService = inject(WeatherService);

  // 1. Convert the Observable to a Read-Only Signal
  // initialValue is required to prevent errors before data arrives
  forecastSignal = toSignal(this.weatherService.getForecast(), { initialValue: null });

  // 2. Computed Signal: Extract only the data array for easier access
  weatherData = computed(() => {
    const response = this.forecastSignal();
    return response ? response.data : [];
  });

  // 3. Computed Signal: Identify the most critical alert in the forecast
  // This is part of the "Decision Support" aspect of your project
  criticalAlert = computed(() => {
    const data = this.weatherData();
    // Find the first alert that is NOT null
    return data.find(day => day.alert !== null)?.alert || null;
  });
}