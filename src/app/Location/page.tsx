'use client';
import React from 'react'
import Layout from '../../../public/components/Layout'
import { Typography } from '@mui/material';
import DataTable from '../../../public/components/LocationCard';

const FontStyle: React.CSSProperties = {
  fontFamily: 'Kanit, sans-serif',
};


export default function page() {
  return (
    <Layout>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5" fontWeight={600} sx={{ ...FontStyle }} marginLeft={2}>สถานที่ทำงาน</Typography>
      </div>

      <div style={{ marginTop: '20' }}>
        <DataTable/>
      </div>
    </Layout>
  )
}
