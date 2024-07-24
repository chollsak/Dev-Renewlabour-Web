import React, { useState } from 'react';
import { Box, Button, Grid, IconButton, InputAdornment, List, ListItem, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CircleIcon from '@mui/icons-material/Circle';
import { mockUserData, FontStyle } from './mockUserData';

const SecuritySettings: React.FC = () => {
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

    return (
        <div className='flex flex-col'>
            <Typography variant="h5" fontWeight={600} sx={{ ...FontStyle }} className='m-4'>
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
                                    <IconButton onClick={handleClickShowPassword} edge="end">
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
                                    <IconButton onClick={handleClickShowPassword} edge="end">
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
                                    <IconButton onClick={handleClickShowPassword} edge="end">
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
                    <ListItem><CircleIcon className='w-4 mr-1' />รหัสผ่านควรมีความยาวอย่างน้อย 6 ตัวอักษร</ListItem>
                    <ListItem><CircleIcon className='w-4 mr-1' />รหัสผ่านควรประกอบด้วยตัวอักษรพิมพ์เล็ก ตัวอักษรพิมพ์ใหญ่ และตัวเลข</ListItem>
                    <ListItem><CircleIcon className='w-4 mr-1' />ไม่ควรใช้รหัสผ่านที่เคยใช้มาก่อน</ListItem>
                </List>
            </Box>
            <Button variant="contained" className='rounded-full bg-gradient-to-r from-cyan-500 to-blue-500' color="primary" onClick={handleSubmit}>
                บันทึกรหัสผ่าน
            </Button>
        </div>
    );
};

export default SecuritySettings;
