import React, { useState } from 'react';
import { TableCell, IconButton, Menu, MenuItem } from '@mui/material';
import Chip from '@mui/joy/Chip';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment';
import PageLoader from './Loading/Loading2';
import axios from 'axios';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { useMediaQuery, useTheme } from '@mui/material';


interface TableRowProps {
    row: any;
}

const getStatus = (row: any) => {
    const values = [
        row?.visa_enddate ? moment(row.visa_enddate, 'YYYY-MM-DD') : null,
        row?.passport_enddate ? moment(row.passport_enddate, 'YYYY-MM-DD') : null,
        row?.workpermit_enddate ? moment(convertBEtoCE(row.workpermit_enddate), 'YYYY-MM-DD') : null,
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
        } else if (remainingDays > 0 && remainingDays <= 31) {
            return 'ต่ออายุด่วน';
        } else if (remainingDays > 31 && remainingDays <= 61) {
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
    } else if (remainingDays > 0 && remainingDays <= 31) {
        return 'danger';
    } else if (remainingDays > 31 && remainingDays <= 61) {
        return 'warning';
    } else {
        return 'success';
    }

}

const isRed = (value: string): 'solid' | 'outlined' => {
    const remainingDays = moment(value, 'YYYY-MM-DD').diff(moment(), 'days');

    if ((remainingDays > 0 && remainingDays <= 31) || remainingDays < 0) {
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

const convertBEtoCE = (value: string) => {
    // Convert B.E. year to C.E. year
    const ceYear = parseInt(value.split('-')[0], 10) - 543;
    const restOfDate = value.slice(4); // Extract the -MM-DD part
    return `${ceYear}${restOfDate}`;
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

    // Determine screen size
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleView = (row: any) => {
        window.location.href = `ViewEmployee/${row.person_id}/${encodeURIComponent(row.outlanderNo)}`;
    };

    const handleEdit = (row: any) => {
        <div>
            <PageLoader />
        </div>
        window.location.href = `UpdateEmployee/${row.person_id}/${encodeURIComponent(row.outlanderNo)}`;
    };

    const handleDelete = async (row: any) => {
        const deleteData = await axios.delete(`${process.env.NEXT_PUBLIC_API}/api/persons?personId=${row.person_id}&outlanderNo=${row.outlanderNo}`);
        const deleteFolder = await axios.delete(`${process.env.NEXT_PUBLIC_FILE_API}/api/persons/${row.outlanderNo}`);
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
            });
        }
        return (
            <div>
                <PageLoader />
            </div>
        );
    };

    const status = getStatus(row);
    const color = getColor(status);

    const dynamicFontSize = isSmallScreen ? '0.8rem' : '1rem';

    return (
        <tr key={row.person_id}>
            <TableCell sx={{ color: 'Black', width: isSmallScreen ? '35%' : '15%', fontSize: dynamicFontSize, ...FontStyle }}>
                {row.firstnameth + ' ' + row.lastnameth}
            </TableCell>
            <TableCell sx={{ color: 'Black', width: isSmallScreen ? '25%' : 'fit-content', fontSize: dynamicFontSize, ...FontStyle }}>
                {row.nickname}
            </TableCell>
            <TableCell sx={{ color: color, width: isSmallScreen ? '15%' : '10%', fontWeight: '600', fontSize: dynamicFontSize, ...FontStyle }}>
                {status}
            </TableCell>
            <TableCell sx={{ color: 'Black', fontWeight: '600', width: isSmallScreen ? '30%' : 'fit-content', fontSize: dynamicFontSize, ...FontStyle }}>
                <Chip sx={{ fontSize: dynamicFontSize, ...FontStyle }} variant={isRed(row.visa_enddate)} color={getChipColor(row.visa_enddate)}>
                    {getText(row.visa_enddate)}
                </Chip>
            </TableCell>
            <TableCell sx={{ color: 'Black', fontWeight: '600', width: isSmallScreen ? '30%' : 'fit-content', fontSize: dynamicFontSize, ...FontStyle }}>
                <Chip sx={{ fontSize: dynamicFontSize, ...FontStyle }} variant={isRed(row.passport_enddate)} color={getChipColor(row.passport_enddate)}>
                    {getText(row.passport_enddate)}
                </Chip>
            </TableCell>
            <TableCell sx={{ color: 'Black', fontWeight: '600', width: isSmallScreen ? '35%' : 'fit-content', fontSize: dynamicFontSize, ...FontStyle }}>
                <Chip sx={{ fontSize: dynamicFontSize, ...FontStyle }} variant={isRed(convertBEtoCE(row.workpermit_enddate))} color={getChipColor(convertBEtoCE(row.workpermit_enddate))}>
                    {getText(convertBEtoCE(row.workpermit_enddate))}
                </Chip>
            </TableCell>
            <TableCell sx={{ color: 'Black', fontWeight: '600', width: isSmallScreen ? '35%' : 'fit-content', fontSize: dynamicFontSize, ...FontStyle }}>
                <Chip sx={{ fontSize: dynamicFontSize, ...FontStyle }} variant={isRed(row.ninetydays_enddate)} color={getChipColor(row.ninetydays_enddate)}>
                    {getText(row.ninetydays_enddate)}
                </Chip>
            </TableCell>
            <TableCell sx={{ width: isSmallScreen ? '15%' : '5%' }}>
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
                    <MenuItem onClick={() => handleView(row)} sx={{ fontSize: dynamicFontSize, ...FontStyle }}>ดูเพิ่มเติม</MenuItem>
                    <MenuItem onClick={() => handleEdit(row)} sx={{ fontSize: dynamicFontSize, ...FontStyle }}>เเก้ไข</MenuItem>
                    <MenuItem onClick={() => handleDelete(row)} sx={{ fontSize: dynamicFontSize, ...FontStyle }}>ลบ</MenuItem>
                </Menu>
            </TableCell>
        </tr>
    );
};

export default TableRowAll;
