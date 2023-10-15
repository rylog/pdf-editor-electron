import useColorMode from '@/contexts/colorMode/useColorMode';
import PDFPagesProvider from '@/contexts/pdf/PDFPagesProvider';
import { Components, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import TitleBar from '../components/TitleBar/TitleBar';
import Editor from '../pages/Editor/Editor';
import Home from '../pages/Home/Home';
import './App.module.css';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    glass: PaletteColor;
  }
  interface PaletteOptions {
    glass?: PaletteColorOptions;
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
    glass: {
      main: 'rgba(247,249,252, 0.5)',
    },
    primary: {
      main: '#4D6CFA',
    },
  },
  typography: typographyOptions,
});

const themeDark = createTheme({
  components: componentOptions,
  palette: {
    mode: 'dark',
    background: {
      default: '#18191a',
      paper: '#18191a',
    },
    glass: {
      main: 'rgba(247,249,252, 0.5)',
    },
    primary: {
      main: '#343d96',
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

function App(): JSX.Element {
  const { mode } = useColorMode();
  const theme = mode === 'light' ? themeLight : themeDark;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TitleBar />
      <Router>
        <PDFPagesProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/editor" element={<Editor />} />
          </Routes>
        </PDFPagesProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
