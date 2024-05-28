import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Typography, List, ListItem, ListItemText } from '@mui/material';

interface FilesDialogComponentProps {
    open: boolean;
    handleClose: () => void;
    onSave: (files: File[]) => void;
}

const FilesOther: React.FC<FilesDialogComponentProps> = ({ open, handleClose, onSave }) => {
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newFiles = Array.from(event.target.files);
            if (newFiles.length + files.length > 10) {
                setError('You can upload up to 10 files.');
            } else {
                setFiles((prevFiles) => [...prevFiles, ...newFiles]);
                setError('');
            }
        }
    };

    const handleSave = () => {
        if (files.length > 0) {
            onSave(files);
            setFiles([]);
            handleClose();
        } else {
            setError('Please upload at least one file.');
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Upload Files</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please upload your files. You can upload up to 10 files.
                </DialogContentText>
                <input type="file" onChange={handleFileChange} multiple className="mb-4" />
                {error && <Typography color="error">{error}</Typography>}
                <List>
                    {files.map((file, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={file.name} />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FilesOther;
