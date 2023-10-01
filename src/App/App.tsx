import { Components, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import './App.module.css';

import PDFPagesProvider from '@/contexts/pdf/PDFPagesProvider';
import TitleBar from '../components/TitleBar/TitleBar';
import Editor from '../pages/Editor/Editor';
import Home from '../pages/Home/Home';

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
    primary: {
      main: '#428dfd',
    },
  },
  typography: typographyOptions,
});

const themeDark = createTheme({
  components: componentOptions,
  palette: {
    mode: 'dark',
    text: {
      primary: '#ffffff',
    },
  },
  typography: typographyOptions,
});

export default function App(): JSX.Element {
  return (
    <ThemeProvider theme={themeLight}>
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
