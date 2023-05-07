import { PDFPageProxy } from 'pdfjs-dist/types/src/display/api';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import * as pdfjsLib from 'pdfjs-dist';

const cMapUrl =
  process.env.NODE_ENV === 'production'
    ? './pdfjs-dist/cmaps/'
    : '../pdfjs-dist/cmaps/';

pdfjsLib.GlobalWorkerOptions.workerSrc = './pdfjs-dist/pdf.worker.min.js';

interface PDFPagesProviderProps {
  children: React.ReactNode;
}

export interface LoadedPDFPage {
  page: PDFPageProxy;
  fileId: number;
}

interface PDFPagesContextValue {
  pages: LoadedPDFPage[];
  isLoading: boolean;
  error: string | undefined;
  loadPDFPages: (files: FileList) => Promise<void>;
  savePDF: () => void;
}

const PDFPagesContext = createContext<PDFPagesContextValue>({
  pages: [],
  isLoading: false,
  error: undefined,
  loadPDFPages: () => Promise.resolve(),
  savePDF: () => {},
});

const PDFPagesProvider: React.FC<PDFPagesProviderProps> = ({
  children,
}: PropsWithChildren<unknown>) => {
  const [pages, setPages] = useState<LoadedPDFPage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error] = useState<string | undefined>();
  const [currentFileIndex, setCurrentFileIndex] = useState(0);

  const loadPDFPages = useCallback(
    async (files: FileList) => {
      setIsLoading(true);
      const getPagePromises: Array<Promise<LoadedPDFPage>> = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const arrayBuffer = await file.arrayBuffer();
        const pdfDocument = await pdfjsLib.getDocument({
          data: arrayBuffer,
          cMapUrl,
        }).promise;
        const fileId = currentFileIndex + 1;
        for (let j = 1; j <= pdfDocument.numPages; j++) {
          const page = await pdfDocument.getPage(j);
          getPagePromises.push(
            Promise.resolve({
              page,
              fileId,
            })
          );
        }
        setCurrentFileIndex(fileId); // Update the current file index
      }
      const loadedPages = await Promise.all(getPagePromises);
      setPages((prevPages) => [...prevPages, ...loadedPages]);
      setIsLoading(false);
    },
    [currentFileIndex]
  );

  const savePDF = () => {
    window.electronAPI.savePDF();
  };

  return (
    <PDFPagesContext.Provider
      value={{ pages, isLoading, error, loadPDFPages, savePDF }}
    >
      {children}
    </PDFPagesContext.Provider>
  );
};

const usePDFPages = () => {
  const { pages, isLoading, error, loadPDFPages, savePDF } =
    useContext(PDFPagesContext);
  return { pages, isLoading, error, loadPDFPages, savePDF };
};

export { PDFPagesProvider, usePDFPages };
