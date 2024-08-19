'use client'
import React, { useEffect, useState } from 'react';
import Layout from '../../../../../public/components/Layout';
import axios from 'axios';
import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PersonsAvatar from '@/components/personsAvatar';
import moment from 'moment';
import Chip from '@mui/joy/Chip';
import ButtonJoy from '@mui/joy/Button';
import { useRouter } from 'next/navigation';
import PageLoader from '../../../../../public/components/Loading/Loading2';

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
            row?.workpermit_enddate ? moment(convertBEtoCE(row.workpermit_enddate), 'YYYY-MM-DD') : null,
            row?.ninetydays_enddate ? moment(row.ninetydays_enddate, 'YYYY-MM-DD') : null,
        ];
        const validValues = values.filter(value => value !== null) as moment.Moment[];

        const minValue = validValues.length > 0 ? moment.min(validValues) : null;
        const remainingDays = minValue ? minValue.diff(moment(), 'days') : null;

        if (remainingDays !== null) {
            if (remainingDays <= 0) {
                return 'หมดอายุ';
            } else if (remainingDays > 0 && remainingDays <= 31) {
                return 'ต่ออายุด่วน';
            } else if (remainingDays > 31 && remainingDays <= 61) {
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

    const convertBEtoCE = (value: string) => {
        // Convert B.E. year to C.E. year
        const ceYear = parseInt(value.split('-')[0], 10) - 543;
        const restOfDate = value.slice(4); // Extract the -MM-DD part
        return `${ceYear}${restOfDate}`;
    };

    const buttonColor = (value: string) => {
        const remainingDays = moment(value, 'YYYY-MM-DD').diff(moment(), 'days');
        if (remainingDays <= 0) {
            return 'neutral';
        } else if (remainingDays > 0 && remainingDays <= 31) {
            return 'danger';
        } else if (remainingDays > 31 && remainingDays <= 61) {
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

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            {persons.length === 0 ? (
                <PageLoader />
            ) : (
                <Layout>
                    <div style={{ marginBottom: '20px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between' }}>
                        <Typography variant="h5" fontWeight={600} sx={{ ...FontStyle, textAlign: isMobile ? 'center' : 'left' }} marginLeft={isMobile ? 0 : 2}>
                            รายละเอียดเเรงงาน
                        </Typography>
                        <IconButton color="primary" onClick={handleEditClick} sx={{ alignSelf: isMobile ? 'center' : 'flex-start' }}>
                            <EditIcon />
                        </IconButton>
                    </div>
                    <div>
                        <Card className='flex-wrap'>
                            <CardContent className='flex flex-col gap-4 p-4'>
                                <div className={`flex ${isMobile ? 'flex-col items-center' : 'flex-row items-start'}`}>
                                    <div className='w-full sm:w-1/5 h-fit flex flex-col gap-2 text-center justify-center items-center border-r-2 p-1'>
                                        <PersonsAvatar outlanderNo={persons[0].outlanderNo} picpath={persons[0].picpath} />
                                        <Box>
                                            <Typography variant='h6' sx={{ fontWeight: '600' }}>{persons[0].firstname + " " + persons[0].lastname}</Typography>
                                            <Typography sx={{ color: 'gray' }}>{persons[0].firstnameth + " " + persons[0].lastnameth}</Typography>
                                        </Box>
                                        <Chip sx={{ ...FontStyle, fontSize: isMobile ? '14px' : '16px' }} variant='solid' color={color} className="p-2">
                                            {status}
                                        </Chip>
                                    </div>
                                    <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-4 ml-0 sm:ml-6 mt-4 sm:mt-0`}>
                                        <div className='flex flex-col'>
                                            <div className='text-gray-500'>ข้อมูลส่วนตัวเเรงงาน</div>
                                            <div className='flex flex-col gap-2'>
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
                                            <div className='flex flex-col gap-2'>
                                                <div className='flex gap-2'>
                                                    <Typography className='text-gray-600'>บริษัท: </Typography>
                                                    <a href='#'> <Typography color={'primary'} fontWeight={600}>{persons[0].cpn_n}</Typography></a>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <Typography className='text-gray-600'>สาขา: </Typography>
                                                    <Typography fontWeight={600}>{persons[0].branch}</Typography>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <Typography className='text-gray-600'>จังหวัด: </Typography>
                                                    <Typography fontWeight={600}>{persons[0].cpn_prov}</Typography>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-col'>
                                            <div className='text-gray-500 mb-1'>ตรวจสอบ</div>
                                            <div className='flex flex-col gap-2'>
                                                {data.map((item: any, index: any) => (
                                                    item.type &&
                                                    <Box key={index} mb={2}>
                                                        <ButtonJoy className='rounded-md' color={item.type === 'workpermit' ? buttonColor(convertBEtoCE(item.endDate)) : buttonColor(item.endDate)} onClick={() => handleOpen(item)}>
                                                            {item.type === 'ninetydays' ? '90 วัน' : item.type === 'workpermit' ? 'Work Permit' : item.type.toUpperCase()}
                                                        </ButtonJoy>
                                                    </Box>
                                                ))}
                                                <Dialog open={open} onClose={handleClose}>
                                                    <DialogTitle>{selectedData?.type.toUpperCase()}</DialogTitle>
                                                    <DialogContent>
                                                        <Typography>ID: {selectedData?.id}</Typography>
                                                        <Typography>Start Date: {moment(selectedData?.startDate).format('LL')}</Typography>
                                                        <Typography>End Date: {moment(selectedData?.endDate).format('LL')}</Typography>
                                                        <Button variant="contained" color="primary"
                                                            href={`${process.env.NEXT_PUBLIC_FILE_API}/download/persons/${persons[0].outlanderNo}/${selectedData?.type.toLowerCase()}/${selectedData?.path}`}
                                                            download
                                                            target="_blank"
                                                            rel="noopener noreferrer">
                                                            {"Download " + selectedData?.type.toUpperCase()}
                                                        </Button>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={handleClose}>Close</Button>
                                                    </DialogActions>
                                                </Dialog>
                                                {fileOther.length === 0 ? <></> : (
                                                    <Box>
                                                        <Box>
                                                            <ButtonJoy color='primary' onClick={() => handleOpenOtherFile()}>Other File</ButtonJoy>
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
