import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Box, Button, Grid, IconButton, InputAdornment, List, ListItem, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CircleIcon from '@mui/icons-material/Circle';
import { FontStyle } from './mockUserData';
import { comparePassword } from '@/core/hashpassword';
import useMediaQuery from '@mui/material/useMediaQuery';

const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('กรุณากรอกรหัสผ่านเดิม'),
    newPassword: Yup.string()
        .required('กรุณากรอกรหัสผ่านใหม่')
        .min(6, 'รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 6 ตัวอักษร')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'รหัสผ่านควรประกอบด้วยตัวอักษรพิมพ์เล็ก ตัวอักษรพิมพ์ใหญ่ และตัวเลข'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน')
        .required('กรุณายืนยันรหัสผ่าน'),
});

interface UserFormProps {
    members: any;
}

const SecuritySettings: React.FC<UserFormProps> = ({ members }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isMobile = useMediaQuery('(max-width:600px)');
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data: any) => {
        const isOldPasswordValid = await comparePassword(data.oldPassword, members[0].password);

        if (!isOldPasswordValid) {
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: 'รหัสผ่านเดิมไม่ถูกต้อง',
            });
            return;
        }

        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_API}/api/information?memberId=${members[0].mem_id}&type=password`, {
                newPassword: data.newPassword,
            });
            if (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'สำเร็จ!',
                    text: 'รหัสผ่านถูกเปลี่ยนเรียบร้อยแล้ว',
                });
                reset();
            }

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: 'ไม่สามารถเปลี่ยนรหัสผ่านได้',
            });
        }
    };

    return (
        <div className='flex flex-col'>
            <Typography variant="h5" fontWeight={600} sx={{ ...FontStyle }} className='m-4'>
                เปลี่ยนรหัสผ่าน
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Controller
                            name="oldPassword"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="รหัสผ่านเดิม"
                                    className='w-1/2'
                                    variant="outlined"
                                    type={showPassword ? "text" : "password"}
                                    error={!!errors.oldPassword}
                                    helperText={errors.oldPassword ? errors.oldPassword.message : ''}
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
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            name="newPassword"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="รหัสผ่านใหม่"
                                    variant="outlined"
                                    type={showPassword ? "text" : "password"}
                                    error={!!errors.newPassword}
                                    helperText={errors.newPassword ? errors.newPassword.message : ''}
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
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            name="confirmPassword"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="ยืนยันรหัสผ่าน"
                                    variant="outlined"
                                    type={showPassword ? "text" : "password"}
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
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
                            )}
                        />
                    </Grid>
                </Grid>
                <Box>
                    <Typography className='mt-4'>เงื่อนไขรหัสผ่าน</Typography>
                    <List>
                        <ListItem><CircleIcon className='w-4 mr-1' />รหัสผ่านควรมีความยาวอย่างน้อย 6 ตัวอักษร</ListItem>
                        <ListItem><CircleIcon className='w-4 mr-1' />รหัสผ่านควรประกอบด้วยตัวอักษรพิมพ์เล็ก ตัวอักษรพิมพ์ใหญ่ และตัวเลข</ListItem>
                        <ListItem><CircleIcon className='w-4 mr-1' />ไม่ควรใช้รหัสผ่านที่เคยใช้มาก่อน</ListItem>
                    </List>
                </Box>
                <Button type="submit" variant="contained" className='rounded-full bg-gradient-to-r from-cyan-500 to-blue-500' color="primary">
                    บันทึกรหัสผ่าน
                </Button>
            </form>
            <div className='w-60 h-80' style={{
          display: isMobile ? 'block' : 'none'
        }}>
          {/* Display bugs empty div */}
        </div>
        </div>
    );
};

export default SecuritySettings;
