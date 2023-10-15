import useColorMode from '@/contexts/colorMode/useColorMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Box, IconButton } from '@mui/material';
import classes from './TitleBar.module.css';

function TitleBar(): JSX.Element {
  const { mode, toggleColorMode } = useColorMode();
  return (
    <div className={classes.titleBar}>
      <IconButton
        size="small"
        className={classes.themeChange}
        onClick={toggleColorMode}
      >
        {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
      <Box className={classes.draggable}></Box>
    </div>
  );
}

export default TitleBar;
