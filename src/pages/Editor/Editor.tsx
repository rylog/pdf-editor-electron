import { Button } from '@mui/material';
import { type DecoratedGrid } from '@namecheap/react-muuri/dist/types/interfaces';
import { type ChangeEvent, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import FileInputButton from '../../components/Buttons/FileInputButton';
import useFileLoader from '../../hooks/useFileLoader';
import classes from './Editor.module.css';
import Gallery from './Gallery/Gallery';

function Editor(): JSX.Element {
  const { files } = useLocation().state as { files: FileList };
  const {
    data, loading, error, loadNewFiles,
  } = useFileLoader(files);
  const gridRef = useRef<DecoratedGrid>(null);

  if (error != null) {
    console.error(error);
  }

  const addFiles = (event: ChangeEvent<HTMLInputElement>): void => {
    if ((event?.target.files) != null) {
      loadNewFiles(event?.target.files);
    }
  };

  const click = (): void => {
    console.log(gridRef.current?.getItem(0)?.getData());
  };

  console.log(data);
  return (
    loading
      ? (
        <div>loading</div>
      )
      : (
        <div className={classes.Editor}>
          <FileInputButton onFileChange={addFiles}>Add</FileInputButton>
          <Button onClick={click}>Save</Button>
          <Gallery ref={gridRef} pages={data} />
        </div>
      )
  );
}

export default Editor;
