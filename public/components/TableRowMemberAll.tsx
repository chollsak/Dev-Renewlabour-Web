import { Chip, IconButton, Menu, MenuItem, TableCell, TableRow } from '@mui/material'
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import React, { useState } from 'react'
import PageLoader from './Loading/Loading2';

const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
};

export default function TableRowMemberAll({ row, index }: { row: any, index: any }) {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleView = (row: any) => {
        // Handle view action here
        console.log('View clicked:', row);
        window.location.href = `ViewAdmin/${row.mem_id}`;
    };

    const handleEdit = (row: any) => {
        // Handle edit action here
        console.log('Edit clicked:', row);
        <div>
            <PageLoader />
        </div>
        window.location.href = `UpdateAdmin/${row.mem_id}`;
    };

    const handleDelete = (row: any) => {
        // Handle delete action here
        console.log('Delete clicked:', row);

        return (
            <div>
                <PageLoader />
            </div>
        );
    };

    return (
        <TableRow key={row.id}>
            <TableCell component="th" scope="row" sx={{ ...FontStyle }}>
                {index + 1}
            </TableCell>
            <TableCell sx={{ ...FontStyle }}>{row.member_name} {row.member_lastname}</TableCell>
            <TableCell sx={{ ...FontStyle }}>{row.email}</TableCell>
            <TableCell sx={{ ...FontStyle }}>{row.tel}</TableCell>
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
    )
}
