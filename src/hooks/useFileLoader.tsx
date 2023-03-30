import { PDFPageProxy } from 'pdfjs-dist/types/src/display/api';
import { useCallback, useEffect, useState } from 'react';

import PdfLoader from '../services/PdfLoader';

type UseFileLoaderReturnType = {
  data: PDFPageProxy[];
  error?: string;
  loading: boolean;
  loadNewFiles: (newFiles: FileList) => void;
};

const useFileLoader = (initialFiles: FileList): UseFileLoaderReturnType => {
  const [data, setData] = useState<PDFPageProxy[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const loadFiles = useCallback(async (files: FileList): Promise<PDFPageProxy[]> => {
    const readersResults = await PdfLoader.readFilesAsArrayBuffer(files);
    const promises = readersResults.map(async (arrayBuffer) => {
      const pages = await PdfLoader.loadDocumentPages(arrayBuffer);
      return pages;
    });
    const pageProxies = await Promise.all(promises);
    return pageProxies.flat();
  }, []);

  const loadNewFiles = useCallback((newFiles: FileList) => {
    setLoading(true);
    loadFiles(newFiles)
      .then((loadedFiles) => setData((prevData) => [...prevData, ...loadedFiles]))
      .catch((err) => setError((err as Error).message))
      .finally(() => setLoading(false));
  }, [loadFiles]);

  useEffect(() => {
    setLoading(true);
    loadFiles(initialFiles)
      .then((loadedFiles) => setData(loadedFiles))
      .catch((err) => setError((err as Error).message))
      .finally(() => setLoading(false));
  }, [initialFiles, loadFiles]);

  return {
    data,
    error,
    loading,
    loadNewFiles,
  };
};

export default useFileLoader;
