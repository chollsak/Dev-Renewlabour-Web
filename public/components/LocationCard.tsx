import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton, Menu, MenuItem, TablePagination } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';

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
}

const DataTable: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState<RowData[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        fetch('/api/companies/route')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching companies:', error));
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = data.filter(row =>
        row.name.includes(searchTerm) ||
        row.build.includes(searchTerm) ||
        row.ad.includes(searchTerm) ||
        row.fl.includes(searchTerm) ||
        row.vill.includes(searchTerm)
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
                                <TableCell sx={{ ...FontStyle }}>{row.build}</TableCell>
                                <TableCell sx={{ ...FontStyle }}>
                                    {row.ad}
                                </TableCell>
                                <TableCell sx={{ ...FontStyle }}>{row.fl}</TableCell>
                                <TableCell sx={{ ...FontStyle }}>{row.vill}</TableCell>
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
