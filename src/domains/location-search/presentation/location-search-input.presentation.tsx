import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { ArrowLeftIcon, ArrowDownIcon, MapPinIcon } from '@heroicons/react/24/outline';
import type { RootState, AppDispatch } from '@/store';
import { fetchSuggestions } from "@/domains/location-search/infrastructure/openstreetmap.client";
import { calculateRoute } from "@/domains/location-search/application/services/calculateRoute.service";
import AutocompleteInput from "@/shared/components/auto-complete-input";
import {
    setOrigin as setOriginAction,
    setDestination as setDestinationAction,
    setRouteCoords as setRouteCoordsAction,
    setNameOrigin as setNameOriginAction,
    setNameDestination as setNameDestinationAction,
} from '@/domains/location-search/application/store/locationSlice';
import { useError } from "@/infrastructure/context/use-error";
import { RouteNotFoundError } from "@/domains/location-search/infrastructure/openrouteservice.client";

export function LocationSearchInput() {
    const dispatch = useDispatch<AppDispatch>();
    const { setError } = useError();

    const [isOpen, setIsOpen] = useState(true);
    const [originQuery, setOriginQuery] = useState('');
    const [skipOriginFetch, setSkipOriginFetch] = useState(false);
    const [destinationQuery, setDestinationQuery] = useState('');
    const [skipDestinationFetch, setSkipDestinationFetch] = useState(false);
    const [originSuggestions, setOriginSuggestions] = useState<any[]>([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState<any[]>([]);

    const origin = useSelector((state: RootState) => state.location.origin);
    const destination = useSelector((state: RootState) => state.location.destination);

    useEffect(() => {
        if (skipOriginFetch) {
            setSkipOriginFetch(false);
            return;
        }
        const timeout = setTimeout(async () => {
            if (originQuery.length > 2) {
                const results = await fetchSuggestions(originQuery);
                setOriginSuggestions(results);
            } else {
                setOriginSuggestions([]);
            }
        }, 300);
        return () => clearTimeout(timeout);
    }, [originQuery]);

    useEffect(() => {
        if (skipDestinationFetch) {
            setSkipDestinationFetch(false);
            return;
        }
        const timeout = setTimeout(async () => {
            if (destinationQuery.length > 2) {
                const results = await fetchSuggestions(destinationQuery);
                setDestinationSuggestions(results);
            } else {
                setDestinationSuggestions([]);
            }
        }, 300);
        return () => clearTimeout(timeout);
    }, [destinationQuery]);

    const handleSelectSuggestion = async (type: 'origin' | 'destination', place: any) => {
        const coords = {
            lat: parseFloat(place.lat),
            lng: parseFloat(place.lon),
        };

        if (type === 'origin') {
            setOriginQuery(place.display_name);
            dispatch(setOriginAction(coords));
            dispatch(setNameOriginAction(place.display_name));
            setOriginSuggestions([]);
            setSkipOriginFetch(true);
        } else {
            setDestinationQuery(place.display_name);
            dispatch(setDestinationAction(coords));
            dispatch(setNameDestinationAction(place.display_name));
            setDestinationSuggestions([]);
            setSkipDestinationFetch(true);
        }

        try {
            const fetchRouteResponse = await calculateRoute(
                type === 'origin' ? coords : origin,
                type === 'destination' ? coords : destination,
                type,
                coords,
            );
            dispatch(setRouteCoordsAction(fetchRouteResponse));
        } catch (error) {
            if (error instanceof RouteNotFoundError) {
                setError("Could not calculate a route between the selected points.");
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };

    /**
     * Display component.
     */
    const isOpenIcon = (
        <span className="w-5 h-5 mb-1">
            {isOpen ? <ArrowDownIcon /> : <ArrowLeftIcon />}
        </span>
    );

    const size = isOpen ? 'md:w-md' : 'md:w-30';

    return (
        <div
            className={`${size} fixed right-0 p-4 text-shadow-gray-800 z-1000`}
            style={{ transition: 'width 0.3s linear' }}
        >
            <div className="flex flex-col gap-2 bg-white p-4 rounded-md shadow-lg">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex justify-center items-center cursor-pointer border-b-1 border-gray-800"
                    aria-label="Toggle route section"
                >
                    {isOpenIcon}
                </button>
                {isOpen && (
                    <>
                        <AutocompleteInput
                            placeholder="Origin"
                            query={originQuery}
                            Icon={MapPinIcon}
                            // iconColor='text-green-500'
                            suggestions={originSuggestions}
                            onQueryChange={setOriginQuery}
                            onSelectSuggestion={(place) => handleSelectSuggestion("origin", place)}
                        />

                        <AutocompleteInput
                            placeholder="Destination"
                            query={destinationQuery}
                            Icon={MapPinIcon}
                            // iconColor='text-red-500'
                            suggestions={destinationSuggestions}
                            disabled={!!origin && originQuery.length === 0}
                            onQueryChange={setDestinationQuery}
                            onSelectSuggestion={(place) => handleSelectSuggestion("destination", place)}
                        />
                    </>
                )}
            </div>
        </div>
    );
}