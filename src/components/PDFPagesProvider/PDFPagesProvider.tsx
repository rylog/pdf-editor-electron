import ipcEventsSender from '@/services/ipcEventsSender';
import { PDFFileData, PDFPageReference } from '@/shared/models';
import * as pdfjsLib from 'pdfjs-dist';
import { PDFPageProxy } from 'pdfjs-dist/types/src/display/api';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

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
  generatePDF: (pageReferences: PDFPageReference[]) => void;
}

const PDFPagesContext = createContext<PDFPagesContextValue>({
  pages: [],
  isLoading: false,
  error: undefined,
  loadPDFPages: () => Promise.resolve(),
  generatePDF: () => {},
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
      const getPagePromises = new Array<Promise<LoadedPDFPage>>();
      const filesData = new Array<PDFFileData>();
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileId = currentFileIndex + i;
        const arrayBuffer = await file.arrayBuffer();
        filesData.push({
          id: fileId,
          data: structuredClone(arrayBuffer),
        });
        const pdfDocument = await pdfjsLib.getDocument({
          data: arrayBuffer,
          cMapUrl,
        }).promise;

        for (let j = 1; j <= pdfDocument.numPages; j++) {
          const page = await pdfDocument.getPage(j);
          getPagePromises.push(
            Promise.resolve({
              page,
              fileId,
            })
          );
        }
        setCurrentFileIndex(currentFileIndex + i); // Update the current file index
      }
      console.log(filesData);
      ipcEventsSender.registerPDFFiles(filesData);
      const loadedPages = await Promise.all(getPagePromises);
      setPages((prevPages) => [...prevPages, ...loadedPages]);
      setIsLoading(false);
    },
    [currentFileIndex]
  );

  return (
    <PDFPagesContext.Provider
      value={{
        pages,
        isLoading,
        error,
        loadPDFPages,
        generatePDF: ipcEventsSender.generatePDF,
      }}
    >
      {children}
    </PDFPagesContext.Provider>
  );
};

const usePDFPages = () => {
  const { pages, isLoading, error, loadPDFPages, generatePDF } =
    useContext(PDFPagesContext);
  return { pages, isLoading, error, loadPDFPages, generatePDF };
};

export { PDFPagesProvider, usePDFPages };
