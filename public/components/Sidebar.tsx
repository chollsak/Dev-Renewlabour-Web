import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import Link from 'next/link';
import { useState } from 'react';
import InteractiveCard from './CompanyCard';
import Image from 'next/image';

interface LayoutSession {
  session: any;
}

const Sidebar: React.FC<LayoutSession> = ({ session }) => {
  const [activeLink, setActiveLink] = useState('');

  // Function to handle link click
  const handleLinkClick = (path: string) => {
    setActiveLink(path);
  };

  const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
  };

  return (
    <Box className='bg-gradient-to- from-cyan-500 to-blue-500' sx={{
      width: 300,
      height: '100vh',
      backgroundColor: 'whitesmoke',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 0,

    }}>
      <Box textAlign="center" p={2} sx={{ display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: 'whitesmoke' }}>

        <Image
          onClick={() => handleLinkClick('/Dashboard')}
          src="/Logo/logo.png"
          alt="Company Logo"
          width={200}
          height={200}
          style={{ maxWidth: '200px' }}
        />
        <InteractiveCard session={session} />
      </Box>
      <List>
        <Link href="/employees" passHref>
          <ListItemButton
            sx={{
              textDecoration: 'none',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                background: 'linear-gradient(to right, #00bcd4, #2196f3)', // Tailwind gradient colors
                color: 'white',
                '& .MuiListItemIcon-root': {
                  color: 'white',
                },
              },
            }}
            selected={activeLink === '/employees'}
            onClick={() => handleLinkClick('/employees')}
          >
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText sx={{ fontWeight: activeLink === '/employees' ? 'bold' : 'normal' }} >
              <span style={FontStyle}>รายชื่อเเรงงาน</span>
            </ListItemText>
          </ListItemButton>
        </Link>
        <Link href="/Location" passHref>
          <ListItemButton
            sx={{
              textDecoration: 'none',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                background: 'linear-gradient(to right, #00bcd4, #2196f3)', // Tailwind gradient colors
                color: 'white',
                '& .MuiListItemIcon-root': {
                  color: 'white',
                },
              },
            }}
            selected={activeLink === '/Location'}
            onClick={() => handleLinkClick('/Location')}
          >
            <ListItemIcon><WorkIcon /></ListItemIcon>
            <ListItemText sx={{ fontWeight: activeLink === '/Location' ? 'bold' : 'normal' }} >
              <span style={FontStyle}>สถานที่ทำงาน</span>
            </ListItemText>
          </ListItemButton>
        </Link>
        <Link href="/Admin" passHref>
          <ListItemButton
            sx={{
              textDecoration: 'none',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                background: 'linear-gradient(to right, #00bcd4, #2196f3)', // Tailwind gradient colors
                color: 'white',
                '& .MuiListItemIcon-root': {
                  color: 'white',
                },
              },
            }}
            selected={activeLink === '/Admin'}
            onClick={() => handleLinkClick('/Admin')}
          >
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText sx={{ fontWeight: activeLink === '/Admin' ? 'bold' : 'normal' }} >
              <span style={FontStyle}>รายชื่อผู้ดูเเล</span>
            </ListItemText>
          </ListItemButton>
        </Link>
      </List>

    </Box>
  );
};

export default Sidebar;
