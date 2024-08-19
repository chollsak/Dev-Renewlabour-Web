'use client'
import React, { useEffect, useState } from 'react';
import Layout from '../../../../public/components/Layout';
import { Typography, IconButton, Card, CardContent, Box, useMediaQuery, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import PageLoader from '../../../../public/components/Loading/Loading2';
import MembersAvatar from '@/components/membersAvatar';

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

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            {member.length === 0 ? (
                <PageLoader />
            ) : (
                <Layout>
                    <div style={{ marginBottom: '20px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'center' : 'flex-start' }}>
                        <Typography variant="h5" fontWeight={600} sx={{ ...FontStyle, textAlign: isMobile ? 'center' : 'left' }} marginLeft={isMobile ? 0 : 2}>
                            รายละเอียดสมาชิก
                        </Typography>
                        <IconButton color="primary" onClick={handleEditClick} sx={{ alignSelf: isMobile ? 'center' : 'flex-start' }}>
                            <EditIcon />
                        </IconButton>
                    </div>
                    <div>
                        <Card className={`flex ${isMobile ? 'flex-col' : 'flex-wrap'}`}>
                            <CardContent className={`flex ${isMobile ? 'flex-col' : 'gap-5 flex-wrap'}`}>
                                <div className={`w-full ${isMobile ? 'text-center' : 'w-1/5'} h-fit flex flex-col gap-2 justify-center items-center border-r-2 p-1`}>
                                    <MembersAvatar mem_id={params.mem_id} m_picpath={member[0].m_picpath} />
                                    <Box>
                                        <Typography variant='h6' sx={{ fontWeight: '600' }}>{member[0].member_name} {member[0].member_lastname}</Typography>
                                    </Box>
                                </div>
                                <div className={`flex ${isMobile ? 'flex-col' : 'grid grid-rows-1 grid-flow-col gap-1 ml-6'}`}>
                                    <div className='flex flex-col'>
                                        <div className='text-gray-500 mb-1'>ข้อมูลเบื้องต้น</div>
                                        <div className={`flex ${isMobile ? 'flex-col' : 'space-x-10'}`}>
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
                            </CardContent>
                        </Card>
                    </div>
                    <div className='w-60 h-80' style={{
          display: isMobile ? 'block' : 'none'
        }}>
          {/* Display bugs empty div */}
        </div>
                </Layout>
            )}
        </>
    );
}
