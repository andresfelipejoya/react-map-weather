import { useState } from "react";
import { ArrowDownIcon, ArrowUpIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { DailyGroupedForecast, HourlyForecast } from "@/domains/weather/application/services/group-forecast-by-date";
import { NewWeatherData } from "../application/use-cases/fetch-forecast-by-locations";

const colorMap: Record<string, string> = {
    red: "text-red-500 border-red-500",
    yellow: "text-yellow-500 border-yellow-500",
    blue: "text-blue-500 border-blue-500",
};

const CardWeather = ({ weatherData }: { weatherData: HourlyForecast }) => {
    if (!weatherData) return null;
    return (
        <div className="p-4 border rounded-lg shadow mb-4">
            <p>Time: {new Date(weatherData.time).toLocaleTimeString()}</p>
            <p>Temperature: {weatherData.temperature}°C</p>
            <p>
                Weather: {weatherData.details.text} {weatherData.details.icon}
            </p>
        </div>
    );
};

const CardWeatherTimeLine = ({ weatherData }: { weatherData: HourlyForecast }) => {
    if (!weatherData) return null;
    return (
        <div className="flex justify-between gap-4 border-b mb-5">
            <p>{weatherData.place}</p>
            <p>{weatherData.details.text} {weatherData.details.icon}</p>
            <p className="text-sm text-gray-500">{new Date(weatherData.time).toLocaleTimeString()}</p>
        </div>
    );
};

const ForecastList = ({
    title,
    forecasts,
    timeLine = false,
}: {
    title?: string;
    forecasts: DailyGroupedForecast[];
    timeLine?: boolean;
}) => (
    <div className={`p-4 mb-4`}>
        {title && <h2 className="text-lg font-bold mb-2">{title}</h2>}
        {forecasts.map(({ date, hours }, idxDate) => (
            <div key={idxDate} className={`p-4 bg-gray-100 rounded-lg shadow mb-4`}>
                {timeLine ? null : <h3 className="font-semibold">{date}</h3>}
                {hours.map((hour, idxHour) =>
                    timeLine ? <CardWeatherTimeLine key={idxHour} weatherData={hour} />
                        : <CardWeather key={idxHour} weatherData={hour} />
                )}
            </div>
        ))}
    </div>
);

const Badge = ({ text, color }: { text: string; color: keyof typeof colorMap }) => (
    <p className={`sm:w-full md:w-96 px-2 py-1 text-xs font-medium ${colorMap[color]} border bg-white rounded-full`}>
        {text}
    </p>
);

const LoadingSpinner = () => (
    <div className="flex justify-center items-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
);

export default function WeatherPanel({
    forecastsData,
    routeWeather,
    findingRouteWeather,
    nameOrigin,
    nameDestination,
}: {
    forecastsData: NewWeatherData | null;
    routeWeather?: DailyGroupedForecast[] | null;
    findingRouteWeather?: boolean;
    nameOrigin?: string;
    nameDestination?: string;
}) {
    const [expanded, setExpanded] = useState(false);
    const [expandedOriginCard, setExpandedOriginCard] = useState(false);
    const [expandedDestinationCard, setExpandedDestinationCard] = useState(false);

    const togglePanel = () => setExpanded((prev) => !prev);

    return (
        <div
            className={`fixed flex flex-col w-full ${expanded ? "h-lvh" : "h-12"} bottom-0 right-0 p-4 rounded-t-md bg-white shadow-md z-1000 transition-[height] duration-300 ease-in-out`}
        >
            {/* Toggle Button */}
            <button
                className="w-full h-7 cursor-pointer flex flex-wrap justify-center items-center"
                onClick={togglePanel}
                aria-label="Toggle weather section"
            >
                {expanded ? <ArrowDownIcon className="w-6 h-6 " /> : <ArrowUpIcon className="w-6 h-6" />}
                <span className="w-full border-b mt-3"></span>
            </button>

            <div className="w-full flex flex-wrap mt-8 gap-4 overflow-auto">

                {/* Route Forecast */}
                <div className="w-full">
                    <h1 className="text-lg font-bold mb-5">Weather along the route for today</h1>
                    {routeWeather && routeWeather?.length > 0 ? (
                        <div className="h-96 overflow-auto">
                            <ForecastList forecasts={routeWeather} timeLine={true} />
                        </div>
                    ) : (
                        findingRouteWeather ? <LoadingSpinner />
                            : <Badge text="Please search for your destination on the map." color="yellow" />

                    )}
                </div>

                {/* Origin & Destination Forecasts */}
                <h1 className="w-full text-lg font-bold">Check the 5-day weather forecast for</h1>
                <button
                    className="px-4 py-2 border border-gray-800 text-gray-800 rounded-lg 
                   text-[clamp(0.875rem, 2vw, 1.25rem)] flex cursor-pointer"
                    onClick={() => { setExpandedOriginCard((prev) => !prev) }}
                    aria-label="Toggle weather origin route section"
                >
                    <MapPinIcon className="w-6 h-6" />
                    <span className="ml-2">{nameOrigin || "Origin of the device"}</span>
                </button>
                {forecastsData?.origin?.length ? (
                    <>
                        <div className={`w-full mt-3 overflow-auto ${expandedOriginCard ? "h-96" : "hidden"}`}>
                            <ForecastList forecasts={forecastsData.origin} />
                        </div>
                    </>
                ) : null}

                {nameDestination ? (
                    <button
                        className="px-4 py-2 border border-gray-800 text-gray-800 rounded-lg 
                   text-[clamp(0.875rem, 2vw, 1.25rem)] flex cursor-pointer"
                        onClick={() => { setExpandedDestinationCard((prev) => !prev) }}
                        aria-label="Toggle weather destination route section"
                    >
                        <MapPinIcon className="w-6 h-6" />
                        <span className="ml-2">{nameDestination || "Destination not found"}</span>
                    </button>
                ) : null}
                {forecastsData?.destination?.length ? (
                    <>
                        <div className={`w-full mt-3 overflow-auto ${expandedDestinationCard ? "h-96" : "hidden"}`}>
                            <ForecastList forecasts={forecastsData.destination} />
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
}
