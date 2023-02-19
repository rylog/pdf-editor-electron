import { ChangeEvent } from "react";
import Gallery from "../Gallery";
import { useLocation } from "react-router-dom";
import { useFileLoader } from "../../hooks/useFileLoader";
import FileInputButton from "../ui/FileInputButton";

const Editor = () => {
  const { state } = useLocation();
  const { files } = state;
  const { data, loading, error, loadNewFiles } = useFileLoader(files);

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
        <div>
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