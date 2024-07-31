'use client';
import Chip from '@mui/joy/Chip';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, MenuItem, Box, TablePagination, IconButton, Menu } from '@mui/material';
import { ArrowUpward, ArrowDownward, MoreVert as MoreVertIcon } from '@mui/icons-material';
import axios from 'axios';
import moment from 'moment';
import TableRowAll from './TableRowAll';

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
    // Convert B.E. year to C.E. year
    const ceYear = parseInt(value.split('-')[0], 10) - 543;
    const restOfDate = value.slice(4); // Extract the -MM-DD part
    return `${ceYear}${restOfDate}`;
};

const getStatus = (row: any) => {
    const values = [
        row?.visa_enddate ? moment(row.visa_enddate, 'YYYY-MM-DD') : null,
        row?.passport_enddate ? moment(row.passport_enddate, 'YYYY-MM-DD') : null,
        row?.workpermit_enddate ? moment(convertBEtoCE(row.workpermit_enddate), 'YYYY-MM-DD') : null,
        row?.ninetydays_enddate ? moment(row.ninetydays_enddate, 'YYYY-MM-DD') : null,
    ];
    // Filter out null values
    const validValues = values.filter(value => value !== null) as moment.Moment[];

    // Calculate minValue only if there are valid values
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
        // Handle case when all dates are null
        return 'No date available';
    }
};

const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
};

const MyTable: React.FC = () => {
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
    }, []); // Empty dependency array means this useEffect runs once on mount

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
        const statusA = getStatus(a); // Assuming getStatus correctly extracts the status
        const statusB = getStatus(b);

        // Get the index of each status from the predefined order
        const indexA = statuses.indexOf(statusA);
        const indexB = statuses.indexOf(statusB);

        // Determine sort direction
        if (sortDirection === 'asc') {
            return indexA - indexB;
        } else {
            return indexB - indexA;
        }
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
    console.log("sortedData", sortedData)

    return (
        <Card sx={{ width: '100%', boxShadow: 3 }}>
            <CardContent>
                {/* Search and filter components remain the same */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                    <TextField

                        label="ค้นหา"
                        variant="outlined"
                        value={searchTerm}
                        onChange={handleSearch}
                        size='small'
                        sx={{ width: '15%' }}
                    />
                    <TextField
                        select
                        label="สถานะ"
                        variant="outlined"
                        value={statusFilter}
                        onChange={handleStatusChange}
                        size='small'
                        sx={{ width: '10%' }}
                    >
                        {statuses.map(status => (
                            <MenuItem key={status} value={status} sx={FontStyle}>
                                {status}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>


                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#0e74bc' }}>
                            <TableRow className='bg-gradient-to-r from-cyan-500 to-blue-500' >
                                <TableCell sx={{ color: 'white', fontWeight: '600', ...FontStyle }}>ชื่อจริง</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: '600', ...FontStyle }}>ชื่อเล่น</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: '600', ...FontStyle }}>
                                    สถานะ
                                    <IconButton onClick={toggleSortDirection} size="small" sx={{ color: 'white' }}>
                                        {sortDirection === 'asc' ? <ArrowUpward /> : <ArrowDownward />}
                                    </IconButton>
                                </TableCell>
                                <TableCell align='inherit' sx={{ color: 'white', fontWeight: '600', ...FontStyle }}>Visa</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: '600', ...FontStyle }}>Passport</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: '600', ...FontStyle }}>ใบอนุญาตทำงาน</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: '600', ...FontStyle }}>เอกสาร 90 วัน</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: '600', ...FontStyle }}>จัดการ</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                return (
                                    <TableRowAll row={row} key={row.person_id} />
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination remains the same */}
                <TablePagination
                    component="div"
                    count={filteredData.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </CardContent>
        </Card>
    );
};

export default MyTable;