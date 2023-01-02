import { PDFPageProxy } from "pdfjs-dist/types/src/display/api";

type PageInfo = {
  id: number;
  fileId: number;
  pageProxy: PDFPageProxy;
};

export default PageInfo;
