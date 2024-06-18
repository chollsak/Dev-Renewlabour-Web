'use client'
import React, { useEffect, useState } from 'react';
import Layout from '../../../../../public/components/Layout';
import axios from 'axios';
import { Avatar, Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Paper, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PersonsAvatar from '../../../../../public/components/PersonsAvatar';
import moment from 'moment';
import Chip from '@mui/joy/Chip';
import ButtonJoy from '@mui/joy/Button';
import { useRouter } from 'next/navigation';

const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
};

interface DataType {
    type: string;
    id: string;
    startDate: string;
    endDate: string;
    path: string;
}

export default function Home({
    params,
}: {
    params: { person_id: string; outlanderNo: string };
}) {

    const [persons, setPersons] = useState<any[]>([]);
    const [fileOther, setFileOther] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/persons?person_id=${params.person_id}&outlanderNo=${decodeURIComponent(params.outlanderNo)}`);
                setPersons(response.data.persons);
                setFileOther(response.data.fileOther);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [params.outlanderNo, params.person_id]);

    const [open, setOpen] = useState(false);
    const [openFile, setOpenFile] = useState(false);
    const [selectedData, setSelectedData] = useState<DataType | null>(null);

    const handleOpen = (data: any) => {
        setSelectedData(data);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenOtherFile = () => {
        setOpenFile(true);
    }

    const handleCloseOtherFile = () => {
        setOpenFile(false);
    }

    const data = [
        {
            type: persons[0]?.visa_path ? 'visa' : '',
            id: persons[0]?.visa_id,
            startDate: persons[0]?.visa_startdate,
            endDate: persons[0]?.visa_enddate,
            path: persons[0]?.visa_path,
            color: 'primary',
        },
        {
            type: persons[0]?.passport_path ? 'passport' : '',
            id: persons[0]?.passport_id,
            startDate: persons[0]?.passport_startdate,
            endDate: persons[0]?.passport_enddate,
            path: persons[0]?.passport_path,
            color: 'error',
        },
        {
            type: persons[0]?.workpermit_path ? 'workpermit' : '',
            id: persons[0]?.workpermit_id,
            startDate: persons[0]?.workpermit_startdate,
            endDate: persons[0]?.workpermit_enddate,
            path: persons[0]?.workpermit_path,
            color: 'success',
        },
        {
            type: persons[0]?.ninetydays_path ? 'ninetydays' : '',
            startDate: persons[0]?.ninetydays_startdate,
            endDate: persons[0]?.ninetydays_enddate,
            path: persons[0]?.ninetydays_path,
            color: 'warning',
        },
    ];

    const getStatus = (row: any) => {
        const values = [
            row?.visa_enddate ? moment(row.visa_enddate, 'YYYY-MM-DD') : null,
            row?.passport_enddate ? moment(row.passport_enddate, 'YYYY-MM-DD') : null,
            row?.workpermit_enddate ? moment(row.workpermit_enddate, 'YYYY-MM-DD') : null,
            row?.ninetydays_enddate ? moment(row.ninetydays_enddate, 'YYYY-MM-DD') : null,
        ];
        const validValues = values.filter(value => value !== null) as moment.Moment[];

        const minValue = validValues.length > 0 ? moment.min(validValues) : null;
        const remainingDays = minValue ? minValue.diff(moment(), 'days') : null;

        if (remainingDays !== null) {
            if (remainingDays <= 0) {
                return 'หมดอายุ';
            } else if (remainingDays > 0 && remainingDays < 7) {
                return 'ต่ออายุด่วน';
            } else if (remainingDays >= 7 && remainingDays < 15) {
                return 'ใกล้หมดอายุ';
            } else {
                return 'ปกติ';
            }
        } else {
            return 'No date available';
        }
    };

    const getColor = (status: string) => {
        switch (status) {
            case 'หมดอายุ':
                return 'neutral';
            case 'ต่ออายุด่วน':
                return 'danger';
            case 'ใกล้หมดอายุ':
                return 'warning';
            case 'ปกติ':
                return 'success';
            default:
                return 'neutral';
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

    const status = getStatus(persons[0]);
    const color = getColor(status);

    const router = useRouter();

    const handleEditClick = () => {
        router.push(`/UpdateEmployee/${params.person_id}/${params.outlanderNo}`);
    };

    return (
        <>
            {persons.length === 0 ? (
                <div>
                    Downloading Data...
                </div>
            ) : (
                <Layout>

                    <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h5" fontWeight={600} sx={{ ...FontStyle }} marginLeft={2}>รายละเอียดเเรงงาน</Typography>
                        <IconButton color="primary" onClick={handleEditClick}>
                            <EditIcon />
                        </IconButton>
                    </div>

                <div className=''>
                    <Card className='flex-wrap'>
                    <CardContent className='flex gap-5 flex-wrap'>
                        <div className='w-1/5 h-fit flex flex-col gap-2 text-center justify-center items-center border-r-2 p-1'>
                            <Avatar sx={{ width: 150, height: 150 }} className='border-4 border-[#2074d4]' alt="Person Picture" src="https://resource.nationtv.tv/uploads/images/contents/w1024/2023/08/SNbgVb6IR2MmIm76Nupj.webp?x-image-process=style/lg-webp" />
                            <Box>
                                <Typography variant='h6' sx={{fontWeight:'600'}}>{persons[0].firstname + " " + persons[0].lastname}</Typography>
                                <Typography sx={{color:'gray'}}>{ persons[0].firstnameth + " " + persons[0].lastnameth}</Typography>
                            </Box>
                            <Chip sx={FontStyle} variant='solid' color={color} className="p-2">
                                                {status}
                            </Chip>
                        </div>
                        
                        <div className='grid grid-rows-3 grid-flow-col gap-1 ml-6'>
                            <div className='flex flex-col'>
                                <div className='text-gray-500'>ข้อมูลส่วนตัวเเรงงาน</div>
                                <div className='flex space-x-10'>

                                    <div className='flex gap-2'>
                                        <Typography className='text-gray-600'>คำนำหน้า: </Typography>
                                        <Typography fontWeight={600}>{persons[0].prefixth}/{persons[0].prefix}</Typography>
                                    </div>

                                    <div className='flex gap-2'>
                                        <Typography className='text-gray-600'>ชื่อเล่น: </Typography>
                                        <Typography fontWeight={600}>{persons[0].nickname}</Typography>
                                    </div>

                                    <div className='flex gap-2'>
                                        <Typography className='text-gray-600'>เลขประจำตัว: </Typography>
                                        <Typography fontWeight={600}>{persons[0].outlanderNo}</Typography>
                                    </div>
                                    
                                    <div className='flex gap-2'>
                                        <Typography className='text-gray-600'>สัญชาติ: </Typography>
                                        <Typography fontWeight={600}>{persons[0].nationality}</Typography>
                                    </div>

                                </div>
                            </div>

                            <div className='flex flex-col'>
                                <div className='text-gray-500' >ข้อมูลที่ทำงานเบื้องต้น</div>
                                <div className='flex space-x-10'>
                                    <div className='flex gap-2'>
                                        <Typography className='text-gray-600'>บริษัท: </Typography>
                                        <a href='#'> <Typography color={'primary'}  fontWeight={600}>{persons[0].cpn_n}</Typography></a> 
                                    </div>

                                    <div className='flex gap-2'>
                                        <Typography className='text-gray-600'>สาขา: </Typography>
                                        <Typography fontWeight={600}>มาใส่ให้ด้วยครับ</Typography>
                                    </div>
                                    
                                    <div className='flex gap-2'>
                                        <Typography className='text-gray-600'>จังหวัด: </Typography>
                                        <Typography fontWeight={600}>มาใส่ด้วยครับ</Typography>
                                    </div>

                                </div>
                            </div>

                            <div className='flex flex-col'>
                                <div className='text-gray-500 mb-1'>ตรวจสอบ</div>
                                <div className='flex space-x-10'>
                                {data.map((item: any, index: any) => (
                                        item.type &&
                                        <Box key={index} mb={2}>
                                            <ButtonJoy className='rounded-md' color={buttonColor(item.endDate)} onClick={() => handleOpen(item)}>
                                                {item.type.toUpperCase()}
                                            </ButtonJoy>
                                        </Box>
                                    ))}
                                    <Dialog open={open} onClose={handleClose}>
                                        <DialogTitle>{selectedData?.type.toUpperCase()}</DialogTitle>
                                        <DialogContent>
                                            <Typography>ID: {selectedData?.id}</Typography>
                                            <Typography>Start Date: {selectedData?.startDate}</Typography>
                                            <Typography>End Date: {selectedData?.endDate}</Typography>
                                            <Typography>Path: {selectedData?.path}</Typography>
                                            <Button variant="contained" color="primary"
                                                href={`${process.env.NEXT_PUBLIC_FILE_API}/download/persons/${persons[0].outlanderNo}/${selectedData?.type.toLowerCase()}/${selectedData?.path}`}
                                                download
                                                target="_blank"
                                                rel="noopener noreferrer">
                                                {selectedData?.path}
                                            </Button>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose}>Close</Button>
                                        </DialogActions>
                                    </Dialog>
                                    {fileOther.length === 0 ? <></> : (
                                        <Box>
                                            <Box >
                                                <ButtonJoy color='primary'  onClick={() => handleOpenOtherFile()}>Other File</ButtonJoy>
                                            </Box>
                                            <Dialog open={openFile} onClose={handleCloseOtherFile}>
                                                <DialogTitle>ไฟล์อื่นๆ ทั้งหมด</DialogTitle>
                                                <DialogContent>
                                                    {fileOther.map((item: any, index: any) => (
                                                        <Box key={index} mb={2}>
                                                            <Button variant="contained" color="primary"
                                                                href={`${process.env.NEXT_PUBLIC_FILE_API}/download/persons/${persons[0].outlanderNo}/otherfile/${item?.fileo_path}`}
                                                                download
                                                                target="_blank"
                                                                rel="noopener noreferrer">
                                                                {item?.fileo_path}
                                                            </Button>
                                                        </Box>
                                                    ))}
                                                </DialogContent>
                                            </Dialog>
                                        </Box>
                                    )}

                                </div>
                            </div>


                        </div>
                    </CardContent>
                </Card>
                </div>

    
                </Layout>
            )}
        </>
    );
}
