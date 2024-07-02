'use client';

import React, { FormEvent, useEffect, useState } from 'react';
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
import DialogComponent from './UpdateDialog';
import FilesOther from './FileOther';
import axios from 'axios'
import { uploadFileFormData, uploadOtherFiles, uploadProfilePicture } from '@/core/axiosEmployee';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { useRouter } from 'next/navigation';
import ButtonJoy from '@mui/joy/Button';
import moment from 'moment';

const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
};

interface UserFormProps {
    persons: any;
    fileOther: any;
    params: any
}

const UserForm: React.FC<UserFormProps> = ({ persons, fileOther, params }) => {

    const [data, setData] = useState<any[]>([])
    const router = useRouter(); // Use the useRouter hook

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/companyform`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this useEffect runs once on mount

    const [person, setPerson] = useState({
        prefix: persons[0]?.prefix,
        firstname: persons[0]?.firstname,
        lastname: persons[0]?.lastname,
        prefixth: persons[0]?.prefixth,
        firstnameth: persons[0]?.firstnameth,
        lastnameth: persons[0]?.lastnameth,
        nickname: persons[0]?.nickname,
        nationality: persons[0]?.nationality,
        outlanderNo: persons[0]?.outlanderNo,
        company: persons[0]?.cpn_n,
        pic_path: persons[0]?.picpath,
        visa_id: persons[0]?.visa_id,
        visa_startdate: persons[0]?.visa_startdate,
        visa_enddate: persons[0]?.visa_enddate,
        visa_path: persons[0]?.visa_path,
        passport_id: persons[0]?.passport_id,
        passport_startdate: persons[0]?.passport_startdate,
        passport_enddate: persons[0]?.passport_enddate,
        passport_path: persons[0]?.passport_path,
        workpermit_id: persons[0]?.workpermit_id,
        workpermit_startdate: persons[0]?.workpermit_startdate,
        workpermit_enddate: persons[0]?.workpermit_enddate,
        workpermit_path: persons[0]?.workpermit_path,
        ninetydays_startdate: persons[0]?.ninetydays_startdate,
        ninetydays_enddate: persons[0]?.ninetydays_enddate,
        ninetydays_path: persons[0]?.ninetydays_path,
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
        if (event.target.files && event.target.files) {
            setProfilePicture(event.target.files[0]);
            setPerson({ ...person, pic_path: event.target.files[0].name })
        }
    };

    const buttonColor = (value: string) => {
        const remainingDays = moment(value, 'YYYY-MM-DD').diff(moment(), 'days');
        if (remainingDays <= 0) {
            return 'neutral';
        } else if (remainingDays > 0 && remainingDays < 7) {
            return 'danger';
        } else if (remainingDays >= 7 && remainingDays < 15) {
            return 'warning';
        } else {
            return 'success';
        }
    }

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

    const personId = persons[0]?.person_id

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Send the data to the API using Axios
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_API}/api/persons?personId=${params.person_id}&outlanderNo=${decodeURIComponent(params.outlanderNo)}`, { person, dataOtherFiles });

            if (response.status === 200) {
                const uploadPicPath = await uploadProfilePicture(profilePicture, "persons", person.outlanderNo, "picpath");
                const uploadDocumentPath = await uploadFileFormData(fileFormData, person.outlanderNo);
                const uploadOtherPath = await uploadOtherFiles(uploadedFiles, person, personId);

                if ((uploadPicPath.status === 200 || !uploadPicPath || uploadPicPath.status === 400) && (uploadDocumentPath.status === 200 || uploadDocumentPath.status === 400 || !uploadDocumentPath) && (uploadOtherPath.status === 200 || uploadOtherPath.status === 400 || !uploadOtherPath)) {
                    Swal.fire({
                        title: 'สำเร็จ!',
                        text: 'เพิ่มข้อมูลแรงงานได้สำเร็จ!',
                        icon: 'success',
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 1000,
                    }).then((result: SweetAlertResult) => {
                        if (result.dismiss === Swal.DismissReason.timer) {
                            router.push(`/ViewEmployee/${params.person_id}/${decodeURIComponent(params.outlanderNo)}`);
                        }
                    });
                } else {
                    Swal.fire({
                        title: 'ล้มเหลว!',
                        text: "ล้มเหลวในการเพิ่มข้อมูลแรงงาน เรื่องไฟล์",
                        icon: 'error',
                        showConfirmButton: true,
                        allowOutsideClick: false,
                    })
                }
            } else {
                Swal.fire({
                    title: 'ล้มเหลว!',
                    text: "ล้มเหลวในการเพิ่มข้อมูลแรงงาน เรื่องข้อมูล",
                    icon: 'error',
                    showConfirmButton: true,
                    allowOutsideClick: false,
                })
            }
        } catch (error) {
            Swal.fire({
                title: 'ล้มเหลว!',
                text: "การเชื่อมต่อกับ Database ล้มเหลว",
                icon: 'error',
                showConfirmButton: true,
                allowOutsideClick: false,
            })
        }
    };

    return (
        <Card sx={{ width: '100%', boxShadow: 3 }}>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', justifyContent: 'left', marginBottom: 2, flexDirection: 'column' }}>
                        <Typography variant="h6" fontWeight={600} sx={{ ...FontStyle }}>รูปภาพแรงงาน</Typography>
                        <Grid container spacing={2} mb={2}>
                            <Grid item xs={12}>
                                <input type="file" accept="image/*" onChange={handleFileChange} />
                                {person.pic_path && (
                                    <Typography variant="body1" sx={{ ...FontStyle, marginTop: 1 }}>
                                        Uploaded file: {person.pic_path}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>

                        <Typography variant="h6" className='m-2 p-2' fontWeight={600} sx={{ ...FontStyle }}>ข้อมูลส่วนบุคคล</Typography>
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
                                        disabled
                                        sx={{ width: '100%', margin: 1 }}
                                        value={person.outlanderNo}
                                        onChange={(e) => setPerson({ ...person, outlanderNo: e.target.value })}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Typography variant="h6" className='m-2 p-2' fontWeight={600} sx={{ ...FontStyle }}>บริษัทที่แรงงานทำงาน</Typography>
                        <Grid container spacing={2} mb={2}>
                            <Grid item xs={12} md={4}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={data.map((option) => option.cpn_n)}
                                    sx={{ width: 300, height: "40px" }}
                                    value={person.company}
                                    onChange={handleCompany}
                                    renderInput={(params) => <TextField {...params} name="company" label="Company" />}
                                />
                            </Grid>
                        </Grid>

                        <Typography variant="h6" fontWeight={600} className='m-2 p-2' sx={{ ...FontStyle }}>ไฟล์เอกสารของแรงงาน</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={3}><ButtonJoy color={buttonColor(person.visa_enddate)} onClick={() => handleOpenDialog('Visa')}>Visa</ButtonJoy></Grid>
                            <Grid item xs={3}><ButtonJoy color={buttonColor(person.passport_enddate)} onClick={() => handleOpenDialog('Passport')}>Passport</ButtonJoy></Grid>
                            <Grid item xs={3}><ButtonJoy color={buttonColor(person.workpermit_enddate)} onClick={() => handleOpenDialog('Workpermit')}>Work permit</ButtonJoy></Grid>
                            <Grid item xs={3}><ButtonJoy color={buttonColor(person.ninetydays_enddate)} onClick={() => handleOpenDialog('ninetydays')}>ninetydays</ButtonJoy></Grid>
                            <DialogComponent title="Visa" open={openDialog === 'Visa'} handleClose={handleCloseDialog} onSave={(data: any) => handleDialogSave('Visa', data)} person={person} />
                            <DialogComponent title="Passport" open={openDialog === 'Passport'} handleClose={handleCloseDialog} onSave={(data: any) => handleDialogSave('Passport', data)} person={person} />
                            <DialogComponent title="Workpermit" open={openDialog === 'Workpermit'} handleClose={handleCloseDialog} onSave={(data: any) => handleDialogSave('Workpermit', data)} person={person} />
                            <DialogComponent title="ninetydays" open={openDialog === 'ninetydays'} handleClose={handleCloseDialog} onSave={(data: any) => handleDialogSave('ninetydays', data)} person={person} />
                        </Grid>

                        <Typography variant="h6" fontWeight={600} className='m-2 p-2' sx={{ ...FontStyle }}>อัปโหลดไฟล์เพิ่มเติม</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={3}><Button variant="contained" onClick={() => handleOpenDialog('Files')}>Upload Files</Button></Grid>
                            <FilesOther open={openDialog === 'Files'} handleClose={handleCloseDialog} onSave={handleFilesDialogSave} />
                        </Grid>
                    </Box>
                    <Button variant="contained" sx={{ width: '100%', marginTop: 2 }} type='submit'>Submit</Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default UserForm;
