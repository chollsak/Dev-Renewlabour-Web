'use client'

import React, { useEffect, useState } from 'react'
import Layout from '../../../../../public/components/Layout'
import { Box, Typography } from '@mui/material'
import UpdateInformationCard from '../../../../../public/components/UpdateinformationCard'
import axios from 'axios'

const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
};

export default function Home({
    params,
}: {
    params: { person_id: string; outlanderNo: string };
}) {

    const [persons, setPersons] = useState<any[]>([])
    const [fileOther, setFileOther] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/persons?person_id=${params.person_id}&outlanderNo=${decodeURIComponent(params.outlanderNo)}`);
                setPersons(response.data.persons);
                setFileOther(response.data.fileOther);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [params.outlanderNo, params.person_id]); // Empty dependency array means this useEffect runs once on mount

    return (
        <>
            {persons.length === 0 ? (

                function PageLoader() {
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
                            <Box component="img" src="/public/Logo/logo.png" alt="Loading" />
                            <Box component="img" src="/public/Logo/pageloader.gif" alt='Loading' style={{ width: '100px' }} />
                        </Box>
                    );
                }


            ) : (
                <Layout>
                    <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h5" fontWeight={600} sx={{ ...FontStyle }} marginLeft={2}>แก้ไขรายชื่อเเรงงาน {"personId: " + params.person_id + " outlanderNo: " + decodeURIComponent(params.outlanderNo)}</Typography>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <UpdateInformationCard persons={persons} fileOther={fileOther} params={params} />
                    </div>
                </Layout>
            )}

        </>
    )
}
