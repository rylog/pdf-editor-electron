import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Components, CssBaseline } from "@mui/material";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { pdfjs } from "react-pdf";
import { TypographyOptions } from "@mui/material/styles/createTypography";
import TitleBar from "./components/TitleBar/TitleBar";
import Home from "./pages/Home/Home";
import Editor from "./pages/Editor/Editor";

pdfjs.GlobalWorkerOptions.workerSrc = `./pdfjs-dist/build/pdf.worker.min.js`;

const componentOptions: Components = {
  MuiButton: {
    variants: [
      {
        props: { size: "medium" },
        style: { fontSize: 16, padding: "6px 24px" },
      },
    ],
  },
};

const typographyOptions: TypographyOptions = {
  button: {
    textTransform: "none",
  },
  fontFamily: "Montserrat",
};

const themeLight = createTheme({
  components: componentOptions,
  palette: {
    background: {
      default: "#f5f9fd",
      paper: "#ffffff",
    },
    primary: {
      main: "#428dfd",
    },
  },
  typography: typographyOptions,
});

const themeDark = createTheme({
  components: componentOptions,
  palette: {
    mode: "dark",
    text: {
      primary: "#ffffff",
    },
  },
  typography: typographyOptions,
});

export default function App() {
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
