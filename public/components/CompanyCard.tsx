import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';




const MockUpData = [
  {
    id: 1,
    image: 'https://scontent.fbkk5-7.fna.fbcdn.net/v/t1.15752-9/438221068_979603603114128_7624034883937576239_n.png?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGZmtnuyi5UTFwNkWoHbrGPO8KMxOClbyM7wozE4KVvI_HQYGNIbDC9MV6rleqDm9hlWMgoN9aIyxUfcbdVbsMc&_nc_ohc=aHfINUKAHrwQ7kNvgFxWUp-&_nc_ht=scontent.fbkk5-7.fna&oh=03_Q7cD1QElWEp5wgLe6XMscfkRxD5XlMOHdBqfEpwoTEqLAJ3f8Q&oe=665BD5B1',
    title: 'Guru it-solution',
    location: 'เขตบางคอแหลม กรุงเทพมหานคร 10120',
    description: 'IT Solution, IT Maintenance',
  },
];

export default function InteractiveCard() {

  const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
  };

  
  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        marginLeft: 2,
        width: 230,
        boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder',
      }}
    >
      <AspectRatio ratio="1" sx={{ width: 50 }}>
        <img
          src={MockUpData[0].image}
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <CardContent>
        <Typography level="title-lg" id="card-description" sx={{...FontStyle}}>
          {MockUpData[0].title}
        </Typography>
        <Typography level="body-sm" aria-describedby="card-description" mb={1} sx={{ color: 'text.tertiary' ,...FontStyle}}>
            {MockUpData[0].location}
        </Typography>
        <Chip
          variant="outlined"
          color="primary"
          size="sm"
          sx={{ pointerEvents: 'none' ,...FontStyle}}
        >
          {MockUpData[0].description}
        </Chip>
      </CardContent>
    </Card>
  );
}