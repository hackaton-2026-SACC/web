import React, { createContext, useState, ReactNode } from 'react';
import type { AppContextState, SelectedLocation } from '../types';

export const AppContext = createContext<AppContextState>({
  selectedCity: null,
  setSelectedCity: () => {},
});

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState<SelectedLocation | null>(null);

  return (
    <AppContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </AppContext.Provider>
  );
};
