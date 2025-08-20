import { WeatherApiResponse } from '@/domains/weather/weather.types';
import { weatherCodeMap } from '../../const/weather-code-map';

interface HourlyForecast {
  time: string;
  temperature?: number;
  precipitation?: number;
  weathercode: number;
  cloudcover?: number;
  details: {
    text: string;
    icon: string;
  };
}

interface DailyGroupedForecast {
  date: string;
  hours: HourlyForecast[];
}

function groupForecastByDate(data: WeatherApiResponse): DailyGroupedForecast[] {
  const grouped: Record<string, HourlyForecast[]> = {};
  const { hourly, daily } = data;
  const weather = hourly || daily;

  weather?.time.forEach((time, index) => {
    const date = time.split("T")[0];
    const weathercode = data.hourly?.weathercode[index] || 0;
    const forecast: HourlyForecast = {
      time,
      temperature: data.hourly?.temperature_2m[index],
      precipitation: data.hourly?.precipitation[index],
      weathercode,
      cloudcover: data.hourly?.cloudcover[index],
      details: weatherCodeMap[weathercode],
    };

    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(forecast);
  });

  return Object.entries(grouped).map(([date, hours]) => ({
    date,
    hours,
  }));
}

export { groupForecastByDate, DailyGroupedForecast, HourlyForecast };
