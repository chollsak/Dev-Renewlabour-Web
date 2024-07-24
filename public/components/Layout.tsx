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
          const response = await axios.get(`/api/information?memberId=${session?.user_account[0]?.mem_id}`);
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
      <Box className='bg-gradient-to-r from-cyan-500 to-blue-500' style={{ height: '5px', width: '100%', zIndex: 0 }} />
      <Box component="main" sx={{ flexGrow: 1, p: 1, marginLeft: '300px', overflowY: 'auto' }}>
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
