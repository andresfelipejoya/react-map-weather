export interface WeatherApiResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units?: HourlyUnits;
  daily_units?: HourlyUnits;
  hourly?: HourlyData;
  daily?: DailyData;
}

export interface HourlyUnits {
  time: string;              // "iso8601"
  temperature_2m: string;    // "°C"
  precipitation: string;     // "mm"
  weathercode: string;       // "wmo code"
  cloudcover: string;        // "%"
}
export interface DailyUnits {
  time: string;              // "iso8601"
  temperature_2m_max: string; // "°C"
  temperature_2m_min: string; // "°C"
  precipitation_sum: string;  // "mm"
  weathercode: string;        // "wmo code"
  cloudcover_mean: string;    // "%"
  precipitation_hours: string; // "hours"
}

export interface HourlyData {
  time: string[];
  temperature_2m: number[];
  precipitation: number[];
  weathercode: number[];
  cloudcover: number[];
}

export interface DailyData {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  weathercode: number[];
  cloudcover_mean: number[];
  precipitation_hours: number[];
}