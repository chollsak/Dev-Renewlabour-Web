'use client';
import Chip from '@mui/joy/Chip';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, MenuItem, Box, TablePagination, IconButton, Menu } from '@mui/material';
import { ArrowUpward, ArrowDownward, MoreVert as MoreVertIcon } from '@mui/icons-material';
import axios from 'axios';
import moment from 'moment';

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

const getStatus = (row: any) => {
    const values = [
        row?.visa_enddate ? moment(row.visa_enddate, 'YYYY-MM-DD') : null,
        row?.passport_enddate ? moment(row.passport_enddate, 'YYYY-MM-DD') : null,
        row?.workpermit_enddate ? moment(row.workpermit_enddate, 'YYYY-MM-DD') : null,
        row?.ninetydays_enddate ? moment(row.ninetydays_enddate, 'YYYY-MM-DD') : null,
    ];
    // Filter out null values
    const validValues = values.filter(value => value !== null) as moment.Moment[];

    // Calculate minValue only if there are valid values
    const minValue = validValues.length > 0 ? moment.min(validValues) : null;
    const remainingDays = minValue ? minValue.diff(moment(), 'days') : null;

    console.log("Data: ", row.firstnameth, " Days: ", remainingDays)

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
        // Handle case when all dates are null
        return 'No date available';
    }
};

const getChipColor = (value: string) => {
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

const isRed = (value: string): 'solid' | 'outlined' => {
    const remainingDays = moment(value, 'YYYY-MM-DD').diff(moment(), 'days');

    if ((remainingDays > 0 && remainingDays < 7) || remainingDays < 0) {
        return 'solid';
    } else {
        return 'outlined';
    }
};

const getColor = (status: string) => {
    switch (status) {
        case 'หมดอายุ':
            return 'grey';
        case 'ต่ออายุด่วน':
            return 'red';
        case 'ใกล้หมดอายุ':
            return 'orange';
        case 'ปกติ':
            return 'green';
        default:
            return 'black';
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
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/persons');
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

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleView = (row: RowData) => {
        // Handle view action here
        console.log('View clicked:', row);
    };

    const handleEdit = (row: RowData) => {
        // Handle edit action here
        console.log('Edit clicked:', row);
    };

    const handleDelete = (row: RowData) => {
        // Handle delete action here
        console.log('Delete clicked:', row);
    };

    const getText = (value: string) => {

        const remainingDays = moment(value, 'YYYY-MM-DD').diff(moment(), 'days');
        if (!isNaN(remainingDays)) {
            if (remainingDays <= 0) {
                return 'หมดอายุมา' + " " + Math.abs(remainingDays) + ' วัน';
            } else {
                return 'คงเหลือ ' + remainingDays + ' วัน';
            }
        } else {
            // Handle case when value is not a valid date
            return 'No date available';
        }
    }


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
                            <TableRow >
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
                                const status = getStatus(row);
                                const color = getColor(status);
                                return (
                                    <TableRow key={row.person_id}>
                                        {/* Other cells remain the same */}
                                        <TableCell sx={{ color: 'Black', ...FontStyle }}>{row.firstnameth + ' ' + row.lastnameth}</TableCell>
                                        <TableCell sx={{ color: 'Black', ...FontStyle }}>{row.nickname}</TableCell>
                                        <TableCell sx={{ color: color, fontWeight: '600', ...FontStyle }}>{status}</TableCell>
                                        {/* Other cells remain the same */}
                                        <TableCell sx={{ color: 'Black', fontWeight: '600', ...FontStyle }}><Chip sx={FontStyle} variant={isRed(row.visa_enddate)} color={getChipColor(row.visa_enddate)}>{getText(row.visa_enddate)}</Chip></TableCell>
                                        <TableCell sx={{ color: 'Black', fontWeight: '600', ...FontStyle }}><Chip sx={FontStyle} variant={isRed(row.passport_enddate)} color={getChipColor(row.passport_enddate)}>{getText(row.passport_enddate)}</Chip></TableCell>
                                        <TableCell sx={{ color: 'Black', fontWeight: '600', ...FontStyle }}><Chip sx={FontStyle} variant={isRed(row.workpermit_enddate)} color={getChipColor(row.workpermit_enddate)}>{getText(row.workpermit_enddate)}</Chip></TableCell>
                                        <TableCell sx={{ color: 'Black', fontWeight: '600', ...FontStyle }}><Chip sx={FontStyle} variant={isRed(row.ninetydays_enddate)} color={getChipColor(row.ninetydays_enddate)}>{getText(row.ninetydays_enddate)}</Chip></TableCell>
                                        <TableCell>
                                            <IconButton
                                                aria-controls="actions-menu"
                                                aria-haspopup="true"
                                                aria-expanded={anchorEl ? 'true' : undefined}
                                                onClick={handleMenuOpen}
                                                size="small"
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                            <Menu
                                                id="actions-menu"
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl)}
                                                onClose={handleMenuClose}
                                            >
                                                <MenuItem onClick={() => handleView(row)} sx={FontStyle}>ดูเพิ่มเติม</MenuItem>
                                                <MenuItem onClick={() => handleEdit(row)} sx={FontStyle}>เเก้ไข</MenuItem>
                                                <MenuItem onClick={() => handleDelete(row)} sx={FontStyle}>ลบ</MenuItem>
                                            </Menu>
                                        </TableCell>
                                    </TableRow>
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