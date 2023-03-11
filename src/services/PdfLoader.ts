import { pdfjs } from "react-pdf";
import {
  PDFDocumentProxy,
  PDFPageProxy,
} from "pdfjs-dist/types/src/display/api";

const loadDocumentPages = (arrayBuffer: Uint8Array) => {
  return new Promise<PDFPageProxy[]>((resolve, reject) => {
    try {
      pdfjs
        .getDocument({ data: arrayBuffer, cMapUrl: "../../pdfjs-dist/cmaps/" })
        .promise.then((pdfDocument: PDFDocumentProxy) => {
          //get pages from the document
          const getPageTasks: Promise<PDFPageProxy>[] = [];
          for (let i = 0; i < pdfDocument.numPages; i++) {
            getPageTasks.push(pdfDocument.getPage(i + 1));
          }
          Promise.all<PDFPageProxy>(getPageTasks).then((pages) =>
            resolve(pages)
          );
        });
    } catch (e) {
      reject(e);
    }
  });
};

const readAsArrayBuffer = (file: File) => {
  return new Promise<Uint8Array>((resolve, reject) => {
    const filereader = new FileReader();
    filereader.onload = () => {
      resolve(new Uint8Array(filereader.result as ArrayBuffer));
    };
    filereader.onerror = () => reject(filereader);
    filereader.readAsArrayBuffer(file);
  });
};

const readFilesAsArrayBuffer = (files: FileList) => {
  const readers: Promise<Uint8Array>[] = [];
  //Read all inputs
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
