import { useContext } from 'react';
import PDFPagesContext from './PDFPagesContext';

const usePDFPages = () => {
  const context = useContext(PDFPagesContext);
  if (!context) {
    throw new Error('usePDFPages must be used within a PDFPagesProvider');
  }
  return context;
};

export default usePDFPages;
