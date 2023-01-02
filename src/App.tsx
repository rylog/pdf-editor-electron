import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Editor from "./pages/Editor";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `./js/pdf.worker.min.js`;

const themeLight = createTheme({
  palette: {
    background: {
      default:  "#f5f9fd",
      paper: "#ffffff",
    },
    primary: {
      main: "#428dfd",
    },
  },
  typography: {
    button: {
      textTransform: 'none'
    },
    fontFamily: 'Montserrat'
  },
});

const themeDark = createTheme({
  palette: {
    mode: 'dark',
    text: {
      primary: "#ffffff"
    }
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  }
});

export default function App() {
  return (
    <ThemeProvider theme={themeLight}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<Editor />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
