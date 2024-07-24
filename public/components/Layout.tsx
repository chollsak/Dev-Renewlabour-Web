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

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [information, setInformation] = useState(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      return router.push('/');
    }

    const fetchInformation = async () => {
      try {
        if (session && session.user && session?.user_account[0]?.mem_id) {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/information?memberId=${session?.user_account[0]?.mem_id}`);
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
          style={{
            ...FontStyle,
            height: '30px',
            width: '100%',
            color: '#71797E',
            backgroundColor: '#FFDB58',
            padding: '3px'
          }}
        >
          เเพ็กเกจของคุณจะหมดอายุใน
          <span
            style={{
              display: 'inline-block',
              width: '2rem',
              height: '1rem',
              backgroundColor: 'white',
              marginLeft: '10px',
              marginRight: '8px',
              borderRadius: '20%',
              lineHeight: '1rem', // Ensures the text is vertically centered within the span
              textAlign: 'center', // Ensures the text is horizontally centered within the span
              color: 'black' // Ensures the text color matches the surrounding text
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
              cursor: 'pointer'
            }}
          >
            คลิกเพื่อต่ออายุ{' >'}
          </span>
        </Box>
        <Box className="bg-gradient-to-r from-cyan-500 to-blue-500" style={{ height: '5px', width: '100%', color: 'white', boxShadow: '0px 4px 2px -2px gray' }} />
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 1, marginTop: '35px', marginLeft: '300px', overflowY: 'auto' }}>
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
