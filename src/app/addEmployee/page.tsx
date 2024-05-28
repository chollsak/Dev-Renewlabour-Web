import React from 'react'
import Layout from '../../../public/components/Layout'
import { Typography } from '@mui/material'
import InformationCard from '../../../public/components/informationCard';
import Footer from '../../../public/components/Footer';

const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
};

export default function page() {


    return (
        <Layout>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5" fontWeight={600} sx={{ ...FontStyle }} marginLeft={2}>เพิ่มรายชื่อเเรงงาน</Typography>

            </div>
            <div style={{ marginTop: '20px' }}>
                <InformationCard />
            </div>

        </Layout>

    )
}
