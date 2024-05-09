'use client';

import React from 'react'
import Layout from '../../../public/components/Layout'
import { Button, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import AdminTable from '../../../public/components/AdminTable';
import Footer from '../../../public/components/Footer';


const FontStyle: React.CSSProperties = {
  fontFamily: 'Kanit, sans-serif',
};


const tempRouter = () => {
  window.location.href = "/AddAdmin";
}


export default function page() {
  

  return (
    <Layout>
    <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5" fontWeight={600} sx={{ ...FontStyle }} marginLeft={2}>รายชื่อผู้ดูเเล</Typography>
        <Button
          onClick={tempRouter}
        variant='contained' size='small' sx={FontStyle}>󠀫󠀫<AddIcon/>เพิ่มผู้ดูเเล</Button>
    </div>
    <div style={{marginTop:'50px'}}>
        <AdminTable/>
    </div>
        
    
</Layout>
  )
}
