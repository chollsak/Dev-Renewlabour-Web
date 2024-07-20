import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton, Menu, MenuItem, TablePagination } from '@mui/material';
import { ArrowUpward, ArrowDownward, MoreVert as MoreVertIcon } from '@mui/icons-material';
import axios from 'axios';
import TableRowLocationAll from './TableRowLocationAll';

const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
};

const DataTable: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API}/api/companies`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => console.error('Error fetching companies:', error));
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = data.filter(row =>
        (row.cpn_n && row.cpn_n.includes(searchTerm)) ||
        (row.cpn_build && row.cpn_build.includes(searchTerm)) ||
        (row.cpn_ad && row.cpn_ad.includes(searchTerm)) ||
        (row.cpn_fl && row.cpn_fl.includes(searchTerm)) ||
        (row.cpn_vill && row.cpn_vill.includes(searchTerm)) ||
        (row.branch && row.branch.includes(searchTerm)) ||
        (row.cpn_dist && row.cpn_dist.includes(searchTerm)) ||
        (row.cpn_prov && row.cpn_prov.includes(searchTerm))
    );

    const sortedData = filteredData.slice().sort((a, b) => {
        if (sortDirection === 'asc') {
            return a.cpn_n.localeCompare(b.cpn_n);
        } else {
            return b.cpn_n.localeCompare(a.cpn_n);
        }
    });

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
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
                        <TableCell sx={{ color: 'white', fontWeight: '600', ...FontStyle }}>อาคาร</TableCell>
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
                        .map((row, index) => {
                            return (
                                <TableRowLocationAll row={row} key={row.company_id} index={index} />
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
    );
};

export default DataTable;
