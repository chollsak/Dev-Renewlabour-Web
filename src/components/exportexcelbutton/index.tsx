// components/ExportButton.js
import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import axios from 'axios';

const ExportButton = () => {
    const handleExport = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/export/excel`, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Export Renewlabour แรงงานต่างด้าว.xlsx');
            document.body.appendChild(link);
            link.click();
        } catch (err) {
            console.error('Failed to export data:', err);
        }
    };

    // Get theme and set up media queries
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Button
            variant='contained'
            className='font-bold bg-gradient-to-r from-emerald-400 to-emerald-700 rounded-full h-10'
            onClick={handleExport}
            sx={{
                p: isSmallScreen ? '0.2rem' : '0.5rem',
                fontSize: isSmallScreen ? '0.5rem' : '0.7rem',
            }}
        >
            <span className='p-1'>Export</span>
            <Box
                component={'img'}
                sx={{
                    width: isSmallScreen ? '1.0rem' : '1.5rem',
                    height: 'auto',
                }}
                src='https://static.vecteezy.com/system/resources/previews/027/179/360/original/microsoft-excel-icon-logo-symbol-free-png.png'
            />
        </Button>
    );
};

export default ExportButton;
