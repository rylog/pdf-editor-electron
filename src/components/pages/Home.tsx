import classes from "./Home.module.css";
import Folder from "@mui/icons-material/Folder";
import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";
import FileInputButton from "../ui/Buttons/FileInputButton";

const Home = () => {
  const navigate = useNavigate();
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    console.log(files)
    navigate("/editor", { state: { files: files } });
  };

  return (
    <div className={classes.main}>
      <Paper className={classes.fileUpload}>
        <Folder color="primary" sx={{ fontSize: 108 }}></Folder>
        <h1>Drag your PDF files here</h1>
        <p className={classes.lined}>OR</p>
        <FileInputButton
          sx={{ mt: 2 }}
          className={classes.browseBtn}
          color="primary"
          variant="contained"
          onFileChange={(event) => handleInputChange(event)}
        >
          Browse files
        </FileInputButton>
      </Paper>
    </div>
  );
};

export default Home;
