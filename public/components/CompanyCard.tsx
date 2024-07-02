import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Box } from '@mui/material';

export default function InteractiveCard({ session }: { session: any }) {

  const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
  };

  // Log the session object for debugging
  console.log('Session data:', session);

  // Construct the image URL
  const imageUrl = `${process.env.NEXT_PUBLIC_FILE_API}/file/companys/${session?.user_account[0]?.cpn_id}/logo/${session?.user_account[0]?.logo}`;

  // Log the constructed image URL for debugging
  console.log('Image URL:', imageUrl);

  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        marginLeft: 2,
        width: 230,
        boxShadow: 'md', 
        borderColor: 'neutral.outlinedHoverBorder',
      }}
    >
      <AspectRatio ratio="1" sx={{ width: 50 }}>
        <Box
          component="img"
          src={imageUrl}
          loading="lazy"
          alt="Company Logo"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/50'; // Fallback image URL
          }}
        />
      </AspectRatio>
      <CardContent>
        <Typography level="title-lg" id="card-description" sx={{ ...FontStyle }}>
          {session?.user_account[0]?.cpn_n}
        </Typography>
        <Typography
          level="body-sm"
          aria-describedby="card-description"
          mb={1}
          sx={{ color: 'text.tertiary', ...FontStyle }}
        >
          {session?.user_account[0]?.cpn_subdist} {session?.user_account[0]?.cpn_dist} {session?.user_account[0]?.cpn_prov} {session?.user_account[0]?.cpn_zip}
        </Typography>
      </CardContent>
    </Card>
  );
}
