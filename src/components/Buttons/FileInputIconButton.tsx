import { ButtonProps } from '@mui/material/Button/Button';
import { ChangeEvent, useRef } from 'react';

import classes from './FileInputButton.module.css';
import { IconButton } from '@mui/material';

interface FileInputButtonProps {
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function FileInputButton(
  props: FileInputButtonProps & ButtonProps
): JSX.Element {
  const hiddenFileInputRef = useRef<HTMLInputElement>(null);

  const browseFiles = (): void => {
    if (hiddenFileInputRef.current != null) {
      hiddenFileInputRef.current.value = '';
      hiddenFileInputRef.current.click();
    }
  };

  const { children, onFileChange, ...buttonProps } = props;
  return (
    <>
      <input
        className={classes.fileInput}
        type="file"
        accept="application/pdf"
        ref={hiddenFileInputRef}
        multiple
        onChange={onFileChange}
      />
      <IconButton {...buttonProps} onClick={browseFiles}>
        {children}
      </IconButton>
    </>
  );
}

export default FileInputButton;
