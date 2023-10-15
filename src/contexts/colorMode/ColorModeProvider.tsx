import { FC, PropsWithChildren, useState } from 'react';
import ColorModeContext from './ColorModeContext';

interface ColorModeProviderProps {
  children: React.ReactNode;
}

const PDFPagesProvider: FC<ColorModeProviderProps> = ({
  children,
}: PropsWithChildren<unknown>) => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
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
