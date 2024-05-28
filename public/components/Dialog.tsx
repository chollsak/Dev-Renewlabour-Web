import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Typography } from '@mui/material';
import InputTextMasked from './InputMasked';

interface DialogComponentProps {
    title: string;
    open: boolean;
    handleClose: () => void;
    onSave: (data: { title: string; file: File | null, startDate: string, endDate: string }) => void;
}

const DialogComponent: React.FC<DialogComponentProps> = ({ title, open, handleClose, onSave }) => {
    const [file, setFile] = useState<File | null>(null);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleSave = () => {
        if (title && file && startDate && endDate) {
            onSave({ title, file, startDate, endDate });
            handleClose();
        } else {
            alert('Please fill out all fields.');
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please upload the required file and specify the start and end dates.
                </DialogContentText>
                <input type="file" onChange={handleFileChange} className="mb-4" />
                <InputTextMasked
                    label="Start Date"
                    value={startDate}
                    onChange={(e: any) => setStartDate(e.target.value)}
                    fullWidth
                    options={{ date: true, delimiter: '-', datePattern: ['Y', 'm', 'd'] }}
                    margin="normal"
                />
                <InputTextMasked
                    label="End Date"
                    value={endDate}
                    onChange={(e: any) => setEndDate(e.target.value)}
                    fullWidth
                    options={{ date: true, delimiter: '-', datePattern: ['Y', 'm', 'd'] }}
                    margin="normal"
                />
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

export default DialogComponent;