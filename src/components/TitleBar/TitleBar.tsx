import useColorMode from '@/contexts/colorMode/useColorMode';
import ipcEventSender from '@/services/ipcEventsSender';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { Box, Button, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import classes from './TitleBar.module.css';

function TitleBar(): JSX.Element {
  const { mode, toggleColorMode } = useColorMode();
  const theme = useTheme();
  const minimize = () => ipcEventSender.minimize();
  const maximize = () => ipcEventSender.maximize();
  const close = () => ipcEventSender.close();

  return (
    <div
      style={{ borderBottom: `solid 1px ${theme.palette.titleBar.border}` }}
      className={classes.titleBar}
    >
      <IconButton
        size="small"
        className={classes.themeChange}
        style={{ margin: '4px' }}
        onClick={toggleColorMode}
      >
        {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
      <Box className={classes.draggable}></Box>
      <Button
        size="small"
        variant="text"
        style={{ minWidth: '48px' }}
        onClick={minimize}
      >
        <RemoveRoundedIcon sx={{ fontSize: '16px' }} />
      </Button>
      <Button
        size="small"
        variant="text"
        style={{ minWidth: '48px' }}
        onClick={maximize}
      >
        <CropSquareIcon sx={{ fontSize: '14px' }} />
      </Button>
      <Button
        size="small"
        variant="text"
        style={{ minWidth: '48px' }}
        onClick={close}
      >
        <CloseRoundedIcon sx={{ fontSize: '16px' }} />
      </Button>
    </div>
  );
}

export default TitleBar;
