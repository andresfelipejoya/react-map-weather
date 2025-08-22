import { HourlyData, DailyData } from '@/domains/weather/weather.types';
import { weatherCodeMap } from '../../const/weather-code-map';

interface HourlyForecast {
  place?: string;
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

function groupForecastByDate(data: {
  hourly?: HourlyData;
  daily?: DailyData;
}): DailyGroupedForecast[] {
  const grouped: Record<string, HourlyForecast[]> = {};
  const { hourly, daily } = data;
  const weatherDara = hourly || daily;
  const weather = hourly || daily;

  weather?.time.forEach((time, index) => {
    const date = time.split("T")[0];
    const weathercode = weatherDara?.weathercode[index] || 0;
    const forecast: HourlyForecast = {
      time,
      weathercode,
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
