import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileDropZoneProps {
  onFileDrop: (files: File[]) => void;
}

const FileDropZone = ({ onFileDrop }: FileDropZoneProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFileDrop(acceptedFiles);
    },
    [onFileDrop]
  );

  const { getRootProps } = useDropzone({ onDrop, noClick: true });

  return (
    <div
      {...getRootProps()}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    ></div>
  );
};

export default FileDropZone;
