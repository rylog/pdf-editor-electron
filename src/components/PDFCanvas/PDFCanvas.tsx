import { rotateDegrees } from 'pdf-lib';
import { PDFPageProxy } from 'pdfjs-dist/types/src/display/api';
import { CSSProperties, memo, useCallback, useEffect, useRef } from 'react';

const calculateScale = (height: number, width: number): number => {
  let scale = 1;
  if (height >= width) {
    const desiredHeight = 200;
    const desiredWidth = 180;
    scale = Math.min(desiredHeight / height, desiredWidth / width);
  } else {
    const desiredHeight = 180;
    scale = desiredHeight / width;
  }
  return scale;
};

const useRenderPageOnCanvas = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  pageToRender: PDFPageProxy,
  rotation: number
): void => {
  const renderPageOnCanvas = useCallback(async (): Promise<void> => {
    const pageProxy = pageToRender;
    const canvas = canvasRef.current;

    if (!pageProxy || !canvas) {
      return;
    }

    const viewport = pageProxy.getViewport({ scale: 1 });
    const { height, width } = viewport;

    const scale = calculateScale(height, width);
    const scaledViewport = pageProxy.getViewport({ scale, rotation });

    canvas.width = scaledViewport.width;
    canvas.height = scaledViewport.height;

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }
    // Draw the page at the center of the rotated canvas
    const renderCtx = {
      canvasContext: ctx,
      viewport: scaledViewport,
    };

    await pageProxy.render(renderCtx, rotateDegrees(rotation)).promise;
  }, [canvasRef, pageToRender, rotation]);

  useEffect(() => {
    renderPageOnCanvas();
  }, [renderPageOnCanvas]);
};

interface PDFCanvasProps {
  page: PDFPageProxy;
  style?: CSSProperties;
  rotation?: number;
}

const PDFCanvas = memo((props: PDFCanvasProps): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { page, style } = props;
  useRenderPageOnCanvas(canvasRef, page, props.rotation ?? 0);
  return <canvas ref={canvasRef} style={style} />;
});

PDFCanvas.displayName = 'PDFCanvas';
export default PDFCanvas;
