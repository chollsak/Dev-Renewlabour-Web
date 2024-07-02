'use client'
import React, { useEffect, useState } from 'react'
import Layout from '../../../../public/components/Layout'
import { Typography, IconButton, Card, CardContent, Avatar, Box, Chip, Dialog, DialogTitle, DialogContent, Button, DialogActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import PageLoader from '../../../../public/components/Loading/Loading2';


const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
};

export default function Home({
    params,
}: {
    params: { mem_id: string; };
}) {

    const [member, setMember] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/admin?memberId=${params.mem_id}`);
                setMember(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [params.mem_id]);

    const router = useRouter();

    const handleEditClick = () => {
        router.push(`/UpdateAdmin/${params.mem_id}`);
    };

    return (
        <>
            {member.length === 0 ? (
                <PageLoader />
            ) : (
                <Layout>
                    <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h5" fontWeight={600} sx={{ ...FontStyle }} marginLeft={2}>รายละเอียดสมาชิก</Typography>
                        <IconButton color="primary" onClick={handleEditClick}>
                            <EditIcon />
                        </IconButton>
                    </div>
                    <div className=''>
                        <Card className='flex-wrap'>
                            <CardContent className='flex gap-5 flex-wrap'>
                                <div className='w-1/5 h-fit flex flex-col gap-2 text-center justify-center items-center border-r-2 p-1'>
                                    <Avatar sx={{ width: 150, height: 150 }} className='border-4 border-[#2074d4]' alt="Person Picture" src={`${process.env.NEXT_PUBLIC_FILE_API}/file/members/${params.mem_id}/picpath/${member[0].m_picpath}`} />
                                    <Box>
                                        <Typography variant='h6' sx={{ fontWeight: '600' }}>{member[0].member_name} {member[0].member_lastname}</Typography>
                                    </Box>
                                </div>
                                <div className='grid grid-rows-1 grid-flow-col gap-1 ml-6'>
                                    <div className='flex flex-row justify-center items-center'>
                                        <div className='flex flex-col'>
                                            <div className='text-gray-500'>ข้อมูลเบื้องต้น </div>
                                            <div className='flex space-x-10'>
                                                <div className='flex gap-2'>
                                                    <Typography className='text-gray-600'>Username: </Typography>
                                                    <Typography fontWeight={600}>{member[0].username}</Typography>
                                                </div>

                                                <div className='flex gap-2'>
                                                    <Typography className='text-gray-600'>Email: </Typography>
                                                    <Typography fontWeight={600}>{member[0].email}</Typography>
                                                </div>

                                                <div className='flex gap-2'>
                                                    <Typography className='text-gray-600'>เบอร์โทร: </Typography>
                                                    <Typography fontWeight={600}>{member[0].tel}</Typography>
                                                </div>

                                                <div className='flex gap-2'>
                                                    <Typography className='text-gray-600'>Line ID: </Typography>
                                                    <Typography fontWeight={600}>{member[0].lineID}</Typography>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </Layout>
            )}
        </>
    )
}
