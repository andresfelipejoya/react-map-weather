import { chunkCoords } from "@/domains/weather/application/services/chunk-coords";
import { DailyGroupedForecast, groupForecastByDate } from "@/domains/weather/application/services/group-forecast-by-date";
import { weather } from "@/domains/weather/infrastructure/openweathermap.client";

const CHUNK_SIZE = 50;

interface Coordinates {
  lat: number;
  lng: number;
}

export async function getWeatherForRoute(coords: Coordinates[]) {
  if (coords.length === 0) return [];

  const chunks = chunkCoords(coords, CHUNK_SIZE);
  const results: DailyGroupedForecast[] = [];

  for (const chunk of chunks) {
    const coordinates = chunk[0];
    const weatherResponse = await weather(coordinates.lat, coordinates.lng);
    const groupForescast = groupForecastByDate(weatherResponse);
    results.push(groupForescast[0]);
  }

  return results;
}