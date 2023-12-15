import ipcEventSender from '@/services/ipcEventsSender';
import { PropsWithChildren, useEffect, useState } from 'react';
import ColorModeContext from './ColorModeContext';

const PDFPagesProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const toggleColorMode = () => {
    setMode((prevMode) => {
      const updatedMode = prevMode === 'light' ? 'dark' : 'light';
      ipcEventSender.changeTheme(updatedMode);
      return updatedMode;
    });
  };

  useEffect(() => {
    const getInitialColorMode = async () => {
      try {
        const initialMode = (await ipcEventSender.getTheme()) as
          | 'light'
          | 'dark';
        setMode(initialMode);
        ipcEventSender.show();
      } catch (error) {
        console.error('Error getting initial color mode:', error);
      }
    };

    getInitialColorMode();
  }, []);
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
