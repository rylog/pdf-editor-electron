import { useCallback, useEffect, useState } from "react";
import PageInfo from "../types/PageInfo";
import PdfLoader from "../services/PdfLoader";

export function useFileLoader(files: FileList) {
	const [data, setData] = useState<PageInfo[]>([]);
	const [error, setError] = useState<string>();
	const [loading, setLoading] = useState(false);

	const loadNewFiles = async (newFiles: FileList) => {
		const loadedFiles = await loadFiles(newFiles)
		setData([...data, ...loadedFiles])
	}


	const loadFiles = useCallback(async (files: FileList): Promise<PageInfo[]> => {
		return new Promise<PageInfo[]>(async (resolve) => {
			const tiles: PageInfo[] = [];
			const readersResults = await PdfLoader.readFilesAsArrayBuffer(files);
			const indexItem = localStorage.getItem("documentIndex");
			let documentIndex = indexItem ? JSON.parse(indexItem) : 0;
			for (const arrayBuffer of readersResults) {
				const pages = await PdfLoader.loadDocumentPages(
					arrayBuffer
				);
				for (const page of pages)
					tiles.push({ documentIndex, pageIndex: page._pageIndex, pageProxy: page });
				documentIndex++;
			}
			localStorage.setItem("documentIndex", JSON.stringify(documentIndex));
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
