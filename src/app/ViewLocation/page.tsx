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
                        <Typography variant="h5" fontWeight={600} sx={{ ...FontStyle }} marginLeft={2}>รายละเอียดเเรงงาน</Typography>
                        <IconButton color="primary" >
                            <EditIcon />
                        </IconButton>
                    </div>

                    <div className=''>
                        <Card className='flex-wrap'>
                            <CardContent className='flex gap-5 flex-wrap'>
                                <div className='w-1/5 h-fit flex flex-col gap-2 text-center justify-center items-center border-r-2 p-1'>
                                    <Avatar sx={{ width: 150, height: 150 }} className='border-4 border-[#2074d4]' alt="Person Picture" src="https://resource.nationtv.tv/uploads/images/contents/w1024/2023/08/SNbgVb6IR2MmIm76Nupj.webp?x-image-process=style/lg-webp" />
                                    <Box>
                                        <Typography variant='h6' sx={{ fontWeight: '600' }}>Sompetch Co Ltd.</Typography>
                                        <Typography sx={{ color: 'gray' }}>หจก. สมเพศ</Typography>
                                    </Box>

                                </div>

                                <div className='grid grid-rows-3 grid-flow-col gap-1 ml-6'>
                                    <div className='flex flex-col'>
                                        <div className='text-gray-500'>ข้อมูลส่วนตัวเเรงงาน</div>
                                        <div className='flex space-x-10'>

                                            <div className='flex gap-2'>
                                                <Typography className='text-gray-600'>คำนำหน้า: </Typography>
                                                <Typography fontWeight={600}>เดียวทำต่อ ตอนเช้า บ่าย เสรจภายใน 6 โมงมั้ง บอกพี่เเหลมอย่าปิดเซิฟเวอกะได้มั้ยครับ</Typography>
                                            </div>

                                            <div className='flex gap-2'>
                                                <Typography className='text-gray-600'>ชื่อเล่น: </Typography>
                                                <Typography fontWeight={600}>ชลไม่ค่อยว่างเลย พึ่งได้เข้ามาทำงาน ตอนนี้ ตี 5</Typography>
                                            </div>

                                            <div className='flex gap-2'>
                                                <Typography className='text-gray-600'>เลขประจำตัว: </Typography>
                                                <Typography fontWeight={600}>เดียวทำต่อให้ครับ </Typography>
                                            </div>

                                            <div className='flex gap-2'>
                                                <Typography className='text-gray-600'>สัญชาติ: </Typography>
                                                <Typography fontWeight={600}>ชล</Typography>
                                            </div>

                                        </div>
                                    </div>

                                    <div className='flex flex-col'>
                                        <div className='text-gray-500' >ข้อมูลที่ทำงานเบื้องต้น</div>
                                        <div className='flex space-x-10'>
                                            <div className='flex gap-2'>
                                                <Typography className='text-gray-600'>บริษัท: </Typography>
                                                <a href='#'> <Typography color={'primary'} fontWeight={600}>พึ่งได้เข้ามาทำงาน</Typography></a>
                                            </div>

                                            <div className='flex gap-2'>
                                                <Typography className='text-gray-600'>สาขา: </Typography>
                                                <Typography fontWeight={600}>หจก</Typography>
                                            </div>

                                            <div className='flex gap-2'>
                                                <Typography className='text-gray-600'>จังหวัด: </Typography>
                                                <Typography fontWeight={600}>นครพนม</Typography>
                                            </div>

                                        </div>
                                    </div>

                                    <div className='flex flex-col'>
                                        <div className='text-gray-500 mb-1'>ตรวจสอบ</div>
                                       
                                    </div>


                                </div>
                            </CardContent>
                        </Card>
                    </div>
    </Layout>
  )
}

