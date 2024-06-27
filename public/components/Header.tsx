'use client';

import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Chip, Typography } from '@mui/material';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface UserData {
    name: string;
    job: string;
}

interface LayoutSession {
    session: any;
}

const UserMenu: React.FC<LayoutSession> = ({ session }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const mockUpData: UserData = {
        name: 'นายชลศักดิ์ สุขสวัสดิ์',
        job: 'Admin'
    };

    const fontStyle: React.CSSProperties = {
        fontFamily: 'Kanit, sans-serif',
    };

    const router = useRouter();

    const signOutToLogin = () => {
        signOut();
        router.refresh();
    };

    return (
        <div>
            <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                <Chip
                    style={fontStyle}
                    avatar={<Avatar src={session?.user?.image || ''} />}
                    label={session?.user?.name || mockUpData.name}
                    sx={{ fontWeight: '600' }}
                />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Box sx={{ marginLeft: '10px', display: 'flex', flexDirection: 'row' }}>
                    <Typography fontSize="medium" sx={[{ fontWeight: 'bold' }, fontStyle]}>
                        {session?.user?.name || mockUpData.name}
                    </Typography>
                    <Chip
                        variant="outlined"
                        color="primary"
                        size="small"
                        sx={[{ pointerEvents: 'none', marginLeft: '10px', marginRight: '10px' }, fontStyle]}
                        label={session?.user?.job || mockUpData.job}
                    />
                </Box>
                <MenuItem sx={fontStyle}>
                    <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    ตั้งค่า
                </MenuItem>
                <Divider />
                <MenuItem sx={fontStyle} onClick={signOutToLogin}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
}

export default UserMenu;
