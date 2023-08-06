import { useTheme } from '@mui/material/styles';
import { ReactNode } from 'react';

import { useDrag } from '@namecheap/react-muuri';
import classes from './Tile.module.css';

interface TileProps {
  children: ReactNode;
}

function Tile(props: TileProps): JSX.Element {
  const { children } = props;
  const theme = useTheme();
  const isDragging = useDrag();

  const className = `${classes.tile} ${isDragging ? classes.drag : ''}`;

  return (
    <div
      className={className}
      style={{ background: theme.palette.background.paper }}
    >
      {children}
    </div>
  );
}

export default Tile;
