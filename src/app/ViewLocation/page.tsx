//Comment ตัวโตๆ
/* 
หน้านี้จะแสดงรายละเอียดบริษัทเหมือนกับหน้าแสดงรายละเอียดของแรงงาน

หน้าเพิ่มข้อมูลบริษัทไปดูที่โฟลเดอร์ AddLocation
หน้าอัพเดตข้อมูลบริษัทไปดูที่โฟลเดอร์ UpdateLocation
*/

import React from 'react'
import Layout from '../../../public/components/Layout'
import { Typography, IconButton, Card, CardContent, Avatar, Box, Chip, Dialog, DialogTitle, DialogContent, Button, DialogActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';


const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
};

export default function page (){
  return (
    <Layout>
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h5" fontWeight={600} sx={{ ...FontStyle }} marginLeft={2}>รายละเอียดที่ทำงาน</Typography>
                        <IconButton color="primary" >
                            <EditIcon />
                        </IconButton>
                    </div>

                    <div className=''>
                        <Card className='flex-wrap'>
                            <CardContent className='flex gap-5 flex-wrap'>
                                <div className='w-1/5 h-fit flex flex-col gap-2 text-center justify-center items-center border-r-2 p-1'>
                                    <Avatar sx={{ width: 150, height: 150 }} className='border-4 border-[#2074d4]' alt="Person Picture" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5fBnt3sp6tWRNQ4oAHYAdz6PfVMcKJFudtw&s" />
                                    <Box>
                                        <Typography variant='h6' sx={{ fontWeight: '600' }}>Sompetch Co Ltd.</Typography>
                                        <Typography sx={{ color: 'gray' }}>หจก. สมเพศ</Typography>
                                    </Box>

                                </div>

                                <div className='grid grid-rows-2 grid-flow-col gap-1 ml-6'>
                                    <div className='flex flex-col'>
                                        <div className='text-gray-500'>ข้อมูลที่ทำงาน </div>
                                        <div className='flex space-x-10'>

                                            <div className='flex gap-2'>
                                                <Typography className='text-gray-600'>ชื่อ: </Typography>
                                                <Typography fontWeight={600}>หจก. Sompetch</Typography>
                                            </div>

                                            <div className='flex gap-2'>
                                                <Typography className='text-gray-600'>เบอร์โทร: </Typography>
                                                <Typography fontWeight={600}>0997122060</Typography>
                                            </div>

                                            <div className='flex gap-2'>
                                                <Typography className='text-gray-600'>สาขา: </Typography>
                                                <Typography fontWeight={600}>หลัก</Typography>
                                            </div>
                                            

                                        </div>
                                    </div>

                                    <div className='flex flex-col'>
                                        <div className='text-gray-500' >ข้อมูลที่อยู่</div>
                                        <div className='flex space-x-10 '>
                                        <div className='flex gap-2'>
                                                <Typography className='text-gray-600'>เลขที่ที่อยู่: </Typography>
                                                <Typography fontWeight={600}>46525 บางรัก กรุงเทพ</Typography>
                                            </div>

                                            <div className='flex gap-2'>
                                                <Typography className='text-gray-600'>ตึก: </Typography>
                                                <Typography fontWeight={600}>Robinson Bangrak</Typography>
                                            </div>

                                            <div className='flex gap-2'>
                                                <Typography className='text-gray-600'>ชั้น 8: </Typography>
                                                <Typography fontWeight={600}># </Typography>
                                            </div>

                                            <div className='flex gap-2'>
                                                <Typography className='text-gray-600'>หมู่: </Typography>
                                                <Typography fontWeight={600}>#</Typography>
                                            </div>

                                            <div className='flex gap-2'>
                                                <Typography className='text-gray-600'>ซอย: </Typography>
                                                <Typography fontWeight={600}>#</Typography>
                                            </div>



                                        </div>
                                    </div>


                                </div>
                            </CardContent>
                        </Card>
                    </div>
    </Layout>
  )
}

