'use client'

import React, { useEffect, useState } from 'react'
import Layout from '../../../../../public/components/Layout'
import { Box, Typography } from '@mui/material'
import UpdateInformationCard from '../../../../../public/components/UpdateinformationCard'
import axios from 'axios'
import PageLoader from '../../../../../public/components/Loading/Loading2'
import useMediaQuery from '@mui/material/useMediaQuery';

const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
};

export default function Home({
    params,
}: {
    params: { person_id: string; outlanderNo: string };
}) {
    const isMobile = useMediaQuery('(max-width:600px)');
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
                <PageLoader />
            ) : (
                <Layout>
                    <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h5" fontWeight={600} sx={{ ...FontStyle }} marginLeft={2}>แก้ไขรายชื่อเเรงงาน {"personId: " + params.person_id + " outlanderNo: " + decodeURIComponent(params.outlanderNo)}</Typography>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <UpdateInformationCard persons={persons} fileOther={fileOther} params={params} />
                    </div>
                    <div className='w-60 h-80' style={{
          display: isMobile ? 'block' : 'none'
        }}>
          {/* Display bugs empty div */}
        </div>
                </Layout>
            )}

        </>
    )
}
