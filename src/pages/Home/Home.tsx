import iconImage from '@/assets/icons/fluid_256.png';
import usePDFPages from '@/contexts/pdf/usePDFPages';
import { CircularProgress, Paper } from '@mui/material';
import { ChangeEvent } from 'react';
import Dropzone, { FileRejection } from 'react-dropzone';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import FileInputButton from '../../components/Buttons/FileInputButton';
import classes from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();
  const { loadPDFPages, isLoading } = usePDFPages();

  const loadFiles = async (files: File[]) => {
    if (files.length > 0) {
      const { success } = await loadPDFPages(files);
      if (success.length != 0) navigate('/editor');
    }
  };

  const handleInputChange = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const { files } = event.target;
    const filesArray = files ? Array.from(files) : [];
    loadFiles(filesArray);
  };

  const onDropRejected = (fileRejections: FileRejection[]) => {
    for (const file of fileRejections) {
      toast.error(
        <div>
          Unsupported file format. Could not load{' '}
          <strong>{file.file.name}</strong>
        </div>
      );
    }
  };

  if (isLoading) {
    return <CircularProgress className={classes.circularProgress} />;
  }

  return (
    <Dropzone
      noClick
      accept={{ 'application/pdf': ['.pdf'] }}
      onDropAccepted={loadFiles}
      onDropRejected={onDropRejected}
    >
      {({ getRootProps }) => (
        <div {...getRootProps()} className={classes.main}>
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
      )}
    </Dropzone>
  );
};

export default Home;
