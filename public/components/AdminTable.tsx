'use client';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton, Menu, MenuItem, TablePagination, Chip } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import axios from 'axios';
import TableRowMemberAll from './TableRowMemberAll';

const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
};

export default function AdminTable() {
    const [searchTerm, setSearchTerm] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        axios.get('http://localhost:3000/api/admin')
            .then(response => {
                console.log('Fetched Data:', response.data);  // Log the fetched data
                setData(response.data);
            })
            .catch(error => console.error('Error fetching member:', error));
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = data.filter(row =>
        row.member_name.includes(searchTerm) ||
        row.member_lastname.includes(searchTerm) ||
        row.email.includes(searchTerm) ||
        row.tel.includes(searchTerm)
    );

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
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
                        <TableCell sx={{ color: 'white', fontWeight: '600', ...FontStyle }}>อีเมลล์</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: '600', ...FontStyle }}>เบอร์โทร</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: '600', ...FontStyle }}>จัดการ</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                        return (
                            <TableRowMemberAll row={row} key={row.mem_id} index={index} />
                        )
                    })}
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
