import usePDFPages from '@/contexts/pdf/usePDFPages';
import { PDFPageReference } from '@/shared/models';
import AddIcon from '@mui/icons-material/Add';
import { Button, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { type DecoratedGrid } from '@namecheap/react-muuri/dist/types/interfaces';
import { useRef, type ChangeEvent } from 'react';
import Dropzone, { FileRejection } from 'react-dropzone';
import toast from 'react-hot-toast';
import FileInputButton from '../../components/Buttons/FileInputButton';
import classes from './Editor.module.css';
import Gallery from './Gallery/Gallery';

const Editor = () => {
  const { error, loadPDFPages, generatePDF, pages } = usePDFPages();

  const gridRef = useRef<DecoratedGrid>(null);
  const theme = useTheme();
  const isLightMode = theme.palette.mode === 'light';

  if (error != null) {
    console.error(error);
  }

  const addFiles = (event: ChangeEvent<HTMLInputElement>): void => {
    const { files } = event.target;
    const filesArray = files ? Array.from(files) : [];
    loadPDFPages(filesArray);
  };

  const onSave = (): void => {
    const grid = gridRef.current;
    if (!grid) {
      return;
    }
    const items = gridRef.current?.getItems();
    const data = items.map((item) => item.getData() as PDFPageReference);
    generatePDF(data);
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

  return (
    <Dropzone
      noClick
      accept={{ 'application/pdf': ['.pdf'] }}
      onDropAccepted={loadPDFPages}
      onDropRejected={onDropRejected}
    >
      {({ getRootProps }) => (
        <Paper
          {...getRootProps()}
          style={{ background: theme.palette.editor.main }}
          className={classes.editor}
        >
          <div className={classes.header}>
            <div className={classes.actions}>
              <div className={classes.modifiers}></div>
              <div className={classes.actionButtons}>
                <FileInputButton
                  color={isLightMode ? 'primary' : 'secondary'}
                  variant={isLightMode ? 'outlined' : 'text'}
                  onFileChange={addFiles}
                  startIcon={<AddIcon />}
                  sx={{
                    height: '42px',
                    padding: '6px 12px',
                    border: isLightMode ? '1px solid' : 'none',
                  }}
                >
                  Add
                </FileInputButton>
                <Button
                  sx={{
                    height: '42px',
                    ml: '4px',
                    padding: '6px 12px',
                  }}
                  color="primary"
                  variant="contained"
                  onClick={onSave}
                  disabled={pages.length == 0}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
          <Gallery gridRef={gridRef} />
        </Paper>
      )}
    </Dropzone>
  );
};

export default Editor;
