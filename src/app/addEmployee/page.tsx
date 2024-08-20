import React from 'react';
import Layout from '../../../public/components/Layout';
import { Typography, useTheme } from '@mui/material';
import InformationCard from '../../../public/components/informationCard';


const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
};

const Page: React.FC = () => {


    return (
        <Layout>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5" fontWeight={600} sx={{ ...FontStyle }} marginLeft={2}>
                    เพิ่มรายชื่อเเรงงาน
                </Typography>
            </div>
            <div style={{ marginTop: '20px', marginBottom:'40px'}}>
                <InformationCard />
            </div>

        </Layout>
    );
};

export default Page;
