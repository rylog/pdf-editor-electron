import MenuSelect from '@/components/ModeSelect/ModeSelect';
import usePDFPages from '@/contexts/pdf/usePDFPages';
import { PDFPageReference } from '@/shared/models';
import AddIcon from '@mui/icons-material/Add';
import SaveAltRoundedIcon from '@mui/icons-material/SaveAltRounded';
import { Button, IconButton, Paper } from '@mui/material';
import { type DecoratedGrid } from '@namecheap/react-muuri/dist/types/interfaces';
import { useRef, type ChangeEvent } from 'react';
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
    <Paper className={classes.editor}>
      <div className={classes.header}>
        <div className={classes.actions}>
          <div className={classes.modifiers}></div>
          <div className={classes.actionButtons}>
            <FileInputButton
              variant="outlined"
              onFileChange={addFiles}
              startIcon={<AddIcon />}
              sx={{ height: '42px', padding: '6px 12px' }}
            >
              Add
            </FileInputButton>
            <Button
              sx={{ height: '42px', ml: '4px', padding: '6px 12px' }}
              color="primary"
              variant="contained"
              onClick={onSave}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
      <Gallery ref={gridRef} />
    </Paper>
  );
}

export default Editor;
