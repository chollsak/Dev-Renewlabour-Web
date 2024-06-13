import React, { useEffect, useState } from 'react'
import Layout from '../../../../../public/components/Layout'
import axios from 'axios';
import { Grid, Typography } from '@mui/material';

const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
};

export default function Home({
    params,
}: {
    params: { person_id: string; outlanderNo: string };
}) {

    const [persons, setPersons] = useState<any[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/persons?person_id=${params.person_id}&outlanderNo=${decodeURIComponent(params.outlanderNo)}`);
                setPersons(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [params.outlanderNo, params.person_id]); // Empty dependency array means this useEffect runs once on mount

    return (
        <>
            {persons.length === 0 ? (
                <div>
                    Downloading Data...
                </div>
            ) : (
                <Layout>
                    <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h5" fontWeight={600} sx={{ ...FontStyle }} marginLeft={2}>แก้ไขรายชื่อเเรงงาน {"personId: " + params.person_id + " outlanderNo: " + decodeURIComponent(params.outlanderNo)}</Typography>
                    </div>

                    <div style={{ marginTop: "20px" }}>
                        <Grid container spacing={6}>
                            <Grid item xs={12} md={6}></Grid>
                            <Grid item xs={12} md={6}></Grid>
                        </Grid>
                    </div>
                </Layout>
            )}
        </>
    )
}
