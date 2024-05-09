'use client';
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton, Menu, MenuItem, TablePagination } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
};

interface RowData {
    id: string;
    name: string;
    nickname: string;
    company: string;
    brance: string;
    province: string;
}

const data: RowData[] = [
    { id: '65010195', name: 'นาย สมชาย ใจดี', nickname: 'สมชาย', company: 'บริษัท สมชาย จำกัด', brance: 'สำนักงานใหญ่', province: 'กรุงเทพมหานคร' },
    { id: '65010196', name: 'นาย สมหญิง ใจดี', nickname: 'สมหญิง', company: 'บริษัท สมชาย จำกัด', brance: 'สาขา 1', province: 'กรุงเทพมหานคร' },
    { id: '65010197', name: 'นาย สมฤดี ใจร้าย', nickname: 'สมฤดี', company: 'บริษัท สมชาย จำกัด', brance: 'สาขา 2', province: 'กรุงเทพมหานคร' },
    { id: '65010198', name: 'นาย สมหมาย ใจดี', nickname: 'สมหมาย', company: 'บริษัท สมชาย จำกัด', brance: 'สาขา 3', province: 'กรุงเทพมหานคร' },
    { id: '65010199', name: 'นาย สมหมู ใจดี', nickname: 'สมหมู', company: 'บริษัท สมชาย จำกัด', brance: 'สาขา 4', province: 'กรุงเทพมหานคร' },
    { id: '65010200', name: 'นาย สมหมา ใจดี', nickname: 'สมหมา', company: 'บริษัท สมชาย จำกัด', brance: 'สาขา 5', province: 'กรุงเทพมหานคร' },
    { id: '65010201', name: 'Cristiano Ronaldo', nickname: 'CR7', company: 'Juventus', brance: 'Forward', province: 'Italy' },
    { id: '65010202', name: 'Lionel Messi', nickname: 'Leo', company: 'Paris Saint-Germain', brance: 'Forward', province: 'France' },
    { id: '65010203', name: 'Neymar Jr.', nickname: 'Ney', company: 'Paris Saint-Germain', brance: 'Forward', province: 'France' },
    { id: '65010204', name: 'Kylian Mbappé', nickname: 'Kyky', company: 'Paris Saint-Germain', brance: 'Forward', province: 'France' },
    { id: '65010205', name: 'Mohamed Salah', nickname: 'Mo', company: 'Liverpool', brance: 'Forward', province: 'England'},
    { id: '65010206', name: 'Kevin De Bruyne', nickname: 'KDB', company: 'Manchester City', brance: 'Midfielder', province: 'England' },
    { id: '65010207', name: 'Marcus Rashford', nickname: 'Rashy', company: 'Manchester United', brance: 'Forward', province: 'England' },
];

const DataTable: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = data.filter(row =>
        row.name.includes(searchTerm) ||
        row.nickname.includes(searchTerm) ||
        row.company.includes(searchTerm) ||
        row.brance.includes(searchTerm) ||
        row.province.includes(searchTerm)
    );

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <TableContainer component={Paper} sx={{width:'100%'}}>
            <TextField
                label="ค้นหา"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearch}
                size="small"
                sx={{ width: '20%', margin: 1 }}
            />
            <Table sx={{ minWidth: '100%', margin: 1 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: '#0e74bc' }}>
                    <TableRow>
                        <TableCell sx={{ color: 'white', fontWeight: '600', ...FontStyle }}>รหัสประจำตัว</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: '600', ...FontStyle }}>ชื่อจริง</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: '600', ...FontStyle }}>ชื่อเล่น</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: '600', ...FontStyle }}>บริษัท/หน่วยงาน</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: '600', ...FontStyle }}>สาขา</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: '600', ...FontStyle }}>จังหวัด</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: '600', ...FontStyle }}>จัดการ</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredData
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row" sx={{ ...FontStyle }}>
                                {row.id}
                            </TableCell>
                            <TableCell sx={{ ...FontStyle }}>{row.name}</TableCell>
                            <TableCell sx={{ ...FontStyle }}>{row.nickname}</TableCell>
                            <TableCell sx={{ ...FontStyle }}>
                                    {row.company}
                            </TableCell>
                            <TableCell sx={{ ...FontStyle }}>{row.brance}</TableCell>
                            <TableCell sx={{ ...FontStyle }}>{row.province}</TableCell>
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
                                    <MenuItem onClick={handleMenuClose} sx={FontStyle}>View Details</MenuItem>
                                    <MenuItem onClick={handleMenuClose} sx={FontStyle}>Edit</MenuItem>
                                    <MenuItem onClick={handleMenuClose} sx={FontStyle}>Delete</MenuItem>
                                </Menu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                component="div"
                count={filteredData.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};

export default DataTable;
