import axios from "axios";
import { Coordinates, RouteResponse } from "../location-search-input.types";
const orsApiURL = process.env.ORS_API_URL!;
const orsApiKey = process.env.ORS_API_KEY!;

export class RouteNotFoundError extends Error {
    constructor(message: string = "Route could not be found") {
        super(message);
        this.name = "RouteNotFoundError";
    }
}

export const fetchRoute = async (start: Coordinates, end: Coordinates): Promise<RouteResponse> => {
    try {
        const response = await axios.post<RouteResponse>(
            `${orsApiURL}/directions/driving-car/geojson`,
            {
                coordinates: [
                    [start.lng, start.lat],
                    [end.lng, end.lat],
                ],
            },
            {
                headers: {
                    Authorization: orsApiKey,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data?.error?.code === 2004) {
            throw new RouteNotFoundError(error.response.data.error.message);
        }
        throw error;
    }
};