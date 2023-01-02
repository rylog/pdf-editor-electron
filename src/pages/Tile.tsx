import { useEffect, useRef, useState } from "react";
import { PDFPageProxy } from "pdfjs-dist/types/src/display/api";

interface TileProps {
  originalIndex: number,
  page: PDFPageProxy
}

const Tile = (props: TileProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pageToRender] = useState<PDFPageProxy>(props.page);

  useEffect(() => {
    if (pageToRender)
      renderPageOnCanvas(pageToRender)
  }, [pageToRender])

  const renderPageOnCanvas = (page: PDFPageProxy) => {
    if (canvasRef.current == null) {
      return;
    }
    const canvas = canvasRef.current
    let viewport = page.getViewport({ scale: 1 });
    let scale = 1;
    if (viewport.height >= viewport.width) {
      let desiredWidth = 180;
      scale = desiredWidth / viewport.width;
    }
    else {
      let desiredHeight = 180;
      scale = desiredHeight / viewport.width;
    }
    let scaledViewport = page.getViewport({ scale: scale });
    canvas.height = scaledViewport.height;
    canvas.width = scaledViewport.width;
    let ctx = canvas.getContext('2d');
    if (ctx == null) {
      return;
    }

    const renderCtx = {
      canvasContext: ctx,
      viewport: scaledViewport,
    };

    page.render(renderCtx);
  }
  return (
    <div className="tile">
      <canvas ref={canvasRef}></canvas>
    </div>)
}

export default Tile;