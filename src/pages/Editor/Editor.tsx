import { Button, Paper } from '@mui/material';
import { type DecoratedGrid } from '@namecheap/react-muuri/dist/types/interfaces';
import { useRef, type ChangeEvent } from 'react';

import usePDFPages from '@/contexts/pdf/usePDFPages';
import { PDFPageReference } from '@/shared/models';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import FileInputButton from '../../components/Buttons/FileInputButton';
import classes from './Editor.module.css';
import Gallery from './Gallery/Gallery';

function Editor(): JSX.Element {
  const { error, loadPDFPages, generatePDF } = usePDFPages();

  const gridRef = useRef<DecoratedGrid>(null);

  if (error != null) {
    console.error(error);
  }

  const addFiles = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event?.target.files != null) {
      loadPDFPages(event?.target.files);
    }
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

  return (
    <Paper className={classes.Editor}>
      <div className={classes.ActionButtons}>
        <FileInputButton
          variant="outlined"
          onFileChange={addFiles}
          startIcon={<AddIcon />}
        >
          Add
        </FileInputButton>
        <Button
          sx={{ ml: '4px' }}
          variant="contained"
          disableElevation
          startIcon={<SaveIcon />}
          onClick={onSave}
        >
          Save
        </Button>
      </div>
      <Gallery ref={gridRef} />
    </Paper>
  );
}

export default Editor;
