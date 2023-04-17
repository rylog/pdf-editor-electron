import { Button } from '@mui/material';
import { type DecoratedGrid } from '@namecheap/react-muuri/dist/types/interfaces';
import { type ChangeEvent, useRef } from 'react';


import FileInputButton from '../../components/Buttons/FileInputButton';
import PdfGenerator from '../../services/PdfGenerator';
import classes from './Editor.module.css';
import Gallery from './Gallery/Gallery';
import { usePDFPages } from '@/components/PDFPagesProvider/PDFPagesProvider';

function Editor(): JSX.Element {
  const {
    pages, isPdfPagesLoading, pdfPagesError, loadPdfPages,
  } = usePDFPages();

  const gridRef = useRef<DecoratedGrid>(null);

  if (pdfPagesError != null) {
    console.error(pdfPagesError);
  }

  const addFiles = (event: ChangeEvent<HTMLInputElement>): void => {
    if ((event?.target.files) != null) {
      loadPdfPages(event?.target.files);
    }
  };

  const click = (): void => {
    PdfGenerator.createPdf();
    console.log(gridRef.current?.getItems().map((item) => item.getKey()));
  };

  return (
    <div className={classes.Editor}>
      <FileInputButton onFileChange={addFiles}>Add</FileInputButton>
      <Button onClick={click}>Save</Button>
      <Gallery ref={gridRef} loadedPages={pages} />
    </div>
  );
}

export default Editor;
