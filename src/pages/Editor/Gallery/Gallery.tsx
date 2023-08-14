import { AutoScroller, MuuriComponent } from '@namecheap/react-muuri';
import { type DecoratedGrid } from '@namecheap/react-muuri/dist/types/interfaces';
import { forwardRef, useRef } from 'react';

import PDFCanvas from '@/components/PDFCanvas/PDFCanvas';
import { LoadedPDFPage } from '@/components/PDFPagesProvider/PDFPagesProvider';
import Tile, { TileProps } from '../../../components/Tile/Tile';
import classes from './Gallery.module.css';

interface GalleryProps {
  loadedPages: LoadedPDFPage[];
}

const Gallery = forwardRef<DecoratedGrid, GalleryProps>((props, ref) => {
  const scrollElemRef = useRef<HTMLDivElement>(null);

  const children = props.loadedPages.map((loadedPage, index) => (
    <Tile
      key={`${loadedPage.fileId}_${loadedPage.page._pageIndex as string}`}
      index={index + 1}
      pageReference={{
        fileId: loadedPage.fileId,
        pageIndex: loadedPage.page._pageIndex,
      }}
    >
      <PDFCanvas page={loadedPage.page} />
    </Tile>
  ));

  return (
    <div className={classes.Gallery} ref={scrollElemRef}>
      <MuuriComponent
        propsToData={(itemProps) => {
          const { pageReference } = itemProps as TileProps;
          return pageReference;
        }}
        ref={ref}
        dragEnabled
        instantLayout
        dragContainer={document.getElementById('root')}
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
        {children}
      </MuuriComponent>
    </div>
  );
});

Gallery.displayName = 'Gallery';

export default Gallery;
