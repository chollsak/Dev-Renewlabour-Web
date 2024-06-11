'use client';

import React from 'react'
import Layout from '../../../public/components/Layout'
import UserMenu from '../../../public/components/Header'
import { Button, Typography } from '@mui/material'
import MyTable from '../../../public/components/EmployeeTable'
import AddIcon from '@mui/icons-material/Add';
import Footer from '../../../public/components/Footer'
import toast, { Toaster } from "react-hot-toast";

export default function employeePage() {
  const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
  };

  const tempRouter = () => {
    window.location.href = "/addEmployee";
  }

  return (
    <Layout>

      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5" fontWeight={600} sx={{ ...FontStyle }} marginLeft={2}>รายชื่อเเรงงาน</Typography>
        <Button
          onClick={tempRouter}
          variant='contained' size='small' sx={FontStyle}>󠀫󠀫<AddIcon />เพิ่มเเรงงาน</Button>
      </div>

      <MyTable />

    </Layout>
  )
}
