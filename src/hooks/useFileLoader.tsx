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
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const loadFiles = useCallback(async (files: FileList): Promise<PDFPageProxy[]> => {
    const readersResults = await PdfLoader.readFilesAsArrayBuffer(files);
    const promises = readersResults.map(async (arrayBuffer) => {
      const pages = await PdfLoader.loadDocumentPages(arrayBuffer);
      return pages;
    });
    const pages = await Promise.all(promises);
    const tiles = pages.flat();
    return tiles;
  }, []);

  const loadNewFiles = useCallback(async (newFiles: FileList) => {
    const loadedFiles = await loadFiles(newFiles);
    setData((prevData) => [...prevData, ...loadedFiles]);
  }, [loadFiles]);

  useEffect(() => {
    setLoading(true);
    loadFiles(initialFiles)
      .then((loadedFiles) => setData(loadedFiles))
      .catch((e) => setError((e as Error).message))
      .finally(() => setLoading(false));
  }, [initialFiles, loadFiles]);

  return {
    data, error, loading, loadNewFiles,
  };
};

export default useFileLoader;
