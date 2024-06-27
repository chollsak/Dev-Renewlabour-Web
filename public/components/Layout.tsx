import React from 'react';
import { Box } from '@mui/system';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import { useSession } from 'next-auth/react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const { data: session } = useSession()

  console.log("session: ", session)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 1, marginLeft: '300px', overflowY: 'auto' }}>
        <div style={{ textAlign: 'right', width: '100%', marginBottom: '15px' }}>
          <Header />
        </div>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
