import { PDFPageProxy } from 'pdfjs-dist/types/src/display/api';
import { PropsWithChildren, createContext, useCallback, useContext, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

const cMapUrl = process.env.NODE_ENV === 'production' ? './pdfjs-dist/cmaps/' : '../pdfjs-dist/cmaps/';

pdfjsLib.GlobalWorkerOptions.workerSrc = './pdfjs-dist/pdf.worker.min.js';

interface PDFPagesProviderProps {
	children: React.ReactNode;
};

export interface LoadedPDFPage {
	page: PDFPageProxy;
	fileId: number;
}

interface PDFPagesContextValue {
	pages: LoadedPDFPage[];
	isPdfPagesLoading: boolean;
	pdfPagesError: string | undefined;
	loadPdfPages: (files: FileList) => Promise<void>;
};

const PDFPagesContext = createContext<PDFPagesContextValue>({
	pages: [],
	isPdfPagesLoading: false,
	pdfPagesError: undefined,
	loadPdfPages: () => Promise.resolve(),
});

const PDFPagesProvider: React.FC<PDFPagesProviderProps> = ({ children }: PropsWithChildren<unknown>) => {
	const [pages, setPages] = useState<LoadedPDFPage[]>([]);
	const [isPdfPagesLoading, setIsPdfPagesLoading] = useState(false);
	const [pdfPagesError] = useState<string | undefined>();
	const [currentFileIndex, setCurrentFileIndex] = useState(0);

	const loadPdfPages = useCallback(async (files: FileList) => {
		setIsPdfPagesLoading(true);
		const getPagePromises: Array<Promise<LoadedPDFPage>> = [];
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const arrayBuffer = await file.arrayBuffer();
			const pdfDocument = await pdfjsLib.getDocument({ data: arrayBuffer, cMapUrl }).promise;
			const fileId = currentFileIndex + 1;
			for (let j = 1; j <= pdfDocument.numPages; j++) {
				const page = await pdfDocument.getPage(j);
				getPagePromises.push(
					Promise.resolve({
						page,
						fileId
					})
				);
			}
			setCurrentFileIndex(fileId); // Update the current file index
		}
		const loadedPages = await Promise.all(getPagePromises);
		setPages((prevPages) => [...prevPages, ...loadedPages]);
		setIsPdfPagesLoading(false);
	}, [currentFileIndex]);

	return (
		<PDFPagesContext.Provider value={{ pages, isPdfPagesLoading, pdfPagesError, loadPdfPages }}>
			{children}
		</PDFPagesContext.Provider>
	);
};

const usePDFPages = () => {
	const { pages, isPdfPagesLoading, pdfPagesError, loadPdfPages } = useContext(PDFPagesContext);
	return { pages, isPdfPagesLoading, pdfPagesError, loadPdfPages };
};

export { PDFPagesProvider, usePDFPages };
