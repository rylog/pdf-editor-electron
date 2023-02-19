import { ChangeEvent, useEffect, useState } from 'react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import Gallery from '../Gallery';
import { useLocation } from 'react-router-dom';

import PdfLoader from "../../services/PdfLoader"
import PageInfo from '../../types/PageInfo';

const Editor = () => {
  const { state } = useLocation();
  const { files } = state;
  const [isLoading, setIsLoading] = useState(true);
  
  var fileId = 0;
  var id =0;



  const [pages, setPages] = useState<PageInfo[]>([]);

  useEffect(() => {
    const loadFiles = async (files: FileList) : Promise<PageInfo[]> => {
      return new Promise<PageInfo[]>(async resolve => {
        const tiles: PageInfo[] = [];
        const readersResults = await PdfLoader.readFilesAsArrayBuffer(files);
        for (let arrayBuffer in readersResults) {
          const pages = await PdfLoader.loadDocumentPages(readersResults[arrayBuffer]);
          fileId++;
          // eslint-disable-next-line no-loop-func
          pages.forEach(page => {
            tiles.push({ id:id++, fileId: fileId, pageProxy: page })
          })
        }
        resolve(tiles);
      })
    };

    loadFiles(files).then(loadedFiles => {
      setPages(loadedFiles);
      setIsLoading(false);
    })
  }, [fileId, files, id])


  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files)
      return;

    //setFile(event.target.files[0]);
  }

  return (
    isLoading ? <div>Loading</div> : <Gallery pages={pages} />

  );
}

export default Editor;