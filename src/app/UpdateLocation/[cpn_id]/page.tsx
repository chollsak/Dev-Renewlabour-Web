'use client'
import React, { useEffect, useState } from 'react'
import Layout from '../../../../public/components/Layout'
import UpdateLocationForm from '../../../../public/components/UpdateLocationForm';
import axios from 'axios';
import PageLoader from '../../../../public/components/Loading/Loading2';
import useMediaQuery from '@mui/material/useMediaQuery';

const Home = ({
  params,
}: {
  params: { cpn_id: string; };
}) => {

  const [companys, setCompanys] = useState<any[]>([]);
  const isMobile = useMediaQuery('(max-width:600px)');
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API}/api/companies?companyId=${params.cpn_id}`)
      .then(response => {
        setCompanys(response.data);
      })
      .catch(error => console.error('Error fetching companies:', error));
  }, [params.cpn_id]);

  return (
    <>
      {companys.length === 0 ? (
        <PageLoader />
      ) : (
        <Layout>
          <UpdateLocationForm companys={companys} params={params} />
          <div className='w-60 h-80' style={{
          display: isMobile ? 'block' : 'none'
        }}>
          {/* Display bugs empty div */}
        </div>
        </Layout>
      )}
    </>
  );
};

export default Home;
