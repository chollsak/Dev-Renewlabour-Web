import Layout from '../../../public/components/Layout';
import React from 'react';
import { Typography } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Typography variant="h4">Dash board</Typography>
      <p>Welcome to the homepage. This content is displayed next to the sidebar and will not interfere with it.</p>
    </Layout>
  );
};

export default HomePage;
