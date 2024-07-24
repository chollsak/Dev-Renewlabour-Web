import React, { FormEvent, useEffect, useState } from 'react';
import { Autocomplete, Avatar, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { FontStyle } from './mockUserData';
import axios from 'axios';
import MembersAvatar from '../membersAvatar';
import { uploadProfilePicture } from '@/core/axiosEmployee';
import Swal, { SweetAlertResult } from 'sweetalert2';

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
}

const AccountDetails: React.FC<UserFormProps> = ({ members }) => {

    const [data, setData] = useState<any[]>([])

    useEffect(() => {

        const fetchCompany = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/companyform`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCompany()
    }, []); // Empty dependency array means this useEffect runs once on mount

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
    const [profilePicture, setProfilePicture] = useState<File | null>(null);

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
    }

    const handleResetFileChange = () => {
        setProfilePicture(null)
        setMember({
            ...member,
            m_picpath: members[0].m_picpath,
        });
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_API}/api/information?memberId=${members[0].mem_id}&type=information`, { member });
            if (response.status === 200) {
                const uploadPicPath = await uploadProfilePicture(profilePicture, "members", members[0].mem_id, "picpath");

                if (uploadPicPath.status === 200 || !uploadPicPath || uploadPicPath.status === 400) {
                    Swal.fire({
                        title: 'สำเร็จ!',
                        text: 'แก้ไขข้อมูลผู้ใช้งานได้สำเร็จ!',
                        icon: 'success',
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 1000,
                    }).then((result: SweetAlertResult) => {
                        if (result.dismiss === Swal.DismissReason.timer) {
                            window.location.href = '/SettingPage'
                        }
                    });
                } else {
                    Swal.fire({
                        title: 'ล้มเหลว!',
                        text: "ล้มเหลวในการแก้ไขข้อมูลผู้ใช้งาน เรื่องไฟล์",
                        icon: 'error',
                        showConfirmButton: true,
                        allowOutsideClick: false,
                    })
                }
            } else {
                Swal.fire({
                    title: 'ล้มเหลว!',
                    text: "ล้มเหลวในการแก้ไขข้อมูลผู้ใช้งาน เรื่องข้อมูล",
                    icon: 'error',
                    showConfirmButton: true,
                    allowOutsideClick: false,
                })
            }
        } catch (error) {
            console.error('Error updating data:', error);
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
        <div>
            <form onSubmit={handleSubmit}>
                <div className='flex m-4'>
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
                            <MembersAvatar mem_id={members[0]?.mem_id} m_picpath={member.m_picpath} />
                        )}
                    </Avatar>
                    <Stack spacing={1} className='m-6'>
                        <Typography variant="h6" fontWeight={600} sx={{ ...FontStyle, marginLeft: 2 }}>
                            Username: {member.username}
                        </Typography>
                        <div className='m-6'>
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="upload-profile-picture"
                                onChange={handleFileChange}
                            />
                            <Button
                                variant='contained'
                                className='mr-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500'
                                onClick={() => document.getElementById('upload-profile-picture')?.click()}
                            >
                                อัพโหลดรูปใหม่
                            </Button>
                            <Button variant='contained' className='rounded-full bg-gradient-to-r from-cyan-500 to-blue-500' onClick={handleResetFileChange}>รีเซ็ต</Button>
                        </div>
                        <div>อนุญาต JPG, GIF or PNG, Max size 800K</div>
                    </Stack>
                </div>
                <div className='flex flex-col'>
                    <div className='text-gray-500 mb-3'>ข้อมูลเบื้องต้น</div>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField name='member_name' onChange={handleChange} size='small' label="ชื่อจริง" variant="outlined" fullWidth value={member.member_name} sx={{ marginBottom: '10px' }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField name='member_lastname' onChange={handleChange} size='small' label="นามสกุล" fullWidth variant="outlined" value={member.member_lastname} sx={{ marginBottom: '10px' }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField name='email' onChange={handleChange} size='small' label="Email" fullWidth variant="outlined" value={member.email} sx={{ marginBottom: '10px' }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField name='tel' onChange={handleChange} size='small' label="เบอร์โทร" fullWidth variant="outlined" value={member.tel} sx={{ marginBottom: '10px' }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField name='lineID' onChange={handleChange} size='small' label="LineID" fullWidth variant="outlined" value={member.lineID} sx={{ marginBottom: '10px' }} />
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={data.map((option) => option.cpn_n)}
                                onChange={handleCompany}
                                value={member.company}
                                renderInput={(params) => <TextField {...params} name="company" fullWidth size="small" label="Company" />}
                            />
                        </Grid>
                    </Grid>
                    <Button type='submit' variant="contained" className='rounded-full mt-3 bg-gradient-to-r from-cyan-500 to-blue-500' color="primary">
                        บันทึกข้อมูล
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AccountDetails;
