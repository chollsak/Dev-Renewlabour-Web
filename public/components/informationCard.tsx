'use client';

import React, { useEffect, useState } from 'react';
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
import axios from 'axios'

const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
};

const UserForm: React.FC = () => {

    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/companyform');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this useEffect runs once on mount

    const [person, setPerson] = useState({
        prefix: '',
        firstname: '',
        lastname: '',
        prefixth: '',
        firstnameth: '',
        lastnameth: '',
        nickname: '',
        nationality: '',
        outlanderNo: '',
        company: null,
        pic_path: '',
        visa_id: '',
        visa_startdate: '',
        visa_enddate: '',
        visa_path: '',
        passport_id: '',
        passport_startdate: '',
        passport_enddate: '',
        passport_path: '',
        workpermit_id: '',
        workpermit_startdate: '',
        workpermit_enddate: '',
        workpermit_path: '',
        ninetydays_startdate: '',
        ninetydays_enddate: '',
        ninetydays_path: '',
    });

    const [openDialog, setOpenDialog] = useState<string | null>(null);
    const [fileFormData, setFileFormData] = useState<{ [key: string]: { title: string; file: File | null; startDate: string; endDate: string } }>({});
    const [dataOtherFiles, setDataOtherFiles] = useState<any[]>([])
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [profilePicture, setProfilePicture] = useState<File | null>(null);

    const handleChange = (event: SelectChangeEvent) => {
        setPerson({ ...person, [event.target.name]: event.target.value as string });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setProfilePicture(event.target.files[0]);
            setPerson({ ...person, pic_path: event.target.files[0].name })
        }
    };

    const handleCompany = (event: any, newValue: any) => {
        setPerson({ ...person, company: newValue });
    }

    const handleOpenDialog = (type: string) => {
        setOpenDialog(type);
    };

    const handleCloseDialog = () => {
        setOpenDialog(null);
    };

    const handleDialogSave = (type: string, data: { title: string; id: string | null; file: File | null; startDate: string; endDate: string }) => {
        setFileFormData((prevData) => ({
            ...prevData,
            [type]: data,
        }));
        setPerson((prevPerson) => ({
            ...prevPerson,
            [`${type.toLowerCase()}_id`]: data.id,
            [`${type.toLowerCase()}_startdate`]: data.startDate,
            [`${type.toLowerCase()}_enddate`]: data.endDate,
            [`${type.toLowerCase()}_path`]: data.file ? data.file.name : '',
        }));
    };

    const handleFilesDialogSave = (files: File[]) => {
        setUploadedFiles(files);
        const fileNames = files.map(file => file.name);
        setDataOtherFiles(fileNames);
    };

    const handleSubmit = async () => {
        console.log('File Picture', profilePicture)
        console.log('Data Employee', person);
        console.log('Document Employee:', fileFormData);
        console.log('Other File Employee:', uploadedFiles);
        console.log('Other File Name: ', dataOtherFiles)
        //Submit the combined fileFormData and uploadedFiles to the API here
        try {
            // Send the data to the API using Axios
            const response = await axios.post('http://localhost:3000/api/persons', { person, dataOtherFiles });
            console.log('API Response:', response.data);
            const personId = response.data.personId
            console.log('ID แรงงาน:', personId)
            if (personId) {
                const formData = new FormData();
                for (let key in fileFormData) {
                    const fileData = fileFormData[key];
                    if (fileData.file) {
                        formData.append('filePaths', fileData.file);
                        formData.append('outlanderNo', person.outlanderNo)
                        formData.append('personId', personId)
                        try {
                            const responseFiles = await axios.post(`http://localhost:5052/upload/persons/${fileData.title}`, formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            });
                            console.log('Files upload response:', responseFiles.data);
                        } catch (error) {
                            console.error('Files upload failed:', error);
                            // Handle file upload error
                        }
                        formData.delete("filePaths")
                        formData.delete("outlanderNo")
                        formData.delete('personId')
                    }
                }
                if (profilePicture || profilePicture !== null) {
                    const formData = new FormData()
                    formData.append('filePaths', profilePicture)
                    formData.append('outlanderNo', person.outlanderNo);
                    formData.append('personId', personId);
                    try {
                        const responseFiles = await axios.post(`http://localhost:5052/upload/persons/picpath`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        });
                        console.log('Files upload response:', responseFiles.data);
                    } catch (error) {
                        console.error('Files upload failed:', error);
                        // Handle file upload error
                    }
                    formData.delete("filePaths")
                    formData.delete("outlanderNo")
                    formData.delete('personId')
                }
                // Upload other files from uploadedFiles
                if (uploadedFiles.length > 0) {
                    const otherFilesFormData = new FormData();
                    uploadedFiles.forEach((file, index) => {
                        otherFilesFormData.append('files', file);
                    });
                    otherFilesFormData.append('outlanderNo', person.outlanderNo);
                    otherFilesFormData.append('personId', personId);

                    try {
                        const responseOtherFiles = await axios.post('http://localhost:5052/upload', otherFilesFormData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        });
                        console.log('Other files upload response:', responseOtherFiles.data);
                    } catch (error) {
                        console.error('Other files upload failed:', error);
                        // Handle file upload error
                    }
                }
            } else {
                console.log('Error:', response.data.error);
            }
        } catch (error) {
            console.error('API Request failed:', error);
        }
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

                                size="small"
                                sx={{ width: '100%', margin: 1 }}
                                value={person.firstname}
                                onChange={(e) => setPerson({ ...person, firstname: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="นามสกุล ภาษาอังกฤษ"
                                name='lastname'
                                variant="outlined"

                                size="small"
                                sx={{ width: '100%', margin: 1 }}
                                value={person.lastname}
                                onChange={(e) => setPerson({ ...person, lastname: e.target.value })}
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

                                    size="small"
                                    sx={{ width: '100%', margin: 1 }}
                                    value={person.firstnameth}
                                    onChange={(e) => setPerson({ ...person, firstnameth: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="นามสกุล ภาษาไทย"
                                    name='lastnameth'
                                    variant="outlined"

                                    size="small"
                                    sx={{ width: '100%', margin: 1 }}
                                    value={person.lastnameth}
                                    onChange={(e) => setPerson({ ...person, lastnameth: e.target.value })}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} marginLeft={0.05}>
                            <Grid item xs={2}>
                                <TextField
                                    label="ชื่อเล่น"
                                    name='nickname'
                                    variant="outlined"

                                    size="small"
                                    sx={{ width: '100%', margin: 1 }}
                                    value={person.nickname}
                                    onChange={(e) => setPerson({ ...person, nickname: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    label="สัญชาติ"
                                    name='nationality'
                                    variant="outlined"

                                    size="small"
                                    sx={{ width: '100%', margin: 1 }}
                                    value={person.nationality}
                                    onChange={(e) => setPerson({ ...person, nationality: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="หมายเลขรหัสต่างด้าว"
                                    name='outlanderNo'
                                    variant="outlined"

                                    size="small"
                                    sx={{ width: '100%', margin: 1 }}
                                    value={person.outlanderNo}
                                    onChange={(e) => setPerson({ ...person, outlanderNo: e.target.value })}
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
                                onChange={handleCompany}
                                renderInput={(params) => <TextField {...params} name="company" label="Company" />}
                            />
                        </Grid>
                    </Grid>

                    <Typography variant="h6" fontWeight={600} sx={{ ...FontStyle }}>ไฟล์เอกสารของแรงงาน</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={3}><Button variant="contained" onClick={() => handleOpenDialog('Visa')}>Visa</Button></Grid>
                        <Grid item xs={3}><Button variant="contained" onClick={() => handleOpenDialog('Passport')}>Passport</Button></Grid>
                        <Grid item xs={3}><Button variant="contained" onClick={() => handleOpenDialog('Workpermit')}>Work permit</Button></Grid>
                        <Grid item xs={3}><Button variant="contained" onClick={() => handleOpenDialog('ninetydays')}>ninetydays</Button></Grid>
                        <DialogComponent title="Visa" open={openDialog === 'Visa'} handleClose={handleCloseDialog} onSave={(data: any) => handleDialogSave('Visa', data)} />
                        <DialogComponent title="Passport" open={openDialog === 'Passport'} handleClose={handleCloseDialog} onSave={(data: any) => handleDialogSave('Passport', data)} />
                        <DialogComponent title="Work permit" open={openDialog === 'Workpermit'} handleClose={handleCloseDialog} onSave={(data: any) => handleDialogSave('Workpermit', data)} />
                        <DialogComponent title="ninetydays" open={openDialog === 'ninetydays'} handleClose={handleCloseDialog} onSave={(data: any) => handleDialogSave('ninetydays', data)} />
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
