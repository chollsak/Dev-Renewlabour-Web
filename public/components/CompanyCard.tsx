import React, { useState } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Box, Chip, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function InteractiveCard({ session }: { session: any }) {
  const [showDescription, setShowDescription] = useState(false);

  const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
  };

  const pro = 'PRO';

  // Construct the image URL
  const imageUrl = `${process.env.NEXT_PUBLIC_FILE_API}/file/companys/${session?.user_account[0]?.cpn_id}/logo/${session?.user_account[0]?.logo}`;

  const toggleDescription = () => {
    setShowDescription((prev) => !prev);
  };

  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        marginLeft: 2,
        width: 230,
        boxShadow: 'md',
        borderColor: 'neutral.outlinedHoverBorder',
        marginBottom:'15px'
      }}
    >
      <AspectRatio ratio="1" sx={{ width: 40, height: 40 }}>
        <Box
          component="img"
          className='rounded-full'
          src={imageUrl}
          loading="lazy"
          alt="Company Logo"
          onError={(e) => {
            e.currentTarget.src = '../Logo/logosmall.png'; // Fallback image URL
          }}
        />
      </AspectRatio>
      <CardContent>
        <Box display="flex" alignItems="center">
          <Typography
            level="title-sm"
            id="card-description"
            sx={{ ...FontStyle, fontWeight: '600' }}
          >
            {session?.user_account[0]?.cpn_n}
          </Typography>
          <IconButton sx={{width:'10px'}} onClick={toggleDescription}>
            {showDescription ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
        {showDescription && (
          <Typography
            level="body-sm"
            aria-describedby="card-description"
            mb={1}
            sx={{ color: 'text.tertiary', ...FontStyle }}
          >
            {session?.user_account[0]?.cpn_subdist} {session?.user_account[0]?.cpn_dist} {session?.user_account[0]?.cpn_prov} {session?.user_account[0]?.cpn_zip}
          </Typography>
        )}
        <div className='rounded-full flex mt-2 border p-2' style={{marginLeft:'-20px', backgroundColor:'#E5E4E2'}}>
        <Chip label={pro} className='bg-gradient-to-r from-cyan-500 to-blue-500' style={{ color: 'white'}} />
        <Typography
            fontSize={'15px'}
            id="card-description"
            sx={{ ...FontStyle, padding:'3px', marginLeft:'7px'}}
          >
            เหลือ 30 วัน
          </Typography>
        </div>
      </CardContent>
      
    </Card>
  );
}
