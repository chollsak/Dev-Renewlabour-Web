import { Chip, IconButton, Menu, MenuItem, TableCell, TableRow } from '@mui/material'
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import React, { useState } from 'react'
import PageLoader from './Loading/Loading2';
import axios from 'axios';
import Swal, { SweetAlertResult } from 'sweetalert2';

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
        window.location.href = `ViewAdmin/${row.mem_id}`;
    };

    const handleEdit = (row: any) => {
        // Handle edit action here
        <div>
            <PageLoader />
        </div>
        window.location.href = `UpdateAdmin/${row.mem_id}`;
    };

    const handleDelete = async (row: any) => {
        // Handle delete action here
        const deleteData = await axios.delete(`${process.env.NEXT_PUBLIC_API}/api/admin?memberId=${row.mem_id}`)
        const deleteFolder = await axios.delete(`${process.env.NEXT_PUBLIC_FILE_API}/api/members/${row.mem_id}`)
        if (deleteData.status === 200 && (deleteFolder.status === 200 || deleteFolder.status === 404)) {
            Swal.fire({
                title: 'สำเร็จ!',
                text: 'ลบข้อมูลผู้ดูแลได้สำเร็จ!',
                icon: 'success',
                showConfirmButton: false,
                allowOutsideClick: false,
                timer: 1000,
            }).then((result: SweetAlertResult) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    window.location.href = "/Admin";
                }
            });
        } else {
            Swal.fire({
                title: 'ล้มเหลว!',
                text: "ไม่สามารถลบข้อมูลผู้ดูแลได้",
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
                    {/* <MenuItem onClick={() => handleEdit(row)} sx={FontStyle}>เเก้ไข</MenuItem> */}
                    <MenuItem onClick={() => handleDelete(row)} sx={FontStyle}>ลบ</MenuItem>
                </Menu>
            </TableCell>
        </TableRow>
    )
}
