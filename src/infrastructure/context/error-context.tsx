import { createContext, useState, ReactNode } from "react";

type ErrorContextType = {
  error: string | null;
  setError: (msg: string | null) => void;
};

export const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<string | null>(null);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};
