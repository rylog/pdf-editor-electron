export interface PDFPageReference {
  fileId: number;
  pageIndex: number;
  rotation: number;
}

export interface PDFFileData {
  id: number;
  data: ArrayBuffer;
}
