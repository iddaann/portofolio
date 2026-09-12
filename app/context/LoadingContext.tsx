"use client";

import { createContext, useContext, useState } from "react";

type LoadingContextType = {
  loaded: boolean;
  setLoaded: (v: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType>({
  loaded: false,
  setLoaded: () => {},
});

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <LoadingContext.Provider value={{ loaded, setLoaded }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}