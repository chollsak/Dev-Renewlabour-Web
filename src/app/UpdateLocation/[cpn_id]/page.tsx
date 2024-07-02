'use client'
import React, { useEffect, useState } from 'react'
import Layout from '../../../../public/components/Layout'
import UpdateLocationForm from '../../../../public/components/UpdateLocationForm';
import axios from 'axios';
import PageLoader from '../../../../public/components/Loading/Loading2';


const Home = ({
  params,
}: {
  params: { cpn_id: string; };
}) => {

  const [companys, setCompanys] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API}/api/companies?companyId=${params.cpn_id}`)
      .then(response => {
        console.log('Fetched Data:', response.data);  // Log the fetched data
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
        </Layout>
      )}
    </>
  );
};

export default Home;
