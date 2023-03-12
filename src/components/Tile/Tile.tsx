import classes from "./Tile.module.css"
import { ReactNode } from "react";
import { useTheme } from "@mui/material/styles";

interface TileProps {
  children: ReactNode;
}

const Tile = (props: TileProps) => {
  const theme = useTheme();
  return (
    <div className={classes.tile} style={{ background: theme.palette.background.paper }}>
      {props.children}
    </div >
  )
}

export default Tile;