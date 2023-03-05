import classes from "./Editor.module.css"
import { ChangeEvent } from "react";
import Gallery from "../ui/Gallery/Gallery";
import { useLocation } from "react-router-dom";
import { useFileLoader } from "../../hooks/useFileLoader";
import FileInputButton from "../ui/Buttons/FileInputButton";

const Editor = () => {
  const { state } = useLocation();
  const { files } = state;
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
          <FileInputButton onFileChange={(event) => addFiles(event)}>
            Test
          </FileInputButton>
          <Gallery pages={data} />
        </div>
      )}
    </>
  );
};

export default Editor;
