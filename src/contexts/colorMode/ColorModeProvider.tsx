import { PropsWithChildren, useState } from 'react';
import ColorModeContext from './ColorModeContext';

const PDFPagesProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };
  return (
    <ColorModeContext.Provider
      value={{
        mode,
        toggleColorMode,
      }}
    >
      {children}
    </ColorModeContext.Provider>
  );
};

export default PDFPagesProvider;
