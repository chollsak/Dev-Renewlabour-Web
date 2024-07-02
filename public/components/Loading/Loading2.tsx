'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

export default function PageLoader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800); // Hide after 300 ms

        return () => clearTimeout(timer);
    }, []);

    if (!loading) return null;

    return (
        <Box sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'white', // Deep maroon background
            zIndex: 1400, // Ensure it is on top of other content
            pointerEvents: 'none', // Prevents interaction with the background
            '& img': {
                width: '600', // Full width of its container
                maxHeight: '600' // Max height to stay within the viewport
            }
        }}>
            <Box component="img" src="/Logo/logo.png" alt="Loading" />
            <Box component="img" src="/Logo/pageloader.gif" alt='Loading' style={{ width: '100px' }} />
        </Box>
    );
}
