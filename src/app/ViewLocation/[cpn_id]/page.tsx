'use client'
import React, { useEffect, useState } from 'react'
import Layout from '../../../../public/components/Layout'
import { Typography, IconButton, Card, CardContent, Avatar, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import PageLoader from '../../../../public/components/Loading/Loading2';
import LogosAvatar from '@/components/logosAvatar';

const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
};

export default function Home({
    params,
}: {
    params: { cpn_id: string; };
}) {

    const [company, setCompany] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/companies?companyId=${params.cpn_id}`);
                setCompany(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [params.cpn_id]);

    const router = useRouter();

    const handleEditClick = () => {
        router.push(`/UpdateLocation/${params.cpn_id}`);
    };

    return (
        <>
            {company.length === 0 ? (
                <PageLoader />
            ) : (
                <Layout>
                    <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h5" fontWeight={600} sx={{ ...FontStyle }} marginLeft={2}>รายละเอียดที่ทำงาน</Typography>
                        <IconButton color="primary" onClick={handleEditClick}>
                            <EditIcon />
                        </IconButton>
                    </div>
                    <div className=''>
                        <Card className='flex-wrap'>
                            <CardContent className='flex gap-5 flex-wrap'>
                                <div className='w-1/5 h-fit flex flex-col gap-2 text-center justify-center items-center border-r-2 p-1'>
                                    <LogosAvatar cpn_id={params.cpn_id} logo={company[0].logo} />
                                    <Box>
                                        <Typography variant='h6' sx={{ fontWeight: '600' }}>{company[0].cpn_n}</Typography>
                                    </Box>
                                </div>
                                <div className='grid grid-rows-2 grid-flow-col gap-1 ml-6'>
                                    <div className='flex flex-col'>
                                        <div className='text-gray-500'>ข้อมูลที่ทำงาน </div>
                                        <div className='flex space-x-10'>

                                            <div className='flex gap-2'>
                                                <Typography className='text-gray-600'>ชื่อ: </Typography>
                                                <Typography fontWeight={600}>{company[0].cpn_n}</Typography>
                                            </div>

                                            <div className='flex gap-2'>
                                                <Typography className='text-gray-600'>สาขา: </Typography>
                                                <Typography fontWeight={600}>{company[0].branch}</Typography>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='text-gray-500'>ข้อมูลที่อยู่</div>
                                        <div className='flex flex-wrap'>

                                            <div className='flex gap-2 mr-2'>
                                                <Typography className='text-gray-600'>อาคาร: </Typography>
                                                <Typography fontWeight={600}>{company[0].cpn_build}</Typography>
                                            </div>

                                            <div className='flex gap-2 mr-2'>
                                                <Typography className='text-gray-600'>ชั้น: </Typography>
                                                <Typography fontWeight={600}>{company[0].cpn_fl}</Typography>
                                            </div>

                                            <div className='flex gap-2 mr-2'>
                                                <Typography className='text-gray-600'>หมู่: </Typography>
                                                <Typography fontWeight={600}>{company[0].cpn_moo}</Typography>
                                            </div>

                                            <div className='flex gap-2 mr-2'>
                                                <Typography className='text-gray-600'>ซอย: </Typography>
                                                <Typography fontWeight={600}>{company[0].cpn_soi}</Typography>
                                            </div>

                                            <div className='flex gap-2 mr-2'>
                                                <Typography className='text-gray-600'>ตำบล: </Typography>
                                                <Typography fontWeight={600}>{company[0].cpn_subdist}</Typography>
                                            </div>

                                            <div className='flex gap-2 mr-2'>
                                                <Typography className='text-gray-600'>อำเภอ: </Typography>
                                                <Typography fontWeight={600}>{company[0].cpn_dist}</Typography>
                                            </div>

                                            <div className='flex gap-2 mr-2'>
                                                <Typography className='text-gray-600'>จังหวัด: </Typography>
                                                <Typography fontWeight={600}>{company[0].cpn_prov}</Typography>
                                            </div>

                                            <div className='flex gap-2 mr-2'>
                                                <Typography className='text-gray-600'>รหัสไปรษณีย์: </Typography>
                                                <Typography fontWeight={600}>{company[0].cpn_zip}</Typography>
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

