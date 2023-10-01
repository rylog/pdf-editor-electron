import { AutoScroller, MuuriComponent } from '@namecheap/react-muuri';
import { type DecoratedGrid } from '@namecheap/react-muuri/dist/types/interfaces';
import { forwardRef, useRef } from 'react';

import PDFCanvas from '@/components/PDFCanvas/PDFCanvas';
import usePDFPages from '@/contexts/pdf/usePDFPages';
import { Button, CircularProgress } from '@mui/material';
import Tile, { TileProps } from '../../../components/Tile/Tile';
import classes from './Gallery.module.css';

const Gallery = forwardRef<DecoratedGrid>((_, ref) => {
  const { pages, isLoading, setPages } = usePDFPages();
  const scrollElemRef = useRef<HTMLDivElement>(null);
  const draggable = 'draggable';

  const removeTile = (id: string) => {
    setPages(pages.filter((item) => item.id !== id));
  };

  const handleRemoveTileClick = (id: string) => {
    return function () {
      removeTile(id);
    };
  };

  const children = pages.map((loadedPage, index) => (
    <Tile
      key={loadedPage.id}
      index={index + 1}
      pageReference={{
        fileId: loadedPage.fileId,
        pageIndex: loadedPage.page._pageIndex,
        rotation: 0,
      }}
    >
      <Button
        className={classes.TileAction}
        onClick={handleRemoveTileClick(loadedPage.id)}
      >
        X
      </Button>
      <div className={draggable}>
        <PDFCanvas page={loadedPage.page} style={{ zIndex: 1 }} />
      </div>
    </Tile>
  ));

  return (
    <div className={classes.Gallery} ref={scrollElemRef}>
      {isLoading && <CircularProgress className={classes.CircularProgress} />}
      <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        <MuuriComponent
          dragHandle={`.${draggable}`}
          propsToData={(itemProps) => {
            const { pageReference } = itemProps as TileProps;
            return pageReference;
          }}
          ref={ref}
          dragEnabled
          instantLayout
          dragContainer={document.body}
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
    </div>
  );
});

Gallery.displayName = 'Gallery';

export default Gallery;
