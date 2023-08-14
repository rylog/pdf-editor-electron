export interface PDFPageReference {
  fileId: number;
  pageIndex: number;
}

export interface PDFFileData {
  id: number;
  data: ArrayBuffer;
}
