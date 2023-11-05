import Button from '@mui/material/Button';
import { ButtonProps, ButtonTypeMap } from '@mui/material/Button/Button';
import { ChangeEvent, useRef } from 'react';

import { ExtendButtonBase } from '@mui/material';
import classes from './FileInputButton.module.css';

interface FileInputButtonProps {
  buttonType?: ExtendButtonBase<ButtonTypeMap<unknown, 'button'>>;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FileInputButton = (props: FileInputButtonProps & ButtonProps) => {
  const hiddenFileInputRef = useRef<HTMLInputElement>(null);

  const browseFiles = (): void => {
    if (hiddenFileInputRef.current != null) {
      hiddenFileInputRef.current.value = '';
      hiddenFileInputRef.current.click();
    }
  };

  const { onFileChange, buttonType = Button, ...buttonProps } = props;

  const ButtonType = buttonType;
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
      <ButtonType {...buttonProps} onClick={browseFiles}>
        {buttonProps.children}
      </ButtonType>
    </>
  );
};

export default FileInputButton;
