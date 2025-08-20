import { RootState } from '@/store';

export const selectOrigin = (state: RootState) => state.location.origin;
export const selectDestination = (state: RootState) => state.location.destination;
export const selectRouteCoords = (state: RootState) => state.location.routeCoords;
export const selectNameOrigin = (state: RootState) => state.location.nameOrigin;
export const selectNameDestination = (state: RootState) => state.location.nameDestination;
