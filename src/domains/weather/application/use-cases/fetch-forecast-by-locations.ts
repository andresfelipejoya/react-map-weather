import { forecast } from "@/domains/weather/infrastructure/openweathermap.client";
import { WeatherApiResponse } from "@/domains/weather/weather.types";
import { DailyGroupedForecast, groupForecastByDate } from "@/domains/weather/application/services/group-forecast-by-date";

interface Location {
    lat: number;
    lng: number;
}

export interface NewWeatherData {
    origin: DailyGroupedForecast[] | null;
    destination: DailyGroupedForecast[] | null;
}

export async function fetchWeatherByLocations(
    origin: Location | null,
    destination: Location | null,
): Promise<NewWeatherData> {
    const newWeatherData: NewWeatherData = {
        origin: null,
        destination: null,
    };

    if (origin?.lat && origin?.lng) {
        const originForecast = await forecast(origin.lat, origin.lng);
        newWeatherData.origin = groupForecastByDate(originForecast);
    }

    if (destination?.lat && destination?.lng) {
        const destinationForecast = await forecast(destination.lat, destination.lng);
        newWeatherData.destination = groupForecastByDate(destinationForecast);
    }

    return newWeatherData;
}
