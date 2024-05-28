'use client';
import React from 'react'
import Layout from '../../../public/components/Layout'
import { Button, Typography } from '@mui/material';
import DataTable from '../../../public/components/LocationCard';
import Footer from '../../../public/components/Footer';
import AddIcon from '@mui/icons-material/Add';

const tempRouter = () => {
  window.location.href = "/AddLocation";
}


const FontStyle: React.CSSProperties = {
  fontFamily: 'Kanit, sans-serif',
};


export default function page() {
  return (
    <Layout>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5" fontWeight={600} sx={{ ...FontStyle }} marginLeft={2}>สถานที่ทำงาน</Typography>
        <Button
          onClick={tempRouter}
        variant='contained' size='small' sx={FontStyle}>󠀫󠀫<AddIcon/>เพิ่มสถานที่</Button>
      </div>

      <div style={{ marginTop: '20' }}>
        <DataTable/>
      </div>
    </Layout>
    
  )
}
