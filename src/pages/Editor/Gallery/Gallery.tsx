import classes from "./Gallery.module.css"
import { AutoScroller, MuuriComponent } from "react-muuri-official";
import { useRef } from "react";
import { PDFPageProxy } from "pdfjs-dist/types/src/display/api";
import PdfCanvas from "../../../components/PdfCanvas/PdfCanvas";
import Tile from "../../../components/Tile/Tile";

interface GalleryProps {
  pages: PDFPageProxy[];
}

const Gallery = (props: GalleryProps) => {
  const scrollElemRef = useRef(null);
  return (
    <div className={classes.Gallery} ref={scrollElemRef}>
      <MuuriComponent
        dragEnabled
        layoutDuration={300}
        layoutEasing={"ease-out"}
        dragContainer={document.getElementById("root")}
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
};

export default Gallery;
