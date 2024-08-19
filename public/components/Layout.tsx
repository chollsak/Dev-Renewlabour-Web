'use client';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DraggableButton from './DraggableButton';
import axios from 'axios';
import { FontStyle } from '@/components/settings/mockUserData';

import { useMediaQuery, useTheme } from '@mui/material';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [information, setInformation] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (status === 'unauthenticated') {
      return router.push('/');
    }

    const fetchInformation = async () => {
      try {
        if (session && session.user && session?.user_account?.mem_id) {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/information?memberId=${session?.user_account?.mem_id}`);
          setInformation(response.data);
        }
      } catch (error) {
        console.error('Error fetching information:', error);
      }
    };

    fetchInformation();
  }, [router, session, status]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Sidebar session={information} />
      <Box sx={{ position: 'fixed', width: '100%', zIndex: 1000 }}>
        <Box
          className="text-center"
          sx={{
            ...FontStyle,
            height: isMobile ? '25px':'30px',
            width: '100%',
            color: '#71797E',
            backgroundColor: '#FFDB58',
            padding: '3px',
            fontSize: isMobile ? '12px' : '16px',
          }}
        >
          <span>
            แพ็กเกจของคุณจะหมดอายุใน
          </span>
          <span
            style={{
              display: 'inline-block',
              width: isMobile ? '1.5rem' : '2rem',
              height: isMobile ? '0.75rem' : '1rem',
              backgroundColor: 'white',
              marginLeft: '10px',
              marginRight: '8px',
              borderRadius: '20%',
              lineHeight: isMobile ? '0.75rem' : '1rem',
              textAlign: 'center',
              color: 'black',
            }}
          >
            30
          </span>
          วัน
          <span
            className="m-4"
            style={{
              color: 'black',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            คลิกเพื่อต่ออายุ{' >'}
          </span>
        </Box>
        <Box className="bg-gradient-to-r from-cyan-500 to-blue-500" sx={{ height: '5px', width: '100%', color: 'white', boxShadow: '0px 4px 2px -2px gray' }} />
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 1, marginTop: '35px', marginLeft: isMobile ? '0px' : '300px' }}>
        <div style={{ textAlign: 'right', width: '100%', marginBottom: '15px' }}>
          <Header session={information} />
        </div>
        {children}
      </Box>
      <DraggableButton />
      <Footer />
    </Box>
  );
};

export default Layout;
