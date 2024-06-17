'use client'
import React, { useEffect, useState } from 'react'
import Layout from '../../../../../public/components/Layout'
import axios from 'axios';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, Typography } from '@mui/material';
import PersonsAvatar from '../../../../../public/components/PersonsAvatar';

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

    const [persons, setPersons] = useState<any[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/persons?person_id=${params.person_id}&outlanderNo=${decodeURIComponent(params.outlanderNo)}`);
                setPersons(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [params.outlanderNo, params.person_id]); // Empty dependency array means this useEffect runs once on mount

    const [open, setOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<DataType | null>(null);

    const handleOpen = (data: any) => {
        setSelectedData(data);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
        // เพิ่มข้อมูลอื่นๆ ตามต้องการ
    ];

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
                    </div>

                    <div style={{ marginTop: "20px" }}>
                        <Grid container spacing={6}>
                            <Grid item xs={12} md={6}>
                                <Paper elevation={3}>
                                    <Box>
                                        <PersonsAvatar outlanderNo={persons[0].outlanderNo} picpath={persons[0].picpath} />
                                    </Box>
                                    <Box>
                                        <Typography>English Name : {persons[0].prefix + " " + persons[0].firstname + " " + persons[0].lastname}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography>ชื่อภาษาไทย : {persons[0].prefixth + " " + persons[0].firstnameth + " " + persons[0].lastnameth}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography>ชื่อเล่น : {persons[0].nickname}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography>เลขประจำตัว : {persons[0].outlanderNo}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography>สัญชาติ : {persons[0].nationality}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography>บริษัท : {persons[0].cpn_n}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography>สาขา : </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper>
                                    {data.map((item: any, index: any) => (
                                        item.type &&
                                        <Box key={index}>
                                            <Button color={item.color} variant='contained' onClick={() => handleOpen(item)}>
                                                {item.type.toUpperCase()}
                                            </Button>
                                            <Typography>Status</Typography>
                                        </Box>
                                    ))}
                                    <Dialog open={open} onClose={handleClose}>
                                        <DialogTitle>{selectedData?.type.toUpperCase()}</DialogTitle>
                                        <DialogContent>
                                            <Typography>ID: {selectedData?.id}</Typography>
                                            <Typography>Start Date: {selectedData?.startDate}</Typography>
                                            <Typography>End Date: {selectedData?.endDate}</Typography>
                                            <Typography>Path: {selectedData?.path}</Typography>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose}>Close</Button>
                                        </DialogActions>
                                    </Dialog>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                </Layout>
            )}
        </>
    )
}
