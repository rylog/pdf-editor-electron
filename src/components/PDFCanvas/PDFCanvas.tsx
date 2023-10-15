import { rotateDegrees } from 'pdf-lib';
import { RenderingCancelledException } from 'pdfjs-dist';
import { PDFPageProxy, RenderTask } from 'pdfjs-dist/types/src/display/api';
import { CSSProperties, memo, useEffect, useRef } from 'react';

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
  useEffect(() => {
    let renderTask: RenderTask | null = null;

    const renderPageOnCanvas = async (): Promise<void> => {
      // Cancel previous rendering task if it exists
      if (renderTask) {
        renderTask.cancel();
      }

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

      // Start a new rendering task
      renderTask = pageProxy.render(renderCtx, rotateDegrees(rotation));
      try {
        await renderTask.promise;
      } catch (error) {
        if (!(error instanceof RenderingCancelledException)) {
          throw error; // Rethrow other errors
        }
      }
    };

    // Call the rendering function
    renderPageOnCanvas();

    // Cleanup: Cancel the rendering task when the component is unmounted or when the dependencies change
    return () => {
      if (renderTask) {
        renderTask.cancel();
      }
    };
  }, [canvasRef, pageToRender, rotation]);
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
