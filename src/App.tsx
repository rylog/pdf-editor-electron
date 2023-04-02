import './App.css';

import { Components, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import { pdfjs } from 'react-pdf';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';

import TitleBar from './components/TitleBar/TitleBar';
import Editor from './pages/Editor/Editor';
import Home from './pages/Home/Home';

pdfjs.GlobalWorkerOptions.workerSrc = './pdfjs-dist/build/pdf.worker.min.js';

const componentOptions: Components = {
  MuiButton: {
    variants: [
      {
        props: { size: 'medium' },
        style: { fontSize: 16, padding: '6px 24px' },
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
      default: '#f5f9fd',
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<Editor />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
