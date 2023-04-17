import { AutoScroller, MuuriComponent } from '@namecheap/react-muuri';
import { type DecoratedGrid } from '@namecheap/react-muuri/dist/types/interfaces';
import { forwardRef, useRef } from 'react';

import PDFCanvas from '../../../components/PDFCanvas/PDFCanvas';
import Tile from '../../../components/Tile/Tile';
import classes from './Gallery.module.css';
import { LoadedPDFPage } from '@/components/PDFPagesProvider/PDFPagesProvider';

interface GalleryProps {
  loadedPages: LoadedPDFPage[]
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
        dragContainer={document.getElementById('root')}
        dragAutoScroll={{
          sortDuringScroll: false,
          targets: [
            {
              element: scrollElemRef,
              axis: AutoScroller.AXIS_Y,
            },
          ],
        }
        }

      >
        {props.loadedPages.map((loadedPage) => (
          <Tile key={`${loadedPage.fileId}_${loadedPage.page._pageIndex as string}`}>
            <PDFCanvas page={loadedPage.page} />
          </Tile>
        ))}
      </MuuriComponent>
    </div>
  );
});

Gallery.displayName = 'Gallery';

export default Gallery;
