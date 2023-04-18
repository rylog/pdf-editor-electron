import { PDFPageProxy } from 'pdfjs-dist/types/src/display/api';
import { memo, useCallback, useEffect, useRef } from 'react';

const calculateScale = (height: number, width: number): number => {
	let scale = 1;
	if (height >= width) {
		const desiredHeight = 232;
		const desireWidth = 180;
		scale = Math.min(desiredHeight / height, desireWidth / width);
	} else {
		const desiredHeight = 180;
		scale = desiredHeight / width;
	}
	return scale;
};

const useRenderPageOnCanvas = (canvasRef: React.RefObject<HTMLCanvasElement>, pageToRender: PDFPageProxy): void => {
	const renderPageOnCanvas = useCallback(async (): Promise<void> => {
		const pageProxy = pageToRender;
		const canvas = canvasRef.current;

		if (!pageProxy || !canvas) {
			return;
		}

		const viewport = pageProxy.getViewport({ scale: 1 });
		const { height, width } = viewport;

		const scale = calculateScale(height, width);
		const scaledViewport = pageProxy.getViewport({ scale });

		canvas.height = scaledViewport.height;
		canvas.width = scaledViewport.width;

		const ctx = canvas.getContext('2d');

		if (!ctx) {
			return;
		}

		const renderCtx = {
			canvasContext: ctx,
			viewport: scaledViewport,
		};

		await pageProxy.render(renderCtx).promise;
	}, [canvasRef, pageToRender]);

	useEffect(() => {
		renderPageOnCanvas();
	}, [renderPageOnCanvas]);
};

interface PDFCanvasProps {
	page: PDFPageProxy
}

const PDFCanvas = memo((props: PDFCanvasProps): JSX.Element => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const { page } = props;
	useRenderPageOnCanvas(canvasRef, page);
	return <canvas ref={canvasRef} />;
});

PDFCanvas.displayName = 'PDFCanvas';
export default PDFCanvas;
