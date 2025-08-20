import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Coordinates {
    lat: number;
    lng: number;
}

interface LocationState {
    origin: Coordinates | null;
    destination: Coordinates | null;
    routeCoords: Coordinates[];
    nameOrigin: string;
    nameDestination: string;
}

const initialState: LocationState = {
    origin: null,
    destination: null,
    routeCoords: [],
    nameOrigin: '',
    nameDestination: '',
};

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setOrigin(state, action: PayloadAction<Coordinates | null>) {
            state.origin = action.payload;
        },
        setDestination(state, action: PayloadAction<Coordinates | null>) {
            state.destination = action.payload;
        },
        setRouteCoords(state, action: PayloadAction<Coordinates[]>) {
            state.routeCoords = action.payload;
        },
        setNameOrigin(state, action: PayloadAction<string>) {
            state.nameOrigin = action.payload;
        },
        setNameDestination(state, action: PayloadAction<string>) {
            state.nameDestination = action.payload;
        },
    },
});

export const {
    setOrigin,
    setDestination,
    setRouteCoords,
    setNameOrigin,
    setNameDestination,
} = locationSlice.actions;

export default locationSlice.reducer;
