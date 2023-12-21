import * as pdfjsLib from 'pdfjs-dist';

let isInitialized = false;
let pdfjsInstance: typeof pdfjsLib | null = null;

export async function initializePDFjs(): Promise<typeof pdfjsLib> {
  if (!isInitialized) {
    // Lazy load the library
    pdfjsInstance = await import('pdfjs-dist');

    // Set worker source
    pdfjsInstance.GlobalWorkerOptions.workerSrc =
      './pdfjs-dist/pdf.worker.min.js';

    isInitialized = true;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return pdfjsInstance!;
}
