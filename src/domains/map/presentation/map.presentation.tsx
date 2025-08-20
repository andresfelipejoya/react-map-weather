import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { Coordinates } from "@/domains/map/map.types";
import { getCurrentLocation } from "@/domains/map/infrastructure/location.service";
import { selectDestination, selectNameDestination, selectNameOrigin, selectOrigin, selectRouteCoords } from '@/domains/location-search/application/store/location.selectors';
import { setOrigin as setOriginAction } from "@/domains/location-search/application/store/locationSlice";
import { AppDispatch } from "@/store";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export function Map() {
    const dispatch = useDispatch<AppDispatch>();

    const zoom = 13;
    const defaultPosition: Coordinates = { lat: 51.505, lng: -0.09 };
    const [error, setError] = useState<string | null>(null);
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const originName = useSelector(selectNameOrigin);
    const destinationName = useSelector(selectNameDestination);
    const routeCoords = useSelector(selectRouteCoords);

    useEffect(() => {
        getCurrentLocation()
            .then(coords => {
                dispatch(setOriginAction(coords));
            })
            .catch(err => setError(err.message));
    }, []);

    const MapUpdater = () => {
        const map = useMap();
        useEffect(() => {
            if (origin) {
                map.setView([origin.lat, origin.lng], 13);
            }
        }, [origin]);
        return null;
    };

    /**
     *  Display component.
     */
    const errorMessage = error ? <div className="text-red-500">{error}</div> : null;

    return (
        <>
            {errorMessage}
            <MapContainer
                center={defaultPosition}
                zoom={zoom}
                className="relative z-0 w-full h-lvh"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapUpdater />
                {origin && <Marker position={[origin.lat, origin.lng]}>
                        {originName && <Popup>{originName}</Popup>}
                    </Marker>}
                {destination && <Marker position={[destination.lat, destination.lng]}>
                        {destinationName && <Popup>{destinationName}</Popup>}
                    </Marker>}
                {routeCoords.length > 0 && (
                    <Polyline positions={routeCoords} color="blue" />
                )}
            </MapContainer>
        </>

    );
}