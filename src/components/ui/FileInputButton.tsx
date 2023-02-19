import classes from "./FileInputButton.module.css"
import Button from "@mui/material/Button";
import { ButtonProps } from "@mui/material/Button/Button";
import { ChangeEvent, ReactNode, useRef } from "react";

interface FileInputButtonProps {
  children?: ReactNode;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => any;
}

const FileInputButton = (props: FileInputButtonProps & ButtonProps) => {

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const browseFiles = () => {
    if (hiddenFileInput.current)
      hiddenFileInput.current.click();
  }
  
  const {children, onFileChange, ...buttonProps } = props
  return (
    <>
      <input
        className={classes.fileInput}
        type="file"
        ref={hiddenFileInput}
        multiple
        onChange={(event) => props.onFileChange(event)}
      />
      <Button {...buttonProps} onClick = {browseFiles}>
        {props.children}
      </Button>
    </>
  )
}

export default FileInputButton;