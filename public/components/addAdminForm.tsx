'use client';

import React, { useEffect, useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Grid,
    Avatar,
    IconButton,
    Autocomplete,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from 'axios';
import { uploadProfilePicture } from '@/core/axiosEmployee';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { useRouter } from 'next/navigation';

const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
};

interface AdminData {
    member_name: string;
    member_lastname: string;
    username: string;
    email: string;
    tel: string;
    company: string;
    m_picpath: string;
    lineID: string;
}

const AddAdmin: React.FC = () => {
    const [member, setMember] = useState<AdminData>({
        member_name: '',
        member_lastname: '',
        username: '',
        email: '',
        tel: '',
        company: '',
        m_picpath: '',
        lineID: '',
    });
    const [profilePicture, setProfilePicture] = useState<any>(null);
    const [data, setData] = useState<any[]>([])

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

    const router = useRouter(); // Use the useRouter hook

    const handleCompany = (event: any, newValue: any) => {
        setMember({ ...member, company: newValue });
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setMember({
            ...member,
            [name]: value,
        });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setProfilePicture(event.target.files[0])
            setMember({
                ...member,
                m_picpath: event.target.files[0].name,
            });
        }
    };

    const handleSubmit = async () => {
        try {
            // Send the data to the API using Axios
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/api/admin`, { member });
            const memberId = response.data.memberId
            if (response.status === 200 && memberId) {
                const uploadPicPath = await uploadProfilePicture(profilePicture, "members", memberId, "picpath");

                if (uploadPicPath.status === 200 || !uploadPicPath || uploadPicPath.status === 400) {
                    Swal.fire({
                        title: 'สำเร็จ!',
                        text: 'เพิ่มข้อมูลแรงงานได้สำเร็จ!',
                        icon: 'success',
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 1000,
                    }).then((result: SweetAlertResult) => {
                        if (result.dismiss === Swal.DismissReason.timer) {
                            router.push("/Admin");
                        }
                    });
                } else {
                    //ลบข้อมูล persons 
                    await axios.delete(`${process.env.NEXT_PUBLIC_API}/api/admin?memberId=${memberId}`)

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
        <Box sx={{ maxWidth: '60%' }}>
            <Box sx={{ m: 1, marginLeft: '30px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="member_name"
                            label="ชื่อจริง"
                            type="text"
                            onChange={handleChange}
                            fullWidth
                            required
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="member_lastname"
                            label="นามสกุล"
                            type="text"
                            onChange={handleChange}
                            fullWidth
                            required
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="username"
                            label="Username"
                            type="text"
                            onChange={handleChange}
                            fullWidth
                            required
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="email"
                            label="อีเมล"
                            type="email"
                            onChange={handleChange}
                            fullWidth
                            required
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="tel"
                            label="เบอร์โทรศัพท์"
                            type="tel"
                            onChange={handleChange}
                            fullWidth
                            required
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={data.map((option) => option.cpn_n)}
                            onChange={handleCompany}
                            renderInput={(params) => <TextField {...params} name="company" fullWidth size="small" label="Company" />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="lineID"
                            label="Line ID"
                            type="text"
                            onChange={handleChange}
                            fullWidth
                            required
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ marginRight: 2 }}>
                                {member.m_picpath ? (
                                    <Box component="img" src={URL.createObjectURL(profilePicture)} alt="Avatar" width="40" height="40" />
                                ) : (
                                    <PhotoCamera />
                                )}
                            </Avatar>
                            <input
                                accept="image/*"
                                id="icon-button-file"
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                            <label htmlFor="icon-button-file">
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Button variant="contained" color="primary" size="small" onClick={handleSubmit} sx={{ marginLeft: '30px', marginTop: '30px', ...FontStyle }}>
                เพิ่ม
            </Button>
        </Box>
    );
};

export default AddAdmin;
