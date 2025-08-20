export type Coordinates = {
    lat: number;
    lng: number;
};

export interface RouteResponse {
    type: string; // "FeatureCollection"
    bbox: number[];
    features: Feature[];
    metadata: Metadata;
}

export interface Feature {
    bbox: number[];
    type: string; // "Feature"
    properties: FeatureProperties;
    geometry: Geometry;
}

export interface FeatureProperties {
    segments: Segment[];
    way_points: number[];
    summary: Summary;
}

export interface Segment {
    distance: number;
    duration: number;
    steps: Step[];
}

export interface Step {
    distance: number;
    duration: number;
    type: number; // código de acción (ej. 0 = left, 1 = right, etc.)
    instruction: string;
    name: string;
    way_points: number[];
    exit_number?: number; // solo en rotondas
}

export interface Summary {
    distance: number;
    duration: number;
}

export interface Geometry {
    coordinates: [number, number][];
    type: string; // "LineString"
}

export interface Metadata {
    attribution: string;
    service: string;
    timestamp: number;
    query: Query;
    engine: Engine;
}

export interface Query {
    coordinates: [number, number][];
    profile: string; // "driving-car"
    profileName: string;
    format: string; // "geojson"
}

export interface Engine {
    version: string;
    build_date: string;
    graph_date: string;
    osm_date: string;
}

export interface NominatimResponse {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    lat: string;
    lon: string;
    class: string;
    type: string;
    place_rank: number;
    importance: number;
    addresstype: string;
    name: string;
    display_name: string;
    address: {
        road?: string;
        town?: string;
        municipality?: string;
        state_district?: string;
        state?: string;
        ["ISO3166-2-lvl4"]?: string;
        region?: string;
        country: string;
        country_code: string;
    };
    boundingbox: [string, string, string, string];
}
