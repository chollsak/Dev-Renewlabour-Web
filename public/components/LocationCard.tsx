import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton, Menu, MenuItem, TablePagination } from '@mui/material';
import { ArrowUpward, ArrowDownward, MoreVert as MoreVertIcon } from '@mui/icons-material';
import axios from 'axios';

const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
};

interface RowData {
    id: string;
    name: string;
    build: string;
    ad: string;
    fl: string;
    vill: string;
    branch: string;
    dist: string;
    prov: string;
}

const DataTable: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState<RowData[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        axios.get('/api/companyform')
            .then(response => {
                console.log('Fetched Data:', response.data);  // Log the fetched data
                setData(response.data);
            })
            .catch(error => console.error('Error fetching companies:', error));
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = data.filter(row =>
        (row.name && row.name.includes(searchTerm)) ||
        (row.build && row.build.includes(searchTerm)) ||
        (row.ad && row.ad.includes(searchTerm)) ||
        (row.fl && row.fl.includes(searchTerm)) ||
        (row.vill && row.vill.includes(searchTerm))||
        (row.branch && row.branch.includes(searchTerm))||
        (row.dist && row.dist.includes(searchTerm))||
        (row.prov && row.prov.includes(searchTerm))
    );

    const sortedData = filteredData.slice().sort((a, b) => {
        if (sortDirection === 'asc') {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });

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

    const toggleSortDirection = () => {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };

    return (
        <TableContainer component={Paper} sx={{ width: '100%' }}>
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
                    <TableCell sx={{ color: 'white', fontWeight: '600', ...FontStyle }}>ID</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: '600', ...FontStyle }}>ชื่อ</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: '600', ...FontStyle }}>ตึก</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: '600', ...FontStyle }}>สาขา</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: '600', ...FontStyle }}>อำเภอ</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: '600', ...FontStyle }}>
                            จังหวัด
                            <IconButton onClick={toggleSortDirection} size="small" sx={{ color: 'white' }}>
                                {sortDirection === 'asc' ? <ArrowUpward /> : <ArrowDownward />}
                            </IconButton>
                        </TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: '600', ...FontStyle }}>จัดการ</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedData
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row" sx={{ ...FontStyle }}>
                                    {row.id}
                                </TableCell>
                                <TableCell sx={{ ...FontStyle }}>{row.name}</TableCell>
                                <TableCell sx={{ ...FontStyle }}>{row.build}</TableCell>
                                <TableCell sx={{ ...FontStyle }}>{row.branch}</TableCell>
                                <TableCell sx={{ ...FontStyle }}>{row.dist}</TableCell>
                                <TableCell sx={{ ...FontStyle }}>{row.prov}</TableCell>
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
                                        <MenuItem onClick={handleMenuClose} sx={FontStyle}>ดูเพิ่มเติม</MenuItem>
                                        <MenuItem onClick={handleMenuClose} sx={FontStyle}>เเก้ไข</MenuItem>
                                        <MenuItem onClick={handleMenuClose} sx={FontStyle}>ลบ</MenuItem>
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
