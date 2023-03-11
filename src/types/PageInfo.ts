import { PDFPageProxy } from "pdfjs-dist/types/src/display/api";

type PageInfo = {
  documentIndex: number;
  pageIndex: number;
  pageProxy: PDFPageProxy;
};

export default PageInfo;
