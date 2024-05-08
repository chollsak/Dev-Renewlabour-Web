'use client';
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton, Menu, MenuItem, TablePagination, Chip } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';


const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
};


interface RowData {
    id: string;
    name: string;
    role: string;
    email: string;
    telephone: string;
}

const data: RowData[] = [
    { id: '14155151', name: 'John Doe', role: 'Admin', email: 'johndoe@gmail.com', telephone: '0992222220' },
    { id: '21551', name: 'Jane Doe', role: 'Admin', email: 'janedoe@email.com', telephone: '0892222220' },
    { id: '36519556', name: 'Alice Johnson', role: 'Admin', email: 'alice.johnson@example.com', telephone: '0791234567' },
    { id: '45189484', name: 'Bob Smith', role: 'Admin', email: 'bobsmith@example.com', telephone: '0887654321' },
    { id: '5165651651', name: 'Charlie Brown', role:'Admin', email: 'charlie.brown@example.com', telephone: '0771231234' },
    { id: '6554551', name: 'Diana Prince', role: 'Admin', email: 'diana.prince@example.com', telephone: '0667897890' },
    { id: '724524', name: 'Edward Norton', role: 'Admin', email: 'edward.norton@example.com', telephone: '0684564560' },
    { id: '824254', name: 'Fiona Gallagher', role: 'Admin', email: 'fiona.gallagher@example.com', telephone: '0998887777' },
    { id: '924578', name: 'George Bailey', role: 'Admin', email: 'george.bailey@example.com', telephone: '0889990001' },
    { id: '1069687', name: 'Hannah Abbott', role: 'Admin', email: 'hannah.abbott@example.com', telephone: '0776665554' },
    { id: '1155541', name: 'Ian Malcolm', role: 'Admin', email: 'ian.malcolm@example.com', telephone: '0895554443' },
    { id: '122445', name: 'Julia Roberts', role: 'Admin', email: 'julia.roberts@example.com', telephone: '0882223334' },

];

export default function AdminTable() {
    const [searchTerm, setSearchTerm] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = data.filter(row => 
        row.name.includes(searchTerm) ||
        row.role.includes(searchTerm) ||
        row.email.includes(searchTerm) ||
        row.telephone.includes(searchTerm)
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
                    <TableCell sx={{ color: 'white', fontWeight: '600', ...FontStyle }}>ตำแหน่ง</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: '600', ...FontStyle }}>อีเมลล์</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: '600', ...FontStyle }}>เบอร์โทร</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: '600', ...FontStyle }}>จัดการ</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <TableRow key={row.id}>
                        <TableCell component="th" scope="row" sx={{ ...FontStyle }}>
                                {row.id}
                        </TableCell>
                        <TableCell sx={{ ...FontStyle }}>{row.name}</TableCell>
                        <TableCell sx={FontStyle}>
                            <div>
                                <Chip label={row.role} color='primary' variant='outlined'/>
                            </div>
                        </TableCell>
                        <TableCell sx={{ ...FontStyle }}>{row.email}</TableCell>
                        <TableCell sx={{ ...FontStyle }}>{row.telephone}</TableCell>
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
    
  )
}
