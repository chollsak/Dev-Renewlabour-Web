'use client';

import React from 'react';
import Layout from '../../../public/components/Layout';
import { Button, Typography } from '@mui/material';
import MyTable from '../../../public/components/EmployeeTable';
import AddIcon from '@mui/icons-material/Add';
import PageLoader from '../../../public/components/Loading/Loading2';
import useMediaQuery from '@mui/material/useMediaQuery';

interface LayoutSession {
  session: any;
}

export default function EmployeePage() {  // <-- Renamed to start with an uppercase letter
  const isMobile = useMediaQuery('(max-width:600px)');

  const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
  };

  const tempRouter = () => {
    window.location.href = "/addEmployee";
  };

  return (
    <>
      <Layout >
        <PageLoader />
        <div
          style={{
            marginBottom: isMobile ? '10px' : '20px',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
          }}
        >
          <Typography
            variant={isMobile ? "h6" : "h5"}
            fontWeight={600}
            sx={{ ...FontStyle }}
            marginLeft={isMobile ? 0 : 2}
            marginBottom={isMobile ? '10px' : '0'}
          >
            รายชื่อเเรงงาน
          </Typography>
          <Button
            onClick={tempRouter}
            variant='contained'
            size={isMobile ? 'small' : 'medium'}
            sx={{ ...FontStyle }}
            className='bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full'
            fullWidth={isMobile}
          >
            <AddIcon />เพิ่มเเรงงาน
          </Button>
        </div>
        <MyTable />
        <div className='w-60 h-80' style={{
          display: isMobile ? 'block' : 'none'
        }}>
          {/* Display bugs empty div */}
        </div>
      </Layout>

    </>
  );
}
