import { IconButton, Menu, MenuItem, TableCell, TableRow } from '@mui/material'
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import React, { useState } from 'react'
import PageLoader from './Loading/Loading2';
import axios from 'axios';
import Swal, { SweetAlertResult } from 'sweetalert2';

const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
};

export default function TableRowLocationAll({ row, index }: { row: any, index: any }) {

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
        window.location.href = `ViewLocation/${row.cpn_id}`;
    };

    const handleEdit = (row: any) => {
        // Handle edit action here
        console.log('Edit clicked:', row);
        <div>
            <PageLoader />
        </div>
        window.location.href = `UpdateLocation/${row.cpn_id}`;
    };

    const handleDelete = async (row: any) => {
        // Handle delete action here
        console.log('Delete clicked:', row);
        const deleteData = await axios.delete(`${process.env.NEXT_PUBLIC_API}/api/companies?companyId=${row.cpn_id}`)
        const deleteFolder = await axios.delete(`${process.env.NEXT_PUBLIC_FILE_API}/api/companys/${row.cpn_id}`)
        if (deleteData.status === 200 && (deleteFolder.status === 200 || deleteFolder.status === 404)) {
            Swal.fire({
                title: 'สำเร็จ!',
                text: 'เพิ่มข้อมูลแรงงานได้สำเร็จ!',
                icon: 'success',
                showConfirmButton: false,
                allowOutsideClick: false,
                timer: 1000,
            }).then((result: SweetAlertResult) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    window.location.href = "/employees";
                }
            });
        } else {
            Swal.fire({
                title: 'ล้มเหลว!',
                text: "ไม่สามารถลบข้อมูลแรงงานได้",
                icon: 'error',
                showConfirmButton: true,
                allowOutsideClick: false,
            })
        }
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
            <TableCell sx={{ ...FontStyle }}>{row.cpn_n}</TableCell>
            <TableCell sx={{ ...FontStyle }}>{row.cpn_build}</TableCell>
            <TableCell sx={{ ...FontStyle }}>{row.branch}</TableCell>
            <TableCell sx={{ ...FontStyle }}>{row.cpn_dist}</TableCell>
            <TableCell sx={{ ...FontStyle }}>{row.cpn_prov}</TableCell>
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
                    <MenuItem onClick={() => handleDelete(row)} sx={{ ...FontStyle, display: 'none' }}>ลบ</MenuItem>
                </Menu>
            </TableCell>
        </TableRow>
    )
}
