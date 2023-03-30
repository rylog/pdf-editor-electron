import { PDFPageProxy } from 'pdfjs-dist/types/src/display/api';
import { useEffect, useRef, useState } from 'react';

interface PdfCanvasProps {
  page: PDFPageProxy
}

function PdfCanvas(props: PdfCanvasProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { page } = props;
  const [pageToRender] = useState<PDFPageProxy>(page);

  const renderPageOnCanvas = (pageProxy: PDFPageProxy): void => {
    if (canvasRef.current == null) {
      return;
    }
    const canvas = canvasRef.current;
    const viewport = pageProxy.getViewport({ scale: 1 });
    let scale = 1;
    if (viewport.height >= viewport.width) {
      const desiredHeight = 232;
      const desireWidth = 180;
      scale = Math.min((desiredHeight / viewport.height), (desireWidth / viewport.width));
    } else {
      const desiredHeight = 180;
      scale = desiredHeight / viewport.width;
    }
    const scaledViewport = pageProxy.getViewport({ scale });
    canvas.height = scaledViewport.height;
    canvas.width = scaledViewport.width;
    const ctx = canvas.getContext('2d');
    if (ctx == null) {
      return;
    }

    const renderCtx = {
      canvasContext: ctx,
      viewport: scaledViewport,
    };

    pageProxy.render(renderCtx);
  };

  useEffect(() => {
    renderPageOnCanvas(pageToRender);
  }, [pageToRender]);

  return <canvas ref={canvasRef} />;
}

export default PdfCanvas;
