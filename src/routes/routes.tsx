import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/home/home.page';
import ErrorPage from '@/pages/home/error-page';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />,
    }
], { basename: '/react-map-weather' });