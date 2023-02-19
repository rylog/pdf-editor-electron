import classes from "./Home.module.css"
import Folder from '@mui/icons-material/Folder'
import { ChangeEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Paper } from '@mui/material';

const Home = () => {

  const navigate = useNavigate();
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const browseFiles = () => {
    if (hiddenFileInput.current)
      hiddenFileInput.current.click();
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    navigate('/editor', { state: { files: files } });
  };

  return (
    <div className={classes.main}>
      <Paper className={classes.fileUpload}>
        <Folder color="primary" sx={{ fontSize: 108 }}></Folder>
        <h1>Drag your PDF files here</h1>
        <p className={classes.lined}>OR</p>
        <Button sx={{ mt: 2}} className={classes.browseBtn} color="primary" variant="contained"  onClick={browseFiles} >
        Browse files
      </Button>
      <input
        className={classes.fileInput}
        type="file"
        ref={hiddenFileInput}
        multiple
        onChange={(event) => {
          handleInputChange(event);
        }}
      />
    </Paper>
    </div >
  );
};

export default Home;