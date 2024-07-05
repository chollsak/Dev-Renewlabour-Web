'use client';

import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Chip, Typography } from '@mui/material';
import { getCsrfToken, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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

    const fontStyle: React.CSSProperties = {
        fontFamily: 'Kanit, sans-serif',
    };

    const router = useRouter();

    const signOutToLogin = async () => {
        const csrfToken = await getCsrfToken();

        if (!csrfToken) {
            console.error('Failed to fetch CSRF token');
            return;
        }

        // Making a POST request manually
        const params = new URLSearchParams({
            csrfToken: csrfToken || '',
            callbackUrl: '/', // or any page you want to redirect to after sign out
        });

        fetch('/api/auth/signout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        })
            .then(response => {
                if (response.ok) {
                    router.push('/');
                } else {
                    console.error('Sign out failed', response.statusText);
                }
            })
            .catch(error => console.error('Error signing out:', error));
    };

    return (
        <div>
            <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                <Chip
                    style={fontStyle}
                    avatar={<Avatar src={`${process.env.NEXT_PUBLIC_FILE_API}/file/members/${session?.user_account[0]?.mem_id}/picpath/${session?.user_account[0]?.m_picpath}` || ''} />}
                    label={`${session?.user_account[0]?.member_name} ${session?.user_account[0]?.member_lastname || " "}` || ""}
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
                        {session?.user_account[0]?.member_name || " "} {session?.user_account[0]?.member_lastname || " "}
                    </Typography>
                    <Chip
                        variant="outlined"
                        color="primary"
                        size="small"
                        sx={[{ pointerEvents: 'none', marginLeft: '10px', marginRight: '10px' }, fontStyle]}
                        label={session?.name || " "}
                    />
                </Box>
                <Link href="/SettingPage" passHref>
                    <MenuItem sx={fontStyle}>
                        <ListItemIcon>
                            <SettingsIcon fontSize="small" />
                        </ListItemIcon>
                        ตั้งค่า
                    </MenuItem>
                </Link>
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
