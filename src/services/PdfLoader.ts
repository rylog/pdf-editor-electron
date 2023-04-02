import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist/types/src/display/api';
import { pdfjs } from 'react-pdf';

const loadDocumentPages = async (arrayBuffer: Uint8Array): Promise<PDFPageProxy[]> =>
  new Promise<PDFPageProxy[]>((resolve, reject) => {
    try {
      pdfjs
        .getDocument({ data: arrayBuffer, cMapUrl: '../../pdfjs-dist/cmaps/' })
        .promise.then((pdfDocument: PDFDocumentProxy) => {
          // get pages from the document
          const getPageTasks: Array<Promise<PDFPageProxy>> = [];
          for (let i = 0; i < pdfDocument.numPages; i++) {
            getPageTasks.push(pdfDocument.getPage(i + 1));
          }
          Promise.all<PDFPageProxy>(getPageTasks).then((pages) => {
            resolve(pages);
          });
        });
    } catch (e) {
      reject(e);
    }
  });

const readAsArrayBuffer = async (file: File): Promise<Uint8Array> => {
  const arrayBuffer = await file.arrayBuffer();
  return new Uint8Array(arrayBuffer);
};

const readFilesAsArrayBuffer = async (files: FileList): Promise<Uint8Array[]> => {
  const readers: Promise<Uint8Array>[] = Array.from(files).map((file) => readAsArrayBuffer(file));
  return Promise.all(readers);
};

const PdfLoader = {
  loadDocumentPages,
  readFilesAsArrayBuffer,
  readAsArrayBuffer,
};

export default PdfLoader;
