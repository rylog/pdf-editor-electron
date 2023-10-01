import { useTheme } from '@mui/material/styles';
import { ReactNode } from 'react';

import { PDFPageReference } from '@/shared/models';
import { useDrag } from '@namecheap/react-muuri';
import classes from './Tile.module.css';

export interface TileProps {
  index: number;
  pageReference: PDFPageReference;
  children: ReactNode;
  remove?: () => void;
}

function Tile(props: TileProps): JSX.Element {
  const { children } = props;
  const theme = useTheme();
  const isDragging = useDrag();

  const className = `${classes.container} ${isDragging ? classes.drag : ''}`;

  return (
    <div className={className}>
      <div className={classes.contentContainer}>
        <div className={classes.content}>{children}</div>
      </div>
      <div className={classes.footer}>
        <span>{props.index}</span>
      </div>
    </div>
  );
}

export default Tile;
