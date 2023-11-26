import PDFCanvas from '@/components/PDFCanvas/PDFCanvas';
import { Action } from '@/components/Tile/Actions';
import usePDFPages from '@/contexts/pdf/usePDFPages';
import DeleteIcon from '@mui/icons-material/Delete';
import RotateRightTwoTone from '@mui/icons-material/RotateRightTwoTone';
import { CircularProgress } from '@mui/material';
import { AutoScroller, MuuriComponent } from '@namecheap/react-muuri';
import {
  DecoratedItem,
  type DecoratedGrid,
} from '@namecheap/react-muuri/dist/types/interfaces';
import { useRef } from 'react';
import Tile, { TileProps } from '../../../components/Tile/Tile';
import classes from './Gallery.module.css';

interface GridItem extends DecoratedItem {
  getElement: () => HTMLElement;
}

interface GridProps {
  gridRef: React.MutableRefObject<DecoratedGrid | null>;
}
const Gallery = (props: GridProps) => {
  const { pages, isLoading, setPages } = usePDFPages();
  const scrollElemRef = useRef<HTMLDivElement>(null);
  const draggable = 'draggable';

  const removePage = (id: string) => {
    setPages(pages.filter((item) => item.id !== id));
  };

  const handleDeleteClick = (id: string) => {
    return () => {
      removePage(id);
    };
  };

  const rotatePage = (id: string) => {
    const pageToUpdate = pages.find((page) => page.id === id);

    if (pageToUpdate) {
      pageToUpdate.rotation += 90;
      pageToUpdate.rotation %= 360;
      setPages([...pages]); // Make sure to create a new array to trigger a state update
    }
  };

  const handleRotateClick = (id: string) => {
    return () => {
      rotatePage(id);
    };
  };

  const tiles = pages.map((loadedPage, index) => {
    const actions: Action[] = [
      {
        onClick: handleDeleteClick(loadedPage.id),
        icon: <DeleteIcon />,
      },
      {
        onClick: handleRotateClick(loadedPage.id),
        icon: <RotateRightTwoTone />,
      },
    ];

    return (
      <Tile
        key={loadedPage.id}
        index={index + 1}
        pageReference={{
          fileId: loadedPage.fileId,
          pageIndex: loadedPage.page._pageIndex,
          rotation: loadedPage.rotation,
        }}
        actions={actions}
      >
        <div style={{ display: 'flex' }} className={draggable}>
          <PDFCanvas
            rotation={loadedPage.rotation}
            page={loadedPage.page}
            style={{
              zIndex: 1,
              margin: 'auto',
            }}
          />
        </div>
      </Tile>
    );
  });

  return (
    <div className={classes.gallery} ref={scrollElemRef}>
      {isLoading && <CircularProgress className={classes.circularProgress} />}
      <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        <MuuriComponent
          dragHandle={`.${draggable}`}
          dragPlaceholder={{
            enabled: true,
            createElement: (item: GridItem) => {
              const placeholder = item
                .getElement()
                .cloneNode(true) as HTMLElement;

              placeholder.style.margin = '0';
              placeholder.style.padding = '0';
              placeholder.style.opacity = '0.5';
              placeholder.style.borderRadius = '4px';
              placeholder.style.borderColor = '#ff78a0';
              placeholder.style.borderStyle = 'dashed';
              return placeholder;
            },
          }}
          propsToData={(itemProps) => {
            const { pageReference } = itemProps as TileProps;
            return pageReference;
          }}
          ref={props.gridRef}
          dragEnabled
          showDuration={0}
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
          {tiles}
        </MuuriComponent>
      </div>
    </div>
  );
};

export default Gallery;
