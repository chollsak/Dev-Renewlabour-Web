// components/ExportButton.js
import { Button } from '@mui/material';
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

    return <Button variant='contained' color='success' onClick={handleExport}>Export to Excel</Button>;
};

export default ExportButton;