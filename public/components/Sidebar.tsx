'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import Link from 'next/link';
import InteractiveCard from './CompanyCard';
import Image from 'next/image';
import useMediaQuery from '@mui/material/useMediaQuery';

interface LayoutSession {
  session: any;
}

const Sidebar: React.FC<LayoutSession> = ({ session }) => {
  const [activeLink, setActiveLink] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  // Function to handle link click
  const handleLinkClick = (path: string) => {
    setActiveLink(path);
    if (isMobile) setDrawerOpen(false); // Close drawer on mobile after link click
  };

  const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
  };

  const logoStyle = {
    maxWidth: isMobile ? '180px' : '200px', // Reduced image size for mobile
    marginTop: isMobile ? '80px' : '40px', // Reduced margin-top for mobile
  };

  const toggleDrawer = () => {
    setDrawerOpen(prev => !prev); // Toggle the drawer state
  };

  return (
    <>
      {isMobile ? (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer} // Toggle drawer on click
          sx={{ position: 'fixed', top: 35, left: 10, zIndex: 1201 }}
        >
          <div className='rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 border-solid w-10 h-10 flex items-center justify-center'>
            <MenuIcon style={{ color: 'white' }} />
          </div>
        </IconButton>
      ) : (
        <Box
          className='bg-gradient-to- from-cyan-500 to-blue-500'
          sx={{
            width: 300,
            height: '100vh',
            backgroundColor: 'whitesmoke',
            position: 'fixed',
            zIndex: 0,
          }}
        >
          <Box
            textAlign="center"
            p={2}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              backgroundColor: 'whitesmoke',
            }}
          >
            <Image
              onClick={() => handleLinkClick('/Dashboard')}
              src="/Logo/logo.png"
              alt="Company Logo"
              width={200}
              height={200}
              style={logoStyle}
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
                <ListItemText sx={{ fontWeight: activeLink === '/employees' ? 'bold' : 'normal' }}>
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
                <ListItemText sx={{ fontWeight: activeLink === '/Location' ? 'bold' : 'normal' }}>
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
                <ListItemText sx={{ fontWeight: activeLink === '/Admin' ? 'bold' : 'normal' }}>
                  <span style={FontStyle}>รายชื่อผู้ดูเเล</span>
                </ListItemText>
              </ListItemButton>
            </Link>
          </List>
        </Box>
      )}

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 300,
            backgroundColor: 'whitesmoke',
          },
        }}
      >
        <Box textAlign="center" p={2} sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Image
            onClick={() => handleLinkClick('/Dashboard')}
            src="/Logo/logo.png"
            alt="Company Logo"
            width={200}
            height={200}
            style={logoStyle}
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
              <ListItemText sx={{ fontWeight: activeLink === '/employees' ? 'bold' : 'normal' }}>
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
              <ListItemText sx={{ fontWeight: activeLink === '/Location' ? 'bold' : 'normal' }}>
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
              <ListItemText sx={{ fontWeight: activeLink === '/Admin' ? 'bold' : 'normal' }}>
                <span style={FontStyle}>รายชื่อผู้ดูเเล</span>
              </ListItemText>
            </ListItemButton>
          </Link>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
