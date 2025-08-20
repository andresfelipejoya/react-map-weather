import { Map } from '@/domains/map/presentation/map.presentation';
import { CurrentWeather } from '@/domains/weather/presentation/current-weather.presentation';
import { LocationSearchInput } from '@/domains/location-search/presentation/location-search-input.presentation';

export default function Home() {
    return (
        <div className="h-screen">
            <LocationSearchInput />
            <Map />
            <CurrentWeather />
        </div>
    );
}