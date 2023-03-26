import classes from "./Editor.module.css"
import { ChangeEvent, useRef } from "react";
import Gallery from "../Editor/Gallery/Gallery";
import { useFileLoader } from "../../hooks/useFileLoader";
import FileInputButton from "../../components/Buttons/FileInputButton";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { DecoratedGrid } from "@namecheap/react-muuri/dist/types/interfaces";


const Editor = () => {
  const { files } = useLocation().state as { files: FileList };
  const { data, loading, error, loadNewFiles } = useFileLoader(files);
  const gridRef = useRef<DecoratedGrid>(null);

  if (error) {
    console.error(error);
  }

  const addFiles = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event?.target.files) {
      loadNewFiles(event?.target.files);
    }
  };

  return (
    <>
      {loading ? (
        <div>loading</div>
      ) : (
        <div className={classes.Editor}>
          <FileInputButton onFileChange={addFiles}>Add</FileInputButton>
          <Button onClick={() => console.log(gridRef.current?.getItem(0)?.getData())}>Save</Button>
          <Gallery ref={gridRef} pages={data} />
        </div>
      )}
    </>
  );
};

export default Editor;
