// components/ExportButton.js
import { Box, Button } from '@mui/material';
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

    return <Button variant='contained' className='p-2 font-bold bg-gradient-to-r from-emerald-400 to-emerald-700 rounded-full'  onClick={handleExport}> <span className='p-2'>Export</span> <Box component={'img'} className='w-10 h-fit' src='https://static.vecteezy.com/system/resources/previews/027/179/360/original/microsoft-excel-icon-logo-symbol-free-png.png'/></Button>;
};

export default ExportButton;