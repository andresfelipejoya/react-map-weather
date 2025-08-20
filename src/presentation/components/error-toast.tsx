import { useEffect } from "react";
import { useError } from "@/infrastructure/context/use-error";

const TOAST_DURATION = 3000;

export const ErrorToast = () => {
  const { error, setError } = useError();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, TOAST_DURATION);

      return () => clearTimeout(timer);
    }
  }, [error, setError]);

  if (!error) return null;

  return (
    <div className="m-5 fixed bottom-40 right-0 bg-red-500 text-white p-3 rounded shadow-lg">
      {error}
    </div>
  );
};
