import { chunkCoords } from "@/domains/weather/application/services/chunk-coords";
import { DailyGroupedForecast, groupForecastByDate } from "@/domains/weather/application/services/group-forecast-by-date";
import { weather } from "@/domains/weather/infrastructure/openweathermap.client";
import { DailyData } from "../../weather.types";
import { reverseGeocode } from "@/domains/location-search/infrastructure/openstreetmap.client";

interface Coordinates {
  lat: number;
  lng: number;
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getWeatherForRoute(coords: Coordinates[]) {
  if (coords.length === 0) return [];

  const chunkSize = coords.length > 4000 ? 400 : 80;

  const chunks = chunkCoords(coords, chunkSize);

  const result: DailyData = {
    time: [],
    weathercode: [],
    temperature_2m_max: [],
    temperature_2m_min: [],
    precipitation_sum: [],
    cloudcover_mean: [],
    precipitation_hours: [],
  };

  await Promise.all(
    chunks.map(async (chunk) => {
      const { lat, lng } = chunk[0];
      const weatherResponses = await weather(lat, lng);
      result.time.push(...weatherResponses?.daily?.time ?? []);
      result.weathercode.push(...weatherResponses?.daily?.weathercode ?? []);
    })
  );

  // Llamadas a Nominatim con throttling
  const geoResponses: any[] = [];
  for (const chunk of chunks) {
    const { lat, lng } = chunk[0];
    const geo = await reverseGeocode(lat, lng);
    geoResponses.push(geo?.display_name ?? "Desconocido");
    await delay(1000);
  }

  const forecastByDate = groupForecastByDate({
    daily: {
      ...result
    }
  });

  return [{
    date: forecastByDate[0].date,
    hours: forecastByDate[0].hours.map((hour, idx) => ({
      ...hour,
      place: geoResponses[idx],
    })),
  }];
}
