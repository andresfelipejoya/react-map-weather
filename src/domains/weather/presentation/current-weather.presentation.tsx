import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectOrigin, selectDestination, selectNameDestination, selectNameOrigin, selectRouteCoords } from "@/domains/location-search/application/store/location.selectors";
import { DailyGroupedForecast } from "@/domains/weather/application/services/group-forecast-by-date";
import { fetchWeatherByLocations, NewWeatherData } from "../application/use-cases/fetch-forecast-by-locations";
import { getWeatherForRoute } from "../application/use-cases/get-weather-for-route";
import { useError } from "@/infrastructure/context/use-error";
import { ExceedingSubscriptionError } from "../infrastructure/openweathermap.client";
import WeatherPanel from "../components/weather-panel";

export function CurrentWeather() {

    const { setError } = useError();

    const [forecastsData, setForecastData] = useState<NewWeatherData | null>(null);
    const [routeWeather, setRouteWeather] = useState<DailyGroupedForecast[] | null>(null);
    const [findingRouteWeather, setFindingRouteWeather] = useState<boolean>(false);
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const nameOrigin = useSelector(selectNameOrigin);
    const nameDestination = useSelector(selectNameDestination);
    const routeCoords = useSelector(selectRouteCoords);

    useEffect(() => {
        const loadWeather = async () => {
            try {
                const data = await fetchWeatherByLocations(origin, destination);
                setForecastData(data);
            } catch (error) {
                if (error instanceof ExceedingSubscriptionError) {
                    setError("Exceeding subscription limits.");
                } else {
                    setError("An unexpected error occurred. Please try again.");
                }
            }

        };

        loadWeather();
    }, [origin, destination]);

    useEffect(() => {
        const loadWeatherForRoute = async () => {
            try {
                setFindingRouteWeather(true);
                const data = await getWeatherForRoute(routeCoords);
                setRouteWeather(data);
                setFindingRouteWeather(false);

            } catch (error) {
                if (error instanceof ExceedingSubscriptionError) {
                    setError("Exceeding subscription limits.");
                } else {
                    setError("An unexpected error occurred. Please try again.");
                }
            }

        };

        loadWeatherForRoute();
    }, [routeCoords]);

    /**
     * Display component
     */
    return (
        <WeatherPanel
            forecastsData={forecastsData}
            routeWeather={routeWeather}
            findingRouteWeather={findingRouteWeather}
            nameOrigin={nameOrigin}
            nameDestination={nameDestination}
        />
    );
}