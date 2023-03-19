import { useCallback, useEffect, useState } from "react";
import PdfLoader from "../services/PdfLoader";
import { PDFPageProxy } from "pdfjs-dist/types/src/display/api";

export const useFileLoader = (files: FileList) => {
	const [data, setData] = useState<PDFPageProxy[]>([]);
	const [error, setError] = useState<string>();
	const [loading, setLoading] = useState(false);

	const loadNewFiles = async (newFiles: FileList) => {
		const loadedFiles = await loadFiles(newFiles)
		setData([...data, ...loadedFiles])
	}

	const loadFiles = useCallback(async (files: FileList): Promise<PDFPageProxy[]> => {
		return new Promise<PDFPageProxy[]>(async (resolve) => {
			const tiles: PDFPageProxy[] = [];
			const readersResults = await PdfLoader.readFilesAsArrayBuffer(files);
			for (const arrayBuffer of readersResults) {
				const pages = await PdfLoader.loadDocumentPages(
					arrayBuffer
				);
				for (const page of pages)
					tiles.push(page);
			}
			resolve(tiles);
		});
	}, []);


	useEffect(() => {
		try {
			loadFiles(files).then((loadedFiles) => {
				setLoading(true);
				setData(loadedFiles);
				setLoading(false);
			});
		}
		catch (err) {
			setError((err as Error).message)
		}
	}, [files, loadFiles]);

	return { data, error, loading, loadNewFiles };
}
