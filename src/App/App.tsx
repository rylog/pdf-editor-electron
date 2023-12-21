import useColorMode from '@/contexts/colorMode/useColorMode';
import PDFPagesProvider from '@/contexts/pdf/PDFPagesProvider';
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import { Components, ThemeProvider, createTheme } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import { lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import TitleBar from '../components/TitleBar/TitleBar';
import './App.module.css';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    tile: {
      content: string;
      footer: string;
    };
    titleBar: {
      border: string;
    };
    editor: {
      main: string;
    };
  }
  interface PaletteOptions {
    tile?: {
      content: string;
      footer: string;
    };
    titleBar?: {
      border: string;
    };
    editor?: {
      main: string;
    };
  }
}

const componentOptions: Components = {
  MuiButton: {
    variants: [
      {
        props: { size: 'medium' },
        style: {
          fontSize: 16,
          fontWeight: 400,
          padding: '6px 24px',
        },
      },
    ],
  },
};

const typographyOptions: TypographyOptions = {
  button: {
    textTransform: 'none',
  },
  fontFamily: 'Montserrat',
};

const themeLight = createTheme({
  components: componentOptions,
  palette: {
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    titleBar: {
      border: '#ededed',
    },
    editor: {
      main: '#ffffff',
    },
    tile: {
      content: 'rgba(248, 248, 248, 0.5)',
      footer: '#ffffff',
    },
    primary: {
      main: '#4D6CFA',
    },
  },
  typography: typographyOptions,
});

const Editor = lazy(() => import('../pages/Editor/Editor'));
const Home = lazy(() => import('../pages/Home/Home'));

const themeDark = createTheme({
  components: componentOptions,
  palette: {
    mode: 'dark',
    background: {
      default: '#18191a',
      paper: '#18191a',
    },
    titleBar: {
      border: '#373737',
    },
    editor: {
      main: '#141414',
    },

    tile: {
      content: 'rgba(74, 74, 74, 0.5)',
      footer: '#1d1d1d',
    },
    primary: {
      main: '#4D6CFA',
    },
    secondary: {
      main: '#bdc2ff',
    },
    text: {
      primary: '#ededed',
    },
  },
  typography: typographyOptions,
});

const App = () => {
  const { mode } = useColorMode();
  const theme = mode === 'light' ? themeLight : themeDark;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TitleBar />
      <Router>
        <Toaster
          position="top-center"
          containerStyle={{
            position: 'relative',
          }}
          toastOptions={{
            style: {
              background: mode === 'light' ? '#fff' : '#333',
              color: mode === 'light' ? '#333' : '#fff',
            },
          }}
        />
        <PDFPagesProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/editor" element={<Editor />} />
          </Routes>
        </PDFPagesProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
