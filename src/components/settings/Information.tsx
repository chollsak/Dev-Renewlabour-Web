import React, { useEffect, useState } from 'react';
import { Autocomplete, Avatar, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { mockUserData, FontStyle } from './mockUserData';
import axios from 'axios';

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

    console.log(member)

    const handleCompany = (event: any, newValue: any) => {
        setMember({ ...member, company: newValue });
    }

    const handleFileChange = () => {

    }

    const handleResetFileChange = () => {

    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API}/api/updateMember`, member);
            alert('ข้อมูลถูกบันทึกเรียบร้อยแล้ว');
        } catch (error) {
            console.error('Error updating data:', error);
            alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='flex m-4'>
                    <Avatar sx={{ width: 150, height: 150 }} className='border-4 border-[#2074d4]' alt="Person Picture" src="https://media.licdn.com/dms/image/D4E03AQGPMRJkyA8GGg/profile-displayphoto-shrink_200_200/0/1698657454419?e=2147483647&v=beta&t=nFBkvYjCc-h0YKsEuTHzRSX-UZVY2ix512kHshTHUyE" />
                    <Stack spacing={1} className='m-6'>
                        <Typography variant="h6" fontWeight={600} sx={{ ...FontStyle, marginLeft: 2 }}>
                            Username: {mockUserData.username}
                        </Typography>
                        <div className='m-6'>
                            <Button variant='contained' className='mr-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500'>อัพโหลดรูปใหม่</Button>
                            <Button variant='contained' className='rounded-full bg-gradient-to-r from-cyan-500 to-blue-500'>รีเซ็ต</Button>
                        </div>
                        <div>อนุญาต JPG, GIF or PNG, Max size 800K</div>
                    </Stack>
                </div>
                <div className='flex flex-col'>
                    <div className='text-gray-500 mb-3'>ข้อมูลเบื้องต้น</div>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField name='member_name' size='small' label="ชื่อจริง" variant="outlined" fullWidth value={member.member_name} sx={{ marginBottom: '10px' }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField name='member_lastname' size='small' label="นามสกุล" fullWidth variant="outlined" value={member.member_lastname} sx={{ marginBottom: '10px' }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField name='email' size='small' label="Email" fullWidth variant="outlined" value={member.email} sx={{ marginBottom: '10px' }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField name='tel' size='small' label="เบอร์โทร" fullWidth variant="outlined" value={member.tel} sx={{ marginBottom: '10px' }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField name='lineID' size='small' label="LineID" fullWidth variant="outlined" value={member.lineID} sx={{ marginBottom: '10px' }} />
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
                    <Button variant="contained" className='rounded-full mt-3 bg-gradient-to-r from-cyan-500 to-blue-500' color="primary">
                        บันทึกข้อมูล
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AccountDetails;
