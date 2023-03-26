import classes from "./Gallery.module.css"
import { AutoScroller, MuuriComponent } from "@namecheap/react-muuri";
import { forwardRef, useRef } from "react";
import { PDFPageProxy } from "pdfjs-dist/types/src/display/api";
import PdfCanvas from "../../../components/PdfCanvas/PdfCanvas";
import Tile from "../../../components/Tile/Tile";
import { DecoratedGrid } from "@namecheap/react-muuri/dist/types/interfaces";

interface GalleryProps {
  pages: PDFPageProxy[];
}

const Gallery = forwardRef<DecoratedGrid, GalleryProps>((props, ref) => {
  const scrollElemRef = useRef<HTMLDivElement>(null);
  return (
    <div className={classes.Gallery} ref={scrollElemRef}>
      <MuuriComponent ref={ref}
        dragEnabled
        layoutDuration={300}
        layoutEasing={"ease-out"}
        dragContainer={document.getElementById("app")}
        dragAutoScroll={{
          sortDuringScroll: false,
          targets: [
            {
              element: scrollElemRef,
              axis: AutoScroller.AXIS_Y,
            },
          ],
        }}
      >
        {props.pages.map((page, i) => (
          <Tile key={`${i}_${page._pageIndex}`}>
            <PdfCanvas page={page} />
          </Tile>
        ))}
      </MuuriComponent>
    </div>
  );
});

export default Gallery;
