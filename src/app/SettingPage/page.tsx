'use client'
import React, { useEffect, useState } from 'react';
import Layout from '../../../public/components/Layout';
import { AppBar, Box, Button, Tab, Tabs, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import TabPanel from '@/components/settings/TabPanelCard';
import AccountDetails from '@/components/settings/Information';
import SecuritySettings from '@/components/settings/Password';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import PageLoader from '../../../public/components/Loading/Loading2';

const FontStyle: React.CSSProperties = {
  fontFamily: 'Kanit, sans-serif',
};

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

const Page: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { data: session } = useSession()

  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/admin?memberId=${session?.user_account[0]?.mem_id}`);
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [session]);

  return (
    <>
      {members.length === 0 ? (
        <PageLoader />
      ) : (
        <Layout>
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h5" fontWeight={600} sx={{ ...FontStyle, marginLeft: 2 }}>
              ตั้งค่าส่วนตัว
            </Typography>
          </div>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="account and security tabs">
              <Tab icon={<PeopleIcon />} label="บัญชี" {...a11yProps(0)} />
              <Tab icon={<SecurityIcon />} label="ความปลอดภัย" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <AccountDetails members={members} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <SecuritySettings />
          </TabPanel>
        </Layout>
      )}
    </>
  );
};

export default Page;
