import { useContext } from 'react';
import ColorModeContext from './ColorModeContext';

const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error(
      'useColorMode must be used within a ColorModeContextProvider'
    );
  }
  return context;
};

export default useColorMode;
