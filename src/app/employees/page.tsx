'use client';

import React from 'react'
import Layout from '../../../public/components/Layout'
import { Button, Typography } from '@mui/material'
import MyTable from '../../../public/components/EmployeeTable'
import AddIcon from '@mui/icons-material/Add';
import PageLoader from '../../../public/components/Loading/Loading2';


export default function employeePage() {
  const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
  };

  const tempRouter = () => {
    window.location.href = "/addEmployee";
  }

  return (
    <Layout>
      <PageLoader />
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5" fontWeight={600} sx={{ ...FontStyle }} marginLeft={2}>รายชื่อเเรงงาน</Typography>
        <Button
          onClick={tempRouter}
          variant='contained' size='medium' sx={FontStyle}
          className='bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full'
        >󠀫󠀫<AddIcon />เพิ่มเเรงงาน</Button>
      </div>
      <MyTable />
    </Layout>
  )
}
