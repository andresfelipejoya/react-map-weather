import { Coordinates } from "@/domains/location-search/location-search-input.types";
import { fetchRoute, RouteNotFoundError } from "@/domains/location-search/infrastructure/openrouteservice.client";

export async function calculateRoute(
    origin: Coordinates | null,
    destination: Coordinates | null,
    selectedType: "origin" | "destination",
    selectedCoords: Coordinates,
): Promise<Coordinates[]> {

    let response;

    if (selectedType === "origin" && destination) {
        response = await fetchRoute(selectedCoords, destination);
    }

    if (selectedType === "destination" && origin) {
        response = await fetchRoute(origin, selectedCoords);
    }

    return response?.features[0].geometry.coordinates.map(
        ([lng, lat]: [number, number]) => ({ lat, lng })
    ) || [];
}
