import { AutoScroller, MuuriComponent } from '@namecheap/react-muuri';
import { type DecoratedGrid } from '@namecheap/react-muuri/dist/types/interfaces';
import { type PDFPageProxy } from 'pdfjs-dist/types/src/display/api';
import { forwardRef, useRef } from 'react';

import PdfCanvas from '../../../components/PdfCanvas/PdfCanvas';
import Tile from '../../../components/Tile/Tile';
import classes from './Gallery.module.css';

interface GalleryProps {
  pages: PDFPageProxy[]
}

const Gallery = forwardRef<DecoratedGrid, GalleryProps>((props, ref) => {
  const scrollElemRef = useRef<HTMLDivElement>(null);
  return (
    <div className={classes.Gallery} ref={scrollElemRef}>
      <MuuriComponent
        ref={ref}
        dragEnabled
        layoutDuration={300}
        layoutEasing="ease-out"
        dragContainer={document.getElementById('app')}
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
          // eslint-disable-next-line react/no-array-index-key
          <Tile key={`${i}_${page._pageIndex as string}`}>
            <PdfCanvas page={page} />
          </Tile>
        ))}
      </MuuriComponent>
    </div>
  );
});

Gallery.displayName = 'Gallery';

export default Gallery;
