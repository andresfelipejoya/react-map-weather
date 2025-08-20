import { useState } from "react";
import { DailyGroupedForecast, HourlyForecast } from "@/domains/weather/application/services/group-forecast-by-date";
import { NewWeatherData } from "../application/use-cases/fetch-forecast-by-locations";

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
        <div className="flex items-center justify-center gap-4 relative">
            {Array.from({ length: 5 }).map((_, i) => (
                <div
                    key={i}
                    className="relative p-4 border rounded"
                >
                    <p className="border-b border-dotted">test name city</p>
                    <p>{weatherData.details.text} {weatherData.details.icon}</p>

                    {/* línea hacia la siguiente card */}
                    {i < 4 && (
                        <span className="absolute top-1/2 left-full w-4 h-0.5 bg-gray-800"></span>
                    )}
                </div>
            ))}
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
    <div className={`overflow-y-scroll ${timeLine ? 'bg-gray-100 rounded-lg flex flex-wrap justify-center min-h-60' : 'p-4 mb-4'}`}>
        {title && <h2 className="text-lg font-bold mb-2">{title}</h2>}
        {forecasts.map(({ date, hours }, idxDate) => (
            <div key={idxDate} className={`p-4 mb-4 ${timeLine ? '' : 'bg-gray-100 rounded-lg shadow'}`}>
                {timeLine ? null : <h3 className="font-semibold">{date}</h3>}
                {hours.map((hour, idxHour) => (
                    <>
                        {timeLine ? <CardWeatherTimeLine key={idxHour} weatherData={hour} />
                            : <CardWeather key={idxHour} weatherData={hour} />}
                    </>
                ))}
            </div>
        ))}
    </div>
);

const Badge = ({ text, color }: { text: string, color: string }) => (
    <p className={`inline-flex items-center px-2 py-1 text-xs font-medium text-${color}-800 border border-${color}-500 bg-white-500 rounded-full`}>
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
    const [expanded, setExpanded] = useState(true);

    const togglePanel = () => setExpanded((prev) => !prev);

    return (
        <div
            className={`fixed w-full ${expanded ? "h-screen" : "h-15"
                } bottom-0 right-0 p-4 rounded-t-md bg-white shadow-md flex flex-col gap-2 z-1000 transition-[height] duration-300 ease-in-out`}
        >
            {/* Toggle Button */}
            <div className="w-full border-b">
                <button
                    className="text-2xl text-center w-full cursor-pointer pb-5"
                    onClick={togglePanel}
                    aria-label="Toggle weather section"
                >
                    {expanded ? "👇🏽" : "👆🏽"}
                </button>
            </div>

            {/* Route Forecast */}
            <h1 className="text-lg font-bold mb-2">Weather along the route</h1>
            {routeWeather && routeWeather?.length > 0 ? (
                <ForecastList forecasts={routeWeather} timeLine={true} />
            ) : (
                <>
                    {findingRouteWeather ? <LoadingSpinner />
                        : <Badge text="Please search for your destination on the map." color="yellow" />
                    }
                </>
            )}
            {/* Origin & Destination Forecasts */}
            <h1 className="text-lg font-bold mb-2">Check the 5-day weather forecast for</h1>
            <h3 className="text-md font-semibold mb-2">🟢{nameOrigin}</h3>
            {forecastsData?.origin?.length ? (
                <>
                    <ForecastList forecasts={forecastsData.origin} />
                </>
            ) : null}

            <h3 className="text-md font-semibold mb-2">🔴{nameDestination}</h3>
            {forecastsData?.destination?.length ? (
                <>
                    <ForecastList forecasts={forecastsData.destination} />
                </>
            ) : null}
        </div>
    );
}
