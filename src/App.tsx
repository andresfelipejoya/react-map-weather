import { RouterProvider } from "react-router-dom";
import { router } from './routes/routes';
import { ErrorProvider } from "@/infrastructure/context/error-context";
import { ErrorToast } from "@/presentation/components/error-toast";

export default function App() {
    return (
        <ErrorProvider>
            <RouterProvider router={router} />
            <ErrorToast />
        </ErrorProvider>
    );
}