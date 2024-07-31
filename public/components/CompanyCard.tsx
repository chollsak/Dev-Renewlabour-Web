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
  const imageUrl = session ? `${process.env.NEXT_PUBLIC_FILE_API}/file/companys/${session[0]?.cpn_id}/logo/${session[0]?.logo}` : '';

  const toggleDescription = () => {
    setShowDescription((prev) => !prev);
  };

  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        width: 270,
        marginLeft: '-3px',
        boxShadow: 'md',
        borderColor: 'neutral.outlinedHoverBorder',
        marginBottom: '15px'
      }}
    >
      <AspectRatio ratio="1" sx={{ width: 40, height: 40 }}>
        {imageUrl ? (
          <Box
            component="img"
            className='rounded-full'
            src={imageUrl}
            loading="lazy"
            alt="Company Logo"
          />
        ) : (
          <Box
            component="img"
            className='rounded-full'
            src='Logo/logosmall.png'
            loading="lazy"
            alt="Company Logo"
          />
        )}
      </AspectRatio>
      <CardContent>
        <Box display="flex" alignItems="center">
          <Typography
            level="title-lg"
            id="card-description"
            sx={{ ...FontStyle, fontWeight: '600' }}
          >
            {session ? session[0]?.cpn_n : ''}
          </Typography>
          <IconButton sx={{ width: '10px' }} onClick={toggleDescription}>
            {showDescription ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
        {showDescription && (
          <Typography
            level="body-md"

            aria-describedby="card-description"
            mb={1}
            sx={{ color: 'text.tertiary', ...FontStyle, marginLeft: '-40px', width: '200px', marginTop: '10px' }}
          >
            {session ? session[0]?.cpn_subdist : ''} {session ? session[0]?.cpn_dist : ''} {session ? session[0]?.cpn_prov : ''} {session ? session[0]?.cpn_zip : ''}
          </Typography>
        )}
        <div
          className="rounded-full flex mt-3 border p-2"
          style={{
            marginLeft: '-20px',
            width: 'fit-content',
            height: '40px',
            backgroundColor: '#E5E4E2',
            alignItems: 'center', // Center vertically
            justifyContent: 'center' // Center horizontally
          }}
        >
          <Chip
            label={pro}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 w-fit h-fit p-1"
            style={{ color: 'white' }}
          />
          <Typography
            fontSize={'15px'}
            id="card-description"
            sx={{ ...FontStyle, marginLeft: '7px' }}
          >
            เหลือ 30 วัน
          </Typography>
        </div>

      </CardContent>

    </Card>
  );
}
