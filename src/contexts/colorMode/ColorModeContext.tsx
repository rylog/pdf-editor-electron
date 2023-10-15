import { createContext } from 'react';

const ColorModeContext = createContext<ColorModeContextValue | undefined>(
  undefined
);

export interface ColorModeContextValue {
  mode: string;
  toggleColorMode: () => void;
}

export default ColorModeContext;
