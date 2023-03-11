import classes from "./Gallery.module.css"
import Tile from "./Tile";
import { AutoScroller, MuuriComponent } from "react-muuri-official";
import { useRef } from "react";
import PageInfo from "../../../types/PageInfo";

interface GalleryProps {
  pages: PageInfo[];
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
        {props.pages.map((page) => (
          <Tile key={`${page.documentIndex}_${page.pageIndex}`} originalIndex={page.pageIndex} page={page.pageProxy} />
        ))}
      </MuuriComponent>
    </div>
  );
};

export default Gallery;
