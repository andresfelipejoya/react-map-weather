import { configureStore } from '@reduxjs/toolkit';
import locationReducer from '@/domains/location-search/application/store/index';

export const store = configureStore({
    reducer: {
        location: locationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
