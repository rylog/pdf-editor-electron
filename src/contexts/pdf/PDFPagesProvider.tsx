import ipcEventsSender from '@/services/ipcEventsSender';
import { PDFFileData } from '@/shared/models';
import * as pdfjsLib from 'pdfjs-dist';
import { InvalidPDFException } from 'pdfjs-dist';
import { PDFPageProxy } from 'pdfjs-dist/types/src/display/api';
import { FC, PropsWithChildren, useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import PDFPagesContext from './PDFPagesContext';

const cMapUrl =
  process.env.NODE_ENV === 'production'
    ? './pdfjs-dist/cmaps/'
    : '../pdfjs-dist/cmaps/';

pdfjsLib.GlobalWorkerOptions.workerSrc = './pdfjs-dist/pdf.worker.min.js';

interface PDFPagesProviderProps {
  children: React.ReactNode;
}

export interface LoadedPDFPage {
  id: string;
  page: PDFPageProxy;
  fileId: number;
  rotation: number;
}

const PDFPagesProvider: FC<PDFPagesProviderProps> = ({
  children,
}: PropsWithChildren<unknown>) => {
  const [pages, setPages] = useState<LoadedPDFPage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState<string | undefined>();
  const currentFileIndex = useRef(0);

  const loadPDFPages = useCallback(
    async (
      files: File[]
    ): Promise<{
      success: LoadedPDFPage[];
      failures: { fileName: string; error: string }[];
    }> => {
      setIsLoading(true);

      const getPagePromises = new Array<Promise<LoadedPDFPage>>();
      const filesData = new Array<PDFFileData>();
      const failures: { fileName: string; error: string }[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileId = currentFileIndex.current;

        try {
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
                id: `${fileId}_${page._pageIndex}`,
                page,
                fileId,
                rotation: 0,
              })
            );
          }

          currentFileIndex.current++;
        } catch (e: unknown) {
          // Handle file processing errors
          const errorMessage =
            e instanceof InvalidPDFException ? e.message : 'Unknown error';
          toast.error(
            <div>
              Error processing file <strong>{file.name}</strong>: {errorMessage}
            </div>
          );
          filesData.pop();
          failures.push({ fileName: file.name, error: errorMessage });
        }
      }

      const loadedPages = await Promise.all(getPagePromises);
      setPages((prevPages) => [...prevPages, ...loadedPages]);

      if (filesData.length > 0) {
        await ipcEventsSender.registerPDFFiles(filesData);
      }
      setIsLoading(false);

      return {
        success: loadedPages,
        failures,
      };
    },
    [currentFileIndex]
  );

  return (
    <PDFPagesContext.Provider
      value={{
        pages,
        isLoading,
        error,
        setPages,
        loadPDFPages,
        generatePDF: ipcEventsSender.generatePDF,
      }}
    >
      {children}
    </PDFPagesContext.Provider>
  );
};

export default PDFPagesProvider;
