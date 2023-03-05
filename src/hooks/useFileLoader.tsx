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

	var id = 0;
	var fileId = 0;

	const loadFiles = useCallback(async (files: FileList): Promise<PageInfo[]> => {
		return new Promise<PageInfo[]>(async (resolve) => {
			const tiles: PageInfo[] = [];
			const readersResults = await PdfLoader.readFilesAsArrayBuffer(files);
			for (let arrayBuffer in readersResults) {
				const pages = await PdfLoader.loadDocumentPages(
					readersResults[arrayBuffer]
				);
				pages.forEach((page) => {
					tiles.push({ id: id++, fileId: fileId, pageProxy: page });
				});
			}
			resolve(tiles);
		});
	}, [fileId, id]);



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
