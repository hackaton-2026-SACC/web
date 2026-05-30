import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import type { AppContextState } from '../types';

export const useAppContext = (): AppContextState => {
  return useContext(AppContext);
};
