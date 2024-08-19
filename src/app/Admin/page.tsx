'use client';

import React from 'react'
import Layout from '../../../public/components/Layout'
import { Button, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import AdminTable from '../../../public/components/AdminTable';
import Footer from '../../../public/components/Footer';
import PageLoader from '../../../public/components/Loading/Loading2';
import useMediaQuery from '@mui/material/useMediaQuery';

const FontStyle: React.CSSProperties = {
  fontFamily: 'Kanit, sans-serif',
};


const tempRouter = () => {
  window.location.href = "/AddAdmin";
}


export default function page() {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Layout>
      <PageLoader/>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5" fontWeight={600} sx={{ ...FontStyle }} marginLeft={2}>รายชื่อผู้ดูเเล</Typography>
        <Button
          className='bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full'
          onClick={tempRouter}
          variant='contained' size='small' sx={FontStyle}>󠀫󠀫<AddIcon />เพิ่มผู้ดูเเล</Button>
      </div>
      <div style={{ marginTop: '50px' }}>
        <AdminTable />
      </div>
      <div className='w-60 h-80' style={{
          display: isMobile ? 'block' : 'none'
        }}>
          {/* Display bugs empty div */}
        </div>
    </Layout>
  )
}
