import { Button } from '@mui/material';
import { type DecoratedGrid } from '@namecheap/react-muuri/dist/types/interfaces';
import { type ChangeEvent, useRef } from 'react';

import FileInputButton from '../../components/Buttons/FileInputButton';
import PdfGenerator from '../../services/PdfGenerator';
import classes from './Editor.module.css';
import Gallery from './Gallery/Gallery';
import { usePDFPages } from '@/components/PDFPagesProvider/PDFPagesProvider';

function Editor(): JSX.Element {
  const { pages, isLoading, error, loadPDFPages, savePDF } = usePDFPages();

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
    savePDF();
    console.log('gelol');
  };

  return (
    <div className={classes.Editor}>
      <FileInputButton onFileChange={addFiles}>Add</FileInputButton>
      <Button onClick={onSave}>Save</Button>
      <Gallery ref={gridRef} loadedPages={pages} />
    </div>
  );
}

export default Editor;
