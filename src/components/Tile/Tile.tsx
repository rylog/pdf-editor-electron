import { useTheme } from '@mui/material/styles';
import { ReactNode } from 'react';

import { PDFPageReference } from '@/shared/models';
import { Paper } from '@mui/material';
import { useDrag } from '@namecheap/react-muuri';
import Actions, { Action } from './Actions';
import classes from './Tile.module.css';

export interface TileProps {
  index: number;
  pageReference: PDFPageReference;
  actions?: Action[];
  children: ReactNode;
  remove?: () => void;
}

function Tile(props: TileProps): JSX.Element {
  const { children, actions } = props;
  const isDragging = useDrag();
  const theme = useTheme();

  const className = `${classes.container} ${isDragging ? classes.drag : ''}`;
  const actionsClassName = `${classes.actions} ${
    isDragging ? classes.actionsDrag : ''
  }`;

  return (
    <div className={className}>
      <div
        style={{ background: theme.palette.tile.content }}
        className={classes.contentContainer}
      >
        {actions && (
          <div className={actionsClassName}>
            <Actions actions={actions} />
          </div>
        )}
        <div className={classes.content}>{children}</div>
      </div>
      <Paper
        style={{ background: theme.palette.tile.footer }}
        className={classes.footer}
      >
        <span>{props.index}</span>
      </Paper>
    </div>
  );
}

export default Tile;
