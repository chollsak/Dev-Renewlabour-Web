'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

export default function PageLoader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800); // Hide after 800 ms

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
            overflow: 'hidden', // Prevents scrolling within this component
            '& img': {
                width: '50vw', // Adjust to 50% of the viewport width
                maxWidth: '600px', // Max width for larger screens
                maxHeight: '50vh', // Max height to stay within the viewport
            },
            '@media (max-width: 600px)': { // Media query for mobile screens
                '& img': {
                    width: '70vw', // Adjust to 70% of the viewport width on smaller screens
                    maxWidth: '400px', // Max width for smaller screens
                    maxHeight: '30vh', // Max height for smaller screens
                }
            }
        }}>
            <Box component="img" src="/Logo/logo.png" alt="Loading" />
            <Box component="img" src="/Logo/pageloader.gif" alt='Loading' style={{ width: '100px' }} />
        </Box>
    );
}
