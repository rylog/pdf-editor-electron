import { Button } from '@mui/material';
import { type DecoratedGrid } from '@namecheap/react-muuri/dist/types/interfaces';
import { useRef, type ChangeEvent } from 'react';

import { usePDFPages } from '@/components/PDFPagesProvider/PDFPagesProvider';
import { PDFPageReference } from '@/shared/models';
import FileInputButton from '../../components/Buttons/FileInputButton';
import classes from './Editor.module.css';
import Gallery from './Gallery/Gallery';

function Editor(): JSX.Element {
  const { pages, isLoading, error, loadPDFPages, generatePDF } = usePDFPages();

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
    <div className={classes.Editor}>
      <FileInputButton onFileChange={addFiles}>Add</FileInputButton>
      <Button onClick={onSave}>Save</Button>
      <Gallery ref={gridRef} loadedPages={pages} />
    </div>
  );
}

export default Editor;
