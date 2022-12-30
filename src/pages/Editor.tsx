import React, { ChangeEvent, useState } from 'react';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Document, Page, pdfjs } from "react-pdf";
import { useLocation } from 'react-router-dom';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
  standardFontDataUrl: 'standard_fonts/',
};

const Editor = () => {
	const {state} = useLocation();
	const {files} = state;
	console.log(files)
  const [file, setFile] = useState<File>(files[0]);
  const [numPages, setNumPages] = useState<number>(1);

  function onFileChange(event :ChangeEvent<HTMLInputElement>) {
		if(!event.target.files)
			return;
    setFile(event.target.files[0]);
  }

  function onDocumentLoadSuccess() {
    setNumPages(1);
  }

  return (
    <div className="Example">
      <header>
        <h1>react-pdf sample page</h1>
      </header>
      <div className="Example__container">
        <div className="Example__container__load">
          <label htmlFor="file">Load from file:</label>{' '}
          <input onChange={onFileChange} type="file" />
        </div>
        <div className="Example__container__document">
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}

export default Editor;