'use client';

import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Grid,
    Typography,
    Card,
    CardContent,
    Autocomplete,
    FormControl,
    SelectChangeEvent,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import DialogComponent from './Dialog';
import FilesOther from './FileOther';

const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
};

const data = [{ cpn_n: "Company Fake" }, { cpn_n: "Company Fake2" }];

const UserForm: React.FC = () => {
    const [person, setPerson] = useState({
        prefix: '',
        firstname: '',
        lastname: '',
        prefixth: '',
        firstnameth: '',
        lastnameth: '',
        nickname: '',
        nationality: '',
        outlanderNo: ''
    });
    const [openDialog, setOpenDialog] = useState<string | null>(null);
    const [formData, setFormData] = useState<{ [key: string]: { title: string; file: File | null; startDate: string; endDate: string } }>({});
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [profilePicture, setProfilePicture] = useState<File | null>(null);

    const handleChange = (event: SelectChangeEvent) => {
        setPerson({ ...person, [event.target.name]: event.target.value as string });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setProfilePicture(event.target.files[0]);
        }
    };

    const handleOpenDialog = (type: string) => {
        setOpenDialog(type);
    };

    const handleCloseDialog = () => {
        setOpenDialog(null);
    };

    const handleDialogSave = (type: string, data: { title: string; file: File | null; startDate: string; endDate: string }) => {
        setFormData((prevData) => ({
            ...prevData,
            [type]: data,
        }));
    };

    const handleFilesDialogSave = (files: File[]) => {
        setUploadedFiles(files);
    };

    const handleSubmit = () => {
        console.log('Form Data:', formData);
        console.log('Uploaded Files:', uploadedFiles);
        // Submit the combined formData and uploadedFiles to the API here
    };

    return (
        <Card sx={{ width: '100%', boxShadow: 3 }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'left', marginBottom: 2, flexDirection: 'column' }}>
                    <Typography variant="h6" fontWeight={600} sx={{ ...FontStyle }}>รูปภาพแรงงาน</Typography>
                    <Grid container spacing={2} mb={2}>
                        <Grid item xs={12}>
                            <input type="file" accept="image/*" onChange={handleFileChange} />
                            {profilePicture && (
                                <Typography variant="body1" sx={{ ...FontStyle, marginTop: 1 }}>
                                    Uploaded file: {profilePicture.name}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>

                    <Typography variant="h6" fontWeight={600} sx={{ ...FontStyle }}>ข้อมูลส่วนบุคคล</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel>คำนำหน้าชื่อ ภาษาอังกฤษ</InputLabel>
                                <Select
                                    name="prefix"
                                    value={person.prefix}
                                    label="คำนำหน้าชื่อ ภาษาอังกฤษ"
                                    onChange={handleChange}
                                    sx={{ width: '100%', margin: 1, height: "40px" }}
                                >
                                    <MenuItem value="Mr.">Mr.</MenuItem>
                                    <MenuItem value="Mrs.">Mrs.</MenuItem>
                                    <MenuItem value="Ms.">Ms.</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="ชื่อจริง ภาษาอังกฤษ"
                                name='firstname'
                                variant="outlined"
                                required
                                size="small"
                                sx={{ width: '100%', margin: 1 }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="นามสกุล ภาษาอังกฤษ"
                                name='lastname'
                                variant="outlined"
                                required
                                size="small"
                                sx={{ width: '100%', margin: 1 }}
                            />
                        </Grid>
                        <Grid container spacing={2} marginLeft={0.05}>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel>คำนำหน้าชื่อ ภาษาไทย</InputLabel>
                                    <Select
                                        name="prefixth"
                                        value={person.prefixth}
                                        label="คำนำหน้าชื่อ ภาษาไทย"
                                        onChange={handleChange}
                                        sx={{ width: '100%', margin: 1, height: "40px" }}
                                    >
                                        <MenuItem value="นาย">นาย</MenuItem>
                                        <MenuItem value="นาง">นาง</MenuItem>
                                        <MenuItem value="นางสาว">นางสาว</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="ชื่อจริง ภาษาไทย"
                                    name='firstnameth'
                                    variant="outlined"
                                    required
                                    size="small"
                                    sx={{ width: '100%', margin: 1 }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="นามสกุล ภาษาไทย"
                                    name='lastnameth'
                                    variant="outlined"
                                    required
                                    size="small"
                                    sx={{ width: '100%', margin: 1 }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} marginLeft={0.05}>
                            <Grid item xs={2}>
                                <TextField
                                    label="ชื่อเล่น"
                                    name='nickname'
                                    variant="outlined"
                                    required
                                    size="small"
                                    sx={{ width: '100%', margin: 1 }}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    label="สัญชาติ"
                                    name='nationality'
                                    variant="outlined"
                                    required
                                    size="small"
                                    sx={{ width: '100%', margin: 1 }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="หมายเลขรหัสต่างด้าว"
                                    name='outlanderNo'
                                    variant="outlined"
                                    required
                                    size="small"
                                    sx={{ width: '100%', margin: 1 }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Typography variant="h6" fontWeight={600} sx={{ ...FontStyle }}>บริษัทที่แรงงานทำงาน</Typography>
                    <Grid container spacing={2} mb={2}>
                        <Grid item xs={12} md={4}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={data.map((option) => option.cpn_n)}
                                sx={{ width: 300, height: "40px" }}
                                renderInput={(params) => <TextField {...params} name="cpn_n" label="Company" />}
                            />
                        </Grid>
                    </Grid>

                    <Typography variant="h6" fontWeight={600} sx={{ ...FontStyle }}>ไฟล์เอกสารของแรงงาน</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={3}><Button variant="contained" onClick={() => handleOpenDialog('Visa')}>Visa</Button></Grid>
                        <Grid item xs={3}><Button variant="contained" onClick={() => handleOpenDialog('Passport')}>Passport</Button></Grid>
                        <Grid item xs={3}><Button variant="contained" onClick={() => handleOpenDialog('Work permit')}>Work permit</Button></Grid>
                        <Grid item xs={3}><Button variant="contained" onClick={() => handleOpenDialog('90Days')}>90Days</Button></Grid>
                        <DialogComponent title="Visa" open={openDialog === 'Visa'} handleClose={handleCloseDialog} onSave={(data: any) => handleDialogSave('Visa', data)} />
                        <DialogComponent title="Passport" open={openDialog === 'Passport'} handleClose={handleCloseDialog} onSave={(data: any) => handleDialogSave('Passport', data)} />
                        <DialogComponent title="Work permit" open={openDialog === 'Work permit'} handleClose={handleCloseDialog} onSave={(data: any) => handleDialogSave('Work permit', data)} />
                        <DialogComponent title="90Days" open={openDialog === '90Days'} handleClose={handleCloseDialog} onSave={(data: any) => handleDialogSave('90Days', data)} />
                    </Grid>

                    <Typography variant="h6" fontWeight={600} sx={{ ...FontStyle }}>อัปโหลดไฟล์เพิ่มเติม</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={3}><Button variant="contained" onClick={() => handleOpenDialog('Files')}>Upload Files</Button></Grid>
                        <FilesOther open={openDialog === 'Files'} handleClose={handleCloseDialog} onSave={handleFilesDialogSave} />
                    </Grid>
                </Box>
                <Button variant="contained" sx={{ width: '100%', marginTop: 2 }} onClick={handleSubmit}>Submit</Button>
            </CardContent>
        </Card>
    );
};

export default UserForm;
