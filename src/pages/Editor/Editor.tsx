import classes from "./Editor.module.css"
import { ChangeEvent } from "react";
import Gallery from "../Editor/Gallery/Gallery";

import { useFileLoader } from "../../hooks/useFileLoader";
import FileInputButton from "../../components/Buttons/FileInputButton";
import { useLocation } from "react-router-dom";


const Editor = () => {
  const { files } = useLocation().state as { files: FileList };
  const { data, loading, error, loadNewFiles } = useFileLoader(files);

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
          <FileInputButton onFileChange={addFiles}>
            Add
          </FileInputButton>
          <Gallery pages={data} />
        </div>
      )}
    </>
  );
};

export default Editor;
