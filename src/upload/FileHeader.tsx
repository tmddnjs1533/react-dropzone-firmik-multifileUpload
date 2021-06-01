import {Button, Grid} from "@material-ui/core";

export interface FileHeaderProps{
    file: File;
    onDelete: (file: File) => void;
}

export function FileHeader({file, onDelete}: FileHeaderProps) {
    return <Grid container justify="space-between" alignItems="center">
        <Grid item>{file.name}</Grid>
        <Grid item><Button onClick={() => onDelete(file)} size="small">Delete</Button></Grid>
    </Grid>
}