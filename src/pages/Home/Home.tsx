import iconImage from '@/assets/icons/fluid_256.png';
import usePDFPages from '@/contexts/pdf/usePDFPages';
import { Paper } from '@mui/material';
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import FileInputButton from '../../components/Buttons/FileInputButton';
import classes from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();
  const { loadPDFPages } = usePDFPages();

  const handleInputChange = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const { files } = event.target;
    if (files) {
      loadPDFPages(files);
      navigate('/editor');
    }
  };

  return (
    <div className={classes.main}>
      <Paper className={classes.fileUpload} elevation={0}>
        <img className={classes.icon} src={iconImage} />
        <h1>Drag your PDF files here</h1>
        <p className={classes.lined}>OR</p>
        <FileInputButton
          sx={{ mt: 2, mb: 4, width: 144 }}
          color="primary"
          variant="contained"
          onFileChange={handleInputChange}
        >
          Browse files
        </FileInputButton>
      </Paper>
    </div>
  );
};

export default Home;
