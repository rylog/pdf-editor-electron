import Folder from '@mui/icons-material/Folder';
import { Paper } from '@mui/material';
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import FileInputButton from '../../components/Buttons/FileInputButton';
import classes from './Home.module.css';
import { usePDFPages } from '@/components/PDFPagesProvider/PDFPagesProvider';

function Home(): JSX.Element {
  const navigate = useNavigate();
  const { loadPDFPages } = usePDFPages();
  const handleInputChange = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const { files } = event.target;
    if (files) await loadPDFPages(files);
    navigate('/editor');
  };

  return (
    <div className={classes.main}>
      <Paper className={classes.fileUpload} elevation={0}>
        <Folder color="primary" sx={{ fontSize: 108 }} />
        <h1>Drag your PDF files here</h1>
        <p className={classes.lined}>OR</p>
        <FileInputButton
          sx={{ mt: 2, mb: 8, width: 144 }}
          className={classes.browseBtn}
          color="primary"
          variant="contained"
          onFileChange={handleInputChange}
        >
          Browse files
        </FileInputButton>
      </Paper>
    </div>
  );
}

export default Home;
