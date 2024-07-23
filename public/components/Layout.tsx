'use client';
import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DraggableButton from './DraggableButton';
import { WidthFull } from '@mui/icons-material';


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const { data: session, status } = useSession()

  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      return router.push('/');
    }
  }, [router, status]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Sidebar session={session} />
      <Box className='bg-gradient-to-r from-cyan-500 to-blue-500' style={{height:'5px',width:'full-width',zIndex: 0,}} />
      <Box component="main" sx={{ flexGrow: 1, p: 1, marginLeft: '300px', overflowY: 'auto' }}>
        <div style={{ textAlign: 'right', width: '100%', marginBottom: '15px' }}>
          <Header session={session} />
        </div>
        {children}
      </Box>
      <DraggableButton />
      <Footer />
    </Box>
  );
};

export default Layout;
