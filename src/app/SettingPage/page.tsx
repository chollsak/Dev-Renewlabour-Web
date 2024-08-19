'use client';
import React, { useEffect, useState } from 'react';
import Layout from '../../../public/components/Layout';
import { AppBar, Box, Button, Tab, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import PaymentIcon from '@mui/icons-material/Payment';
import TabPanel from '@/components/settings/TabPanelCard';
import AccountDetails from '@/components/settings/Information';
import SecuritySettings from '@/components/settings/Password';
import BillingPlan from '@/components/settings/BillingPlan';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { data: session } = useSession();
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user_account?.mem_id && session) {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/information?memberId=${session?.user_account?.mem_id}`);
          setMembers(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
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
          <Box
            sx={{
              marginBottom: isMobile ? '10px' : '20px',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'space-between',
              alignItems: isMobile ? 'flex-start' : 'center',
              padding: isMobile ? '0 16px' : '0',
            }}
          >
            <Typography
              variant={isMobile ? 'h6' : 'h5'}
              fontWeight={600}
              sx={{ ...FontStyle, marginLeft: isMobile ? '0' : '2' }}
            >
              ตั้งค่าส่วนตัว
            </Typography>
          </Box>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="account and security tabs">
              <Tab icon={<PeopleIcon />} label="บัญชี" {...a11yProps(0)} />
              <Tab icon={<SecurityIcon />} label="ความปลอดภัย" {...a11yProps(1)} />
              <Tab icon={<PaymentIcon />} label="การเรียกเก็บเงินและแผน" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <AccountDetails members={members} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <SecuritySettings members={members} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <BillingPlan />
          </TabPanel>
        </Layout>
      )}
    </>
  );
};

export default Page;
