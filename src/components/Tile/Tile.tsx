import { useTheme } from '@mui/material/styles';
import { ReactNode } from 'react';

import classes from './Tile.module.css';

interface TileProps {
  children: ReactNode;
}

function Tile(props: TileProps): JSX.Element {
  const { children } = props;
  const theme = useTheme();
  return (
    <div className={classes.tile} style={{ background: theme.palette.background.paper }}>
      {children}
    </div>
  );
}

export default Tile;
