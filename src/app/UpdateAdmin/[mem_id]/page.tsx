'use client'
import React, { useEffect, useState } from 'react'
import Layout from '../../../../public/components/Layout'
import UpdateAdmin from '../../../../public/components/UpdateAdminForm'
import axios from 'axios';
import PageLoader from '../../../../public/components/Loading/Loading2';

export default function Home({
    params,
}: {
    params: { mem_id: string; };
}) {

    const [members, setMembers] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/admin?memberId=${params.mem_id}`);
                setMembers(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [params.mem_id]);

    return (
        <>
            {members.length === 0 ? (
                <PageLoader />
            ) : (
                <Layout>
                    <UpdateAdmin members={members} params={params} />
                </Layout>
            )}
        </>
    )
}