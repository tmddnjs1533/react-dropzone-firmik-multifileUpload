import { createStyles, withStyles } from '@material-ui/core/styles';
import { FileHeader } from './FileHeader';
import { LinearProgress, Typography } from '@material-ui/core';
import { FileError } from 'react-dropzone';

export interface UploadErrorProps {
  file: File;
  onDelete: (file: File) => void;
  errors: FileError[];
}
const ErrorBorderLinearProgress = withStyles((theme) =>
  createStyles({
    bar: {
      backgroundColor: theme.palette.error.main,
    },
  }),
)(LinearProgress);
export function UploadError({ file, onDelete, errors }: UploadErrorProps) {
  return (
    <>
      <FileHeader file={file} onDelete={onDelete} />
      <ErrorBorderLinearProgress variant="determinate" value={100} />
      {errors.map((error) => (
        <div>
          <Typography color="error">{error.message}</Typography>
        </div>
      ))}
    </>
  );
}
