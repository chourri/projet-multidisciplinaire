// src/app/models/weather.interface.ts

// Matches the "Rules" output from knowledge_engine.js
export type AlertLevel = 'CRITICAL' | 'HIGH' | 'EXTREME' | 'MODERATE' | 'LOW';

export interface WeatherAlert {
  type: string;    // e.g., "HEATWAVE_CRITICAL", "DRY_HEAT_RISK"
  level: AlertLevel;
  message: string; // e.g., "Critical temperature detected..."
  date: string;
}

// Matches the combined object from processForecasts()
export interface MeteoData {
  date: string;
  tmax: number;
  rhum: number;
  wspd: number;
  alert: WeatherAlert | null; // This is the "Knowledge" layer
}

export interface ForecastResponse {
  status: string;
  source: string;
  data: MeteoData[];
}