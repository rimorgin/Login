import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function ImgDropZone() {
  const { getRootProps, getInputProps, open } = useDropzone();

  const handleOpenClick = useCallback(() => {
    open();
  }, [open]);

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <button type="button" onClick={handleOpenClick}>
        Open
      </button>
    </div>
  );
}
