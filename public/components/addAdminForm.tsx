'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Grid,
    Avatar,
    IconButton,
    Autocomplete,
    InputAdornment
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';
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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
                    text: response.data.message,
                    icon: 'error',
                    showConfirmButton: true,
                    allowOutsideClick: false,
                })
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                Swal.fire({
                    title: 'ล้มเหลว!',
                    text: error.response.data.message,
                    icon: 'error',
                    showConfirmButton: true,
                    allowOutsideClick: false,
                });
            } else {
                Swal.fire({
                    title: 'ล้มเหลว!',
                    text: 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ',
                    icon: 'error',
                    showConfirmButton: true,
                    allowOutsideClick: false,
                });
            }
        }
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box >
            <form onSubmit={handleSubmit}>
                <Box sx={{ m: 1, marginLeft: '30px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    accept="image/*"
                                    id="icon-button-file"
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="icon-button-file">
                                    <Avatar className='border-4 bg-gradient-to-r from-cyan-500 to-blue-500'
                                        sx={{
                                            marginRight: 2,
                                            width: '200px',
                                            height: '200px',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                cursor: 'pointer',
                                            },
                                        }}>
                                        {member.m_picpath ? (
                                            <Avatar src={URL.createObjectURL(profilePicture)} sx={{ width: 200, height: 200 }} alt="No Picture" />
                                        ) : (
                                            <PhotoCamera />
                                        )}
                                    </Avatar>
                                </label>
                            </Box>
                        </Grid>
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
                                renderInput={(params) => <TextField {...params} name="company" fullWidth size="small" label="บริษัท" />}
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
                    </Grid>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" className='rounded-full' color='success' sx={{ width: '20%', marginTop: 2 }} type="submit">Submit</Button>
                </Box>
            </form>
        </Box>
    );
};

export default AddAdmin;
