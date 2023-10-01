import { PDFPageReference } from '@/shared/models';
import { createContext } from 'react';
import { LoadedPDFPage } from './PDFPagesProvider';

interface PDFPagesContextValue {
  pages: LoadedPDFPage[];
  isLoading: boolean;
  error: string | undefined;
  setPages: (pages: LoadedPDFPage[]) => void;
  loadPDFPages: (files: FileList) => Promise<void>;
  generatePDF: (pageReferences: PDFPageReference[]) => void;
}

const PDFPagesContext = createContext<PDFPagesContextValue | undefined>(
  undefined
);

export default PDFPagesContext;
