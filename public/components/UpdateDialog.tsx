import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Typography, TextField } from '@mui/material';
import InputTextMasked from './InputMasked';
import moment from 'moment';

interface DialogComponentProps {
    title: string;
    open: boolean;
    handleClose: () => void;
    onSave: (data: { title: string; id: string | null; file: File | null, startDate: string, endDate: string }) => void;
    person: any
}

const DialogComponent: React.FC<DialogComponentProps> = ({ title, open, handleClose, onSave, person }) => {
    const [file, setFile] = useState<File | null>(null);
    const [startDate, setStartDate] = useState<string>(``);
    const [endDate, setEndDate] = useState<string>('');
    const [id, setId] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    useEffect(() => {
        if (person) {
            setStartDate(person[`${title.toLowerCase()}_startdate`] || '');
            setEndDate(person[`${title.toLowerCase()}_enddate`] || '');
            setId(person[`${title.toLowerCase()}_id`] || '');
        }
    }, [person, title]);

    const handleSave = () => {
        if (title === 'ninetydays' && file && startDate && endDate) {
            onSave({ title, id, file, startDate, endDate });
            handleClose();
        } else if (title !== 'ninetydays' && id && file && startDate && endDate) {
            onSave({ title, id, file, startDate, endDate });
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
                {title !== 'ninetydays' && (
                    <TextField
                        label="ID"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                )}
                <input type="file" onChange={handleFileChange} className="mb-4" />
                <InputTextMasked
                    label={`Start Date (กรอกแบบตัวเลข เช่น ${moment().format('YYYY-MM-DD')})`}
                    placeholder={`ปีค.ศ-เดือน-วัน`}
                    value={startDate}
                    onChange={(e: any) => setStartDate(e.target.value)}
                    fullWidth
                    options={{ date: true, delimiter: '-', datePattern: ['Y', 'm', 'd'] }}
                    margin="normal"
                />
                <InputTextMasked
                    label={`End Date (กรอกแบบตัวเลข เช่น ${moment().format('YYYY-MM-DD')})`}
                    placeholder={`ปีค.ศ-เดือน-วัน`}
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
