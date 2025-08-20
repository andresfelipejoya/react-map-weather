import axios from "axios";
import { NominatimResponse } from "../location-search-input.types";
const nominatimUrl = process.env.NOMINATIM_URL!;

export const fetchSuggestions = async (query: string): Promise<NominatimResponse[]> => {
    try {
        const res = await axios.get<NominatimResponse[]>(`${nominatimUrl}/search`, {
            params: {
                q: query,
                format: 'json',
                addressdetails: 1,
                limit: 10,
                countrycodes: ['co', 'ar', 'mx', 'br', 'us', 'es'].join(','),
            },
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching suggestions:", error);
        throw new Error("Failed to fetch suggestions from OpenStreetMap");
    }
};