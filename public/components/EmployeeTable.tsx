'use client';
import Chip from '@mui/joy/Chip';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, MenuItem, Box, TablePagination, IconButton, Menu, Button } from '@mui/material';
import { ArrowUpward, ArrowDownward, MoreVert as MoreVertIcon } from '@mui/icons-material';
import axios from 'axios';
import moment from 'moment';
import TableRowAll from './TableRowAll';
import ExportButton from '@/components/exportexcelbutton';
import useMediaQuery from '@mui/material/useMediaQuery';

interface RowData {
    id: number;
    name: string;
    nickname: string;
    province: string;
    visa: number;
    passport: number;
    workpermit: number;
    '90DaysDoc': number;
}

const statuses = ['ทั้งหมด', 'ต่ออายุด่วน', 'ใกล้หมดอายุ', 'หมดอายุ', 'ปกติ'];

const convertBEtoCE = (value: string) => {
    const ceYear = parseInt(value.split('-')[0], 10) - 543;
    const restOfDate = value.slice(4);
    return `${ceYear}${restOfDate}`;
};

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

const getRemainingDays = (row: any) => {
    const values = [
        row?.visa_enddate ? moment(row.visa_enddate, 'YYYY-MM-DD') : null,
        row?.passport_enddate ? moment(row.passport_enddate, 'YYYY-MM-DD') : null,
        row?.workpermit_enddate ? moment(convertBEtoCE(row.workpermit_enddate), 'YYYY-MM-DD') : null,
        row?.ninetydays_enddate ? moment(row.ninetydays_enddate, 'YYYY-MM-DD') : null,
    ];
    const validValues = values.filter(value => value !== null) as moment.Moment[];
    const minValue = validValues.length > 0 ? moment.min(validValues) : null;
    const remainingDays = minValue ? minValue.diff(moment(), 'days') : null;

    return remainingDays !== null ? remainingDays : Infinity;
};

const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
};

const MyTable: React.FC = () => {
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('ทั้งหมด');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/persons`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatusFilter(event.target.value);
    };

    const filteredData = data.filter(item => {
        const status = getStatus(item);
        if (statusFilter !== 'ทั้งหมด' && status !== statusFilter) {
            return false;
        }
        if (
            item.firstnameth.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.nickname.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
            return true;
        }
        return false;
    });

    const sortedData = filteredData.slice().sort((a, b) => {
        const remainingDaysA = getRemainingDays(a);
        const remainingDaysB = getRemainingDays(b);

        return sortDirection === 'asc'
            ? remainingDaysA - remainingDaysB
            : remainingDaysB - remainingDaysA;
    });

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const toggleSortDirection = () => {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };

    return (
        <Card sx={{ width:'100%', boxShadow: 3 }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                    <TextField
                        label="ค้นหา"
                        variant="outlined"
                        value={searchTerm}
                        onChange={handleSearch}
                        size='small'
                        
                        sx={{ width: isSmallScreen ? '70%' : '15%' }}
                    />
                    <TextField
                        select
                        label="สถานะ"
                        variant="outlined"
                        value={statusFilter}
                        onChange={handleStatusChange}
                        size='small'
                        
                    >
                        {statuses.map(status => (
                            <MenuItem key={status} value={status} sx={FontStyle}>
                                {status}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
                <Box sx={{ my: 2, display: 'flex', justifyContent: 'end' }}>
                    <ExportButton />
                </Box>
                <TableContainer component={Paper}>
                    <Table >
                        <TableHead sx={{ backgroundColor: '#0e74bc', width:'200px' }}>
                            <TableRow className='bg-gradient-to-r from-cyan-500 to-blue-500'>
                                <TableCell sx={{ color: 'white', fontWeight: '600', fontSize: isSmallScreen ? '0.8rem' : '1rem', ...FontStyle }}>ชื่อจริง</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: '600', fontSize: isSmallScreen ? '0.8rem'  : '1rem', ...FontStyle }}>ชื่อเล่น</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: '600', fontSize: isSmallScreen ? '0.8rem'  : '1rem', ...FontStyle }}>
                                    สถานะ
                                    <IconButton onClick={toggleSortDirection} sx={{ color: 'white',display: isSmallScreen ? 'none' : 'inline-flex',}}>
                                        {sortDirection === 'asc' ? <ArrowUpward /> : <ArrowDownward />}
                                    </IconButton>
                                </TableCell>
                                <TableCell align='inherit' sx={{ color: 'white', fontWeight: '600', fontSize: isSmallScreen ? '0.57rem' : '1rem', ...FontStyle }}>Visa</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: '600', fontSize: isSmallScreen ? '0.8rem'  : '1rem', ...FontStyle }}>Passport</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: '600', fontSize: isSmallScreen ? '0.8rem'  : '1rem', ...FontStyle }}>ใบอนุญาตทำงาน</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: '600', fontSize: isSmallScreen ? '0.8rem'  : '1rem', ...FontStyle }}>เอกสาร 90 วัน</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: '600', fontSize: isSmallScreen ? '0.8rem'  : '1rem', ...FontStyle }}>จัดการ</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody
                            sx={{
                                fontSize: isSmallScreen ? '0.57rem' : '1rem',
                                ...FontStyle,
                            }}
                        >
                            {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                                <TableRowAll row={row} key={row.person_id} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={filteredData.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{ fontSize: isSmallScreen ?'0.57rem' : '1rem'}}
                />
            </CardContent>
        </Card>
    );
};

export default MyTable;
