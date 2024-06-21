//Comment ตัวโตๆ
/* 
หน้านี้จะแสดงรายละเอียดผู้ดูแลเหมือนกับหน้าแสดงรายละเอียดของแรงงาน

หน้าเพิ่มข้อมูลผู้ดูแลไปดูที่โฟลเดอร์ AddAdmin
หน้าอัพเดตข้อมูลผู้ดูแลไปดูที่โฟลเดอร์ UpdateAdmin
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
                        <Typography variant="h5" fontWeight={600} sx={{ ...FontStyle }} marginLeft={2}>รายละเอียดสมาชิก</Typography>
                        <IconButton color="primary" >
                            <EditIcon />
                        </IconButton>
                    </div>

                    <div className=''>
                        <Card className='flex-wrap'>
                            <CardContent className='flex gap-5 flex-wrap'>
                                <div className='w-1/5 h-fit flex flex-col gap-2 text-center justify-center items-center border-r-2 p-1'>
                                    <Avatar sx={{ width: 150, height: 150 }} className='border-4 border-[#2074d4]' alt="Person Picture" src="https://f.ptcdn.info/246/039/000/o0y748bylyLNaYypbnf-o.png" />
                                    <Box>
                                        <Typography variant='h6' sx={{ fontWeight: '600' }}>RockMan The Admin</Typography>
                                        <Typography sx={{ color: 'gray' }}>รอคเเมน เดอะ เเอดมิน</Typography>
                                    </Box>

                                </div>

                                <div className='grid grid-rows-1 grid-flow-col gap-1 ml-6'>
                                    <div className='flex flex-row justify-center items-center'>
                                    <div className='flex flex-col'>
                                        <div className='text-gray-500'>ข้อมูลเบื้องต้น </div>
                                        <div className='flex space-x-10'>

                                            <div className='flex gap-2'>
                                                <Typography className='text-gray-600'>Username: </Typography>
                                                <Typography fontWeight={600}>admin</Typography>
                                            </div>

                                            <div className='flex gap-2'>
                                                <Typography className='text-gray-600'>Email: </Typography>
                                                <Typography fontWeight={600}>admin@gmail.com</Typography>
                                            </div>

                                            <div className='flex gap-2'>
                                                <Typography className='text-gray-600'>เบอร์โทร: </Typography>
                                                <Typography fontWeight={600}>0850139916</Typography>
                                            </div>

                                            <div className='flex gap-2'>
                                                <Typography className='text-gray-600'>Line ID: </Typography>
                                                <Typography fontWeight={600}>RockmanLifeInParisWithWife</Typography>
                                            </div>
                                            

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
