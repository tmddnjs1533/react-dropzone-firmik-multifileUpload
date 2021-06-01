import { useState, useCallback, useEffect } from 'react';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import { SingleFileUploadWithProgress } from './SingleFileUploadWithProgress';
import { Grid } from '@material-ui/core';
import { useField } from 'formik';
import { UploadError } from './UploadError';

export interface UploadableFile {
  file: File;
  errors: FileError[];
  url?: string;
}

export function MultipleFileUploadField({ name }: { name: string }) {
  const [_, __, helpers] = useField(name);
  const [files, setFiles] = useState<UploadableFile[]>([]);
  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    const mappedAcc = accFiles.map((file) => ({ file, errors: [] }));
    setFiles((curr) => [...curr, ...mappedAcc, ...rejFiles]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 300 * 1024, // 300kb
  });

  useEffect(() => {
    helpers.setValue(files);
    // helpers.setTouched(true)
  }, [files]);

  function onUpload(file: File, url: string) {
    setFiles((curr) =>
      curr.map((fw) => {
        if (fw.file === file) {
          return { ...fw, url };
        }
        return fw;
      }),
    );
  }
  function onDelete(file: File) {
    setFiles((curr) => curr.filter((fw) => fw.file !== file));
  }
  return (
    <>
      <Grid item>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
      </Grid>

      {files.map((fileWrapper, idx) => (
        <Grid item>
          {fileWrapper.errors.length ? (
            <UploadError file={fileWrapper.file} errors={fileWrapper.errors} onDelete={onDelete} />
          ) : (
            <SingleFileUploadWithProgress key={idx} onDelete={onDelete} file={fileWrapper.file} onUpload={onUpload} />
          )}
        </Grid>
      ))}
    </>
  );
}
