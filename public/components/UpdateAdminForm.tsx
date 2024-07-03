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
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { uploadProfilePicture } from '@/core/axiosEmployee';
import Swal, { SweetAlertResult } from 'sweetalert2';
import MembersAvatar from '@/components/membersAvatar';

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

interface UserFormProps {
    members: any;
    params: any
}

const UpdateAdmin: React.FC<UserFormProps> = ({ members, params }) => {
    const [member, setMember] = useState<AdminData>({
        member_name: members[0].member_name,
        member_lastname: members[0].member_lastname,
        username: members[0].username,
        email: members[0].email,
        tel: members[0].tel,
        company: members[0].cpn_n,
        m_picpath: members[0].m_picpath,
        lineID: members[0].lineID,
    });

    console.log(member)

    const [profilePicture, setProfilePicture] = useState<File | null>(null);
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
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_API}/api/admin?memberId=${params.mem_id}`, { member });
            if (response.status === 200) {
                const uploadPicPath = await uploadProfilePicture(profilePicture, "members", params.mem_id, "picpath");

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
                            router.push(`/ViewAdmin/${params.mem_id}`);
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
        <Box sx={{ maxWidth: '60%' }}>
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
                                    <Avatar className='border-4 border-[#2074d4]'
                                        sx={{
                                            marginRight: 2,
                                            width: '200px',
                                            height: '200px',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                cursor: 'pointer',
                                            },
                                        }}>
                                        {profilePicture ? (
                                            <Avatar src={URL.createObjectURL(profilePicture)} sx={{ width: 200, height: 200 }} alt="No Picture" />
                                        ) : (
                                            <MembersAvatar mem_id={params.mem_id} m_picpath={member.m_picpath} />
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
                                value={member.member_name}
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
                                value={member.member_lastname}
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
                                value={member.username}
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
                                value={member.email}
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
                                value={member.tel}
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
                                value={member.company}
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
                                value={member.lineID}
                                required
                                size="small"
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Button variant="contained" color="primary" size="small" type='submit' sx={{ marginLeft: '30px', marginTop: '30px', ...FontStyle }}>
                    เพิ่ม
                </Button>
            </form>
        </Box>
    );
};

export default UpdateAdmin;
