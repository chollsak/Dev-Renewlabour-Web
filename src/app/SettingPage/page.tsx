'use client';

import React, { useState } from 'react';
import Layout from '../../../public/components/Layout';
import { TextField, Typography, Card, CardContent, Avatar, Box, Button, InputAdornment, IconButton, Stack, Grid, List, ListItem } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PeopleIcon from '@mui/icons-material/People';
import CircleIcon from '@mui/icons-material/Circle';

const FontStyle: React.CSSProperties = {
  fontFamily: 'Kanit, sans-serif',
};

const mockUserData = {
  username: 'john_doe',
  email: 'john@example.com',
  phone: '123-456-7890',
  lineId: 'johnlineid',
  company: 'Example Corp',
  branch: 'Main Branch',
  province: 'Bangkok',
  name: 'John',
  lName:'Wick',
  password: '123456',
};

export default function Page() {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAccount, setShowAccount] = useState(true);
  const [showSecurity, setShowSecurity] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChangeOldPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(event.target.value);
  };

  const handleChangeNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleChangeConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = () => {
    if (oldPassword !== mockUserData.password) {
      setPasswordError('รหัสผ่านเดิมไม่ถูกต้อง');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน');
      return;
    }

    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
  };

  const handleShowAccount = () => {
    setShowAccount(true);
    setShowSecurity(false);
  };

  const handleShowSecurity = () => {
    setShowAccount(false);
    setShowSecurity(true);
  };

  return (
    <Layout>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5" fontWeight={600} sx={{ ...FontStyle, marginLeft: 2 }}>
          ตั้งค่าส่วนตัว
        </Typography>
      </div>

      <div className='flex gap-2 ml-4 mb-4'>
        <Button variant="contained" onClick={handleShowAccount}>
          <PeopleIcon className=' mr-2' />
          บัญชี
        </Button>

        <Button variant="contained" onClick={handleShowSecurity}>
          <PeopleIcon className='mr-2' />
          ความปลอดภัย
        </Button>
      </div>

      <Card className=''>
        <CardContent className=''>
          {showAccount && (
            <div className='flex m-4'>
              <Avatar sx={{ width: 150, height: 150 }} className='border-4 border-[#2074d4]' alt="Person Picture" src="https://media.licdn.com/dms/image/D4E03AQGPMRJkyA8GGg/profile-displayphoto-shrink_200_200/0/1698657454419?e=2147483647&v=beta&t=nFBkvYjCc-h0YKsEuTHzRSX-UZVY2ix512kHshTHUyE" />
              <Stack spacing={1} className='m-6'>

                <Typography variant="h6" fontWeight={600} sx={{ ...FontStyle, marginLeft: 2 }}>
                  Username: {mockUserData.username}
                </Typography>
                  <div className='m-6'>
                    <Button variant='contained' className='mr-4'>อัพโหลดรูปใหม่</Button>
                    <Button variant='contained'>รีเซ็ต</Button>
                  </div>

                  <div>
                    อนุญาต JPG, GIF or PNG, Max size 800K
                  </div>

              </Stack>


            </div>
          )}
          <div className='ml-4 mr-4 flex flex-col gap-4'>
            {showAccount && (
              <div className='flex flex-col'>
                <div className='text-gray-500 mb-3'>ข้อมูลเบื้องต้น</div>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      size='small'
                      label="ชื่อจริง"
                      variant="outlined"
                      fullWidth
                      defaultValue={mockUserData.name}
                      sx={{ marginBottom: '10px' }}
                    />                    
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      size='small'
                      label="นามสกุล"
                      fullWidth
                      variant="outlined"
                      defaultValue={mockUserData.lName}
                      sx={{ marginBottom: '10px' }}
                    />                    
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      size='small'
                      label="Email"
                      fullWidth
                      variant="outlined"
                      defaultValue={mockUserData.email}
                      sx={{ marginBottom: '10px' }}
                    />                    
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      size='small'
                      label="เบอร์โทร"
                      fullWidth
                      variant="outlined"
                      defaultValue={mockUserData.phone}
                      sx={{ marginBottom: '10px' }}
                    />                    
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      size='small'
                      label="LineID"
                      fullWidth
                      variant="outlined"
                      defaultValue={mockUserData.lineId}
                      sx={{ marginBottom: '10px' }}
                    />                    
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      size='small'
                      label="จังหวัด"
                      fullWidth
                      variant="outlined"
                      defaultValue={mockUserData.province}
                      sx={{ marginBottom: '10px' }}
                    />                    
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      size='small'
                      label="บริษัท"
                      fullWidth
                      variant="outlined"
                      defaultValue={mockUserData.company}
                      sx={{ marginBottom: '10px' }}
                    />                    
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      size='small'
                      label="สาขา"
                      fullWidth
                      variant="outlined"
                      defaultValue={mockUserData.branch}
                      sx={{ marginBottom: '10px' }}
                    />                    
                  </Grid>
                  
                </Grid>
                <Button variant="contained" className='mt-3' color="primary" onClick={handleSubmit}>
                  บันทึกข้อมูล
                </Button>
              </div>
            )}
            {showSecurity && (
              <div className='flex flex-col'>
               <Typography variant="h5" fontWeight={600} sx={{ ...FontStyle}} className='m-4'>
                เปลี่ยนรหัสผ่าน
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="รหัสผ่านเดิม"
                    className='w-1/2'
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    value={oldPassword}
                    onChange={handleChangeOldPassword}
                    sx={{ marginBottom: '10px' }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  </Grid>
                  <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="รหัสผ่านใหม่"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={handleChangeNewPassword}
                    sx={{ marginBottom: '10px' }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  </Grid>
                  <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="ยืนยันรหัสผ่าน"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={handleChangeConfirmPassword}
                    sx={{ marginBottom: '10px' }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  </Grid>
                  
                </Grid>
                {passwordError && (
                  <Typography variant="body2" color="error">
                    {passwordError}
                  </Typography>
                )}
                <Box>
                  <Typography className='mt-4'>เงื่อนไขรหัสผ่าน</Typography>
                  <List>
                    <ListItem><CircleIcon className='w-4 mr-1'/>รหัสผ่านควรมีความยาวอย่างน้อย 6 ตัวอักษร</ListItem>
                    <ListItem><CircleIcon className='w-4 mr-1'/>รหัสผ่านควรประกอบด้วยตัวอักษรพิมพ์เล็ก ตัวอักษรพิมพ์ใหญ่ และตัวเลข</ListItem>
                    <ListItem><CircleIcon className='w-4 mr-1'/>ไม่ควรใช้รหัสผ่านที่เคยใช้มาก่อน</ListItem>
                  </List>
                </Box>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  บันทึกรหัสผ่าน
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
}
