'use client';

import React, { useState } from 'react';
import Layout from '../../../public/components/Layout';
import { TextField, Typography, Card, CardContent, Avatar, Box, Button, InputAdornment, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation'; // Corrected import
import { Visibility, VisibilityOff } from '@mui/icons-material';


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
  password: '123456' // Corrected field name
};

export default function Page() {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [showPassword, setShowPassword] = useState(false);

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
    // Validate old and new passwords
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

    // If validation passes, handle password change logic
    // Example: Call an API to update the password
    // You can add your own logic here based on your authentication system

    // Clear password fields and errors after successful submission
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
  };

  return (
    <Layout>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5" fontWeight={600} sx={{ ...FontStyle, marginLeft: 2 }}>
          ตั้งค่าส่วนตัว
        </Typography>
      </div>
      <Card className='flex-wrap'>
        <CardContent className='flex gap-5 flex-wrap'>
          <div className='w-1/5 h-fit flex flex-col gap-2 text-center justify-center items-center border-r-2 p-1'>
            <Avatar sx={{ width: 150, height: 150 }} className='border-4 border-[#2074d4]' alt="Person Picture" src="/path/to/image" /> {/* Corrected src attribute */}
            <Box>
             
              <TextField
                label="ชื่อ"
                variant="outlined"
                defaultValue={mockUserData.name}
                sx={{ marginBottom: '10px' }}
              />
            </Box>
          </div>
          <div className='ml-6 flex flex-col gap-4'>
            <div className='flex flex-col'>
              <div className='text-gray-500 mb-3'>ข้อมูลเบื้องต้น</div>
              <div className='flex flex-row gap-2 flex-wrap'>
                <TextField
                  label="Username"
                  variant="outlined"
                  defaultValue={mockUserData.username}
                  sx={{ marginBottom: '10px' }}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  defaultValue={mockUserData.email}
                  sx={{ marginBottom: '10px' }}
                />
                <TextField
                  label="เบอร์โทร"
                  variant="outlined"
                  defaultValue={mockUserData.phone}
                  sx={{ marginBottom: '10px' }}
                />
                <TextField
                  label="Line ID"
                  variant="outlined"
                  defaultValue={mockUserData.lineId}
                  sx={{ marginBottom: '10px' }}
                />
              </div>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                บันทึกข้อมูล
              </Button>
            </div>
            <div className='flex flex-col'>
              <div className='text-gray-500 mb-3'>เปลี่ยนรหัสผ่าน</div>
              <div className='flex flex-row gap-2 flex-wrap'>
                <TextField
                  label="รหัสผ่านเดิม"
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
                <TextField
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
                <TextField
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
              </div>
              {passwordError && (
                <Typography variant="body2" color="error">
                  {passwordError}
                </Typography>
              )}
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                บันทึกรหัสผ่าน
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
}
