import React, { useState } from 'react';
import { TableCell, IconButton, Menu, MenuItem } from '@mui/material';
import Chip from '@mui/joy/Chip';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment';

interface TableRowProps {
    row: any;
}

const statuses = ['ทั้งหมด', 'ต่ออายุด่วน', 'ใกล้หมดอายุ', 'หมดอายุ', 'ปกติ'];

const getStatus = (row: any) => {
    const values = [
        row?.visa_enddate ? moment(row.visa_enddate, 'YYYY-MM-DD') : null,
        row?.passport_enddate ? moment(row.passport_enddate, 'YYYY-MM-DD') : null,
        row?.workpermit_enddate ? moment(row.workpermit_enddate, 'YYYY-MM-DD') : null,
        row?.ninetydays_enddate ? moment(row.ninetydays_enddate, 'YYYY-MM-DD') : null,
    ];
    // Filter out null values
    const validValues = values.filter(value => value !== null) as moment.Moment[];

    // Calculate minValue only if there are valid values
    const minValue = validValues.length > 0 ? moment.min(validValues) : null;
    const remainingDays = minValue ? minValue.diff(moment(), 'days') : null;

    if (remainingDays !== null) {
        if (remainingDays <= 0) {
            return 'หมดอายุ';
        } else if (remainingDays > 0 && remainingDays < 7) {
            return 'ต่ออายุด่วน';
        } else if (remainingDays >= 7 && remainingDays < 15) {
            return 'ใกล้หมดอายุ';
        } else {
            return 'ปกติ';
        }
    } else {
        // Handle case when all dates are null
        return 'No date available';
    }
};

const getChipColor = (value: string) => {
    const remainingDays = moment(value, 'YYYY-MM-DD').diff(moment(), 'days');
    if (remainingDays <= 0) {
        return 'neutral';
    } else if (remainingDays > 0 && remainingDays < 7) {
        return 'danger';
    } else if (remainingDays >= 7 && remainingDays < 15) {
        return 'warning';
    } else {
        return 'success';
    }

}

const isRed = (value: string): 'solid' | 'outlined' => {
    const remainingDays = moment(value, 'YYYY-MM-DD').diff(moment(), 'days');

    if ((remainingDays > 0 && remainingDays < 7) || remainingDays < 0) {
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

const getText = (value: string) => {

    const remainingDays = moment(value, 'YYYY-MM-DD').diff(moment(), 'days');
    if (!isNaN(remainingDays)) {
        if (remainingDays <= 0) {
            return 'หมดอายุมา' + " " + Math.abs(remainingDays) + ' วัน';
        } else {
            return 'คงเหลือ ' + remainingDays + ' วัน';
        }
    } else {
        // Handle case when value is not a valid date
        return 'No date available';
    }
}

const TableRowAll: React.FC<TableRowProps> = ({ row }) => {
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
    };

    const handleEdit = (row: any) => {
        // Handle edit action here
        console.log('Edit clicked:', row);
        window.location.href = `UpdateEmployee/${row.person_id}/${encodeURIComponent(row.outlanderNo)}`;
    };

    const handleDelete = (row: any) => {
        // Handle delete action here
        console.log('Delete clicked:', row);
    };

    const status = getStatus(row);
    const color = getColor(status);

    return (
        <tr key={row.person_id}>
            <TableCell sx={{ color: 'Black', ...FontStyle }}>{row.firstnameth + ' ' + row.lastnameth}</TableCell>
            <TableCell sx={{ color: 'Black', ...FontStyle }}>{row.nickname}</TableCell>
            <TableCell sx={{ color: color, fontWeight: '600', ...FontStyle }}>{status}</TableCell>
            <TableCell sx={{ color: 'Black', fontWeight: '600', ...FontStyle }}>
                <Chip sx={FontStyle} variant={isRed(row.visa_enddate)} color={getChipColor(row.visa_enddate)}>
                    {getText(row.visa_enddate)}
                </Chip>
            </TableCell>
            <TableCell sx={{ color: 'Black', fontWeight: '600', ...FontStyle }}>
                <Chip sx={FontStyle} variant={isRed(row.passport_enddate)} color={getChipColor(row.passport_enddate)}>
                    {getText(row.passport_enddate)}
                </Chip>
            </TableCell>
            <TableCell sx={{ color: 'Black', fontWeight: '600', ...FontStyle }}>
                <Chip sx={FontStyle} variant={isRed(row.workpermit_enddate)} color={getChipColor(row.workpermit_enddate)}>
                    {getText(row.workpermit_enddate)}
                </Chip>
            </TableCell>
            <TableCell sx={{ color: 'Black', fontWeight: '600', ...FontStyle }}>
                <Chip sx={FontStyle} variant={isRed(row.ninetydays_enddate)} color={getChipColor(row.ninetydays_enddate)}>
                    {getText(row.ninetydays_enddate)}
                </Chip>
            </TableCell>
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
        </tr>
    );
};

export default TableRowAll;
