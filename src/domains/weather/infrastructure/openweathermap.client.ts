import axios from "axios";
import { WeatherApiResponse } from "@/domains/weather/weather.types";

const URL = process.env.OWM_API_URL;
// const API_KEY = process.env.OWM_API_KEY;

export class ExceedingSubscriptionError extends Error {
    constructor(message: string = "Your account is temporary blocked due to exceeding of requests limitation of your subscription type.") {
        super(message);
        this.name = "ExceedingSubscriptionError";
    }
}

export const forecast = async (lat: number, lon: number): Promise<WeatherApiResponse> => {
    try {
        const response = await axios.get<WeatherApiResponse>(`${URL}/forecast`, {
            params: {
                latitude: lat,
                longitude: lon,
                hourly: "temperature_2m,precipitation,weathercode,cloudcover",
                timezone: "auto",
                forecast_days: 5,
            },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 429) { // This only necesary if the API has a rate limit
            throw new ExceedingSubscriptionError(error.message);
        }
        throw error;
    }
}

export const weather = async (lat: number, lon: number): Promise<WeatherApiResponse> => {
    try {
        const response = await axios.get<WeatherApiResponse>(`${URL}/forecast`, {
            params: {
                latitude: lat,
                longitude: lon,
                daily: "temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode,cloudcover_mean,precipitation_hours",
                timezone: "auto",
                forecast_days: 1,
            },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 429) { // This only necesary if the API has a rate limit
            throw new ExceedingSubscriptionError(error.message);
        }
        throw error;
    }
}