import {
  type PDFDocumentProxy,
  type PDFPageProxy,
} from 'pdfjs-dist/types/src/display/api';
import { pdfjs } from 'react-pdf';

const loadDocumentPages = async (
  arrayBuffer: Uint8Array,
): Promise<PDFPageProxy[]> =>
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

// eslint-disable-next-line max-len
const readAsArrayBuffer = async (file: File): Promise<Uint8Array> =>
  new Promise((resolve, reject) => {
    const filereader = new FileReader();
    filereader.onload = (): void => {
      resolve(new Uint8Array(filereader.result as ArrayBuffer));
    };
    filereader.onerror = (): void => {
      reject(filereader);
    };
    filereader.readAsArrayBuffer(file);
  });

const readFilesAsArrayBuffer = async (
  files: FileList,
): Promise<Uint8Array[]> => {
  const readers: Array<Promise<Uint8Array>> = [];
  // Read all inputs
  Array.from(files).forEach((file) => {
    readers.push(readAsArrayBuffer(file));
  });

  return Promise.all(readers);
};
const PdfLoader = {
  loadDocumentPages,
  readFilesAsArrayBuffer,
};

export default PdfLoader;
