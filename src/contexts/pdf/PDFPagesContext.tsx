import { PDFPageReference } from '@/shared/models';
import { createContext } from 'react';
import { LoadedPDFPage } from './PDFPagesProvider';

interface PDFPagesContextValue {
  pages: LoadedPDFPage[];
  isLoading: boolean;
  error: string | undefined;
  setPages: (pages: LoadedPDFPage[]) => void;
  loadPDFPages: (files: File[]) => Promise<{
    success: LoadedPDFPage[];
    failures: { fileName: string; error: string }[];
  }>;
  generatePDF: (pageReferences: PDFPageReference[]) => void;
}

const PDFPagesContext = createContext<PDFPagesContextValue | undefined>(
  undefined
);

export default PDFPagesContext;
