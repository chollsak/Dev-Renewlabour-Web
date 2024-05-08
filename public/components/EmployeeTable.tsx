'use client';
import Chip from '@mui/joy/Chip';
import React, { useState } from 'react';
import { Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, MenuItem, Box, TablePagination, IconButton, Menu } from '@mui/material';
import { ArrowUpward, ArrowDownward, MoreVert as MoreVertIcon } from '@mui/icons-material';

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

const data: RowData[] = [
    { id: 1, name: 'John Doe', nickname: 'JD', province: 'California', visa: 435, passport: 1161, workpermit: 435, '90DaysDoc': -26 },
    { id: 2, name: 'Jane Smith', nickname: 'JS', province: 'New York', visa: 472, passport: 6, workpermit: 531, '90DaysDoc': 1 },
    { id: 3, name: 'Bob Johnson', nickname: 'BJ', province: 'Texas', visa: 138, passport: 5, workpermit: 138, '90DaysDoc': 52 },
    { id: 4, name: 'Alice Brown', nickname: 'AB', province: 'Florida', visa: 138, passport: 8, workpermit: 138, '90DaysDoc': 52 },
    { id: 5, name: 'Charlie White', nickname: 'CW', province: 'Washington', visa: 138, passport: 16, workpermit: 138, '90DaysDoc': 15 },
    { id: 6, name: 'ชลศักดิ์ อนุวารีพงษ์', nickname: 'ชล', province: 'กรุงเทพมหานคร', visa: 138, passport: 16, workpermit: 138, '90DaysDoc': 15 },
    { id: 7, name: 'ตุ้ยนุ้ย นอนหงาย', nickname: 'ตุ้ย', province: 'กรุงเทพมหานคร', visa: 1, passport: 5, workpermit: 4, '90DaysDoc': 6 },
    { id: 8, name: 'Elena Garcia', nickname: 'EG', province: 'California', visa: 235, passport: 761, workpermit: 235, '90DaysDoc': -26 },
    { id: 9, name: 'Michael Lee', nickname: 'ML', province: 'Texas', visa: 338, passport: 105, workpermit: 238, '90DaysDoc': 32 },
    { id: 10, name: 'Maria Rodriguez', nickname: 'MR', province: 'Florida', visa: 238, passport: 98, workpermit: 238, '90DaysDoc': 41 },
    { id: 11, name: 'David Martinez', nickname: 'DM', province: 'California', visa: 138, passport: 206, workpermit: 138, '90DaysDoc': 12 },
    { id: 12, name: 'Jennifer Nguyen', nickname: 'JN', province: 'New York', visa: 138, passport: 156, workpermit: 138, '90DaysDoc': 15 },
    { id: 13, name: 'Kevin Kim', nickname: 'KK', province: 'Washington', visa: 138, passport: 96, workpermit: 138, '90DaysDoc': 22 },
    { id: 14, name: 'Sophia Brown', nickname: 'SB', province: 'Texas', visa: 238, passport: 206, workpermit: 238, '90DaysDoc': 7 },
    { id: 15, name: 'Daniel Wang', nickname: 'DW', province: 'California', visa: 138, passport: 116, workpermit: 138, '90DaysDoc': 11 },
    { id: 16, name: 'Isabella Kim', nickname: 'IK', province: 'New York', visa: 238, passport: 156, workpermit: 238, '90DaysDoc': 14 },
    { id: 17, name: 'Alexander Li', nickname: 'AL', province: 'Washington', visa: 238, passport: 96, workpermit: 238, '90DaysDoc': 18 },
    { id: 18, name: 'Emily Smith', nickname: 'ES', province: 'Florida', visa: 138, passport: 206, workpermit: 138, '90DaysDoc': 12 },
    { id: 19, name: 'Matthew Johnson', nickname: 'MJ', province: 'California', visa: 138, passport: 116, workpermit: 138, '90DaysDoc': 19 },
    { id: 20, name: 'Olivia Martinez', nickname: 'OM', province: 'New York', visa: 138, passport: 156, workpermit: 138, '90DaysDoc': 17 },
    { id: 21, name: 'William Nguyen', nickname: 'WN', province: 'Texas', visa: 238, passport: 96, workpermit: 238, '90DaysDoc': 21 },
    { id: 22, name: 'Emma Kim', nickname: 'EK', province: 'Washington', visa: 238, passport: 116, workpermit: 238, '90DaysDoc': 16 },
    { id: 23, name: 'Noah Brown', nickname: 'NB', province: 'Florida', visa: 138, passport: 206, workpermit: 138, '90DaysDoc': 12 },
    { id: 24, name: 'Ava Smith', nickname: 'AS', province: 'California', visa: 138, passport: 116, workpermit: 138, '90DaysDoc': 18 },
    { id: 25, name: 'Liam Johnson', nickname: 'LJ', province: 'New York', visa: 138, passport: 156, workpermit: 138, '90DaysDoc': 13 },
    { id: 26, name: 'Charlotte Martinez', nickname: 'CM', province: 'Texas', visa: 238, passport: 96, workpermit: 238, '90DaysDoc': 19 },
    { id: 27, name: 'Mason Kim', nickname: 'MK', province: 'Washington', visa: 238, passport: 116, workpermit: 238, '90DaysDoc': 17 },
    { id: 28, name: 'Amelia Brown', nickname: 'AB', province: 'Florida', visa: 138, passport: 206, workpermit: 138, '90DaysDoc': 12 },
    { id: 29, name: 'James Smith', nickname: 'JS', province: 'California', visa: 138, passport: 116, workpermit: 138, '90DaysDoc': 14 },
    { id: 30, name: 'Grace Nguyen', nickname: 'GN', province: 'New York', visa: 138, passport: 156, workpermit: 138, '90DaysDoc': 15 },
    // Add more data here
];

const getStatus = (row: RowData) => {
    const values = [String(row.visa), String(row.passport), String(row.workpermit), String(row['90DaysDoc'])];
    const minValue = Math.min(...values.map(Number));

    if (minValue <= 0) {
        return 'หมดอายุ';
    } else if (minValue > 0 && minValue < 7) {
        return 'ต่ออายุด่วน';
    } else if (minValue >= 7 && minValue < 15) {
        return 'ใกล้หมดอายุ';
    } else {
        return 'ปกติ';
    }
};

const getChipColor = (value: number): string =>{
    if (value <= 0) {
        return 'neutral';
    } else if (value > 0 && value < 7) {
        return 'danger';
    } else if (value >= 7 && value < 15) {
        return 'warning';
    } else {
        return 'success';
    }

}

const isRed = (value: number): 'solid' | 'outlined' => {
    if ((value > 0 && value < 7) || value < 0) {
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
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.province.toLowerCase().includes(searchTerm.toLowerCase())
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

    const getText = (value: number) => {
        if (value <= 0){
            return 'หมดอายุมา'+" "+Math.abs(value)+' วัน';
        }else{
            return 'คงเหลือ '+value+' วัน';
        }
    }


    return (
        <Card sx={{ width: '100%', boxShadow: 3}}>
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
                        <TableHead sx={{ backgroundColor: '#0e74bc'}}>
                            <TableRow >
                                <TableCell sx={{ color: 'white', fontWeight: '600',...FontStyle }}>ชื่อจริง</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: '600',...FontStyle}}>ชื่อเล่น</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: '600',...FontStyle }}>จังหวัด</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: '600',...FontStyle }}>
                                    สถานะ
                                    <IconButton onClick={toggleSortDirection} size="small">
                                        {sortDirection === 'asc' ? <ArrowUpward /> : <ArrowDownward />}
                                    </IconButton>
                                </TableCell>
                                <TableCell align='inherit' sx={{ color: 'white', fontWeight: '600',...FontStyle}}>Visa</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: '600',...FontStyle }}>Passport</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: '600',...FontStyle }}>ใบอนุญาตทำงาน</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: '600' ,...FontStyle}}>เอกสาร 90 วัน</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: '600',...FontStyle }}>จัดการ</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                const status = getStatus(row);
                                const color = getColor(status);
                                return (
                                    <TableRow key={row.id}>
                                        {/* Other cells remain the same */}
                                        <TableCell sx={{ color: 'Black', fontWeight: '600',...FontStyle }}>{row.name}</TableCell>
                                        <TableCell sx={{ color: 'Black', fontWeight: '600',...FontStyle }}>{row.nickname}</TableCell>
                                        <TableCell sx={{ color: 'Black', fontWeight: '600',...FontStyle }}>{row.province}</TableCell>
                                        <TableCell sx={{ color: color, fontWeight: '600' ,...FontStyle}}>{status}</TableCell>
                                        {/* Other cells remain the same */}
                                        <TableCell sx={{ color: 'Black', fontWeight: '600',...FontStyle }}><Chip sx={FontStyle} variant={isRed(row.visa)} color={getChipColor(row.visa)}>{getText(row.visa)}</Chip></TableCell>
                                        <TableCell sx={{ color: 'Black', fontWeight: '600',...FontStyle }}><Chip sx={FontStyle} variant={isRed(row.passport)} color={getChipColor(row.passport)}>{getText(row.passport)}</Chip></TableCell>
                                        <TableCell sx={{ color: 'Black', fontWeight: '600' ,...FontStyle}}><Chip sx={FontStyle} variant={isRed(row.workpermit)} color={getChipColor(row.workpermit)}>{getText(row.workpermit)}</Chip></TableCell>
                                        <TableCell sx={{ color: 'Black', fontWeight: '600',...FontStyle }}><Chip sx={FontStyle} variant={isRed(row['90DaysDoc'])} color={getChipColor(row['90DaysDoc'])}>{getText(row['90DaysDoc'])}</Chip></TableCell>
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