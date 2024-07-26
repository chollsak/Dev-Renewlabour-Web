"use client";
import React from "react";
import {
    Box,
    Button,
    Container,
    CssBaseline,
    List,
    ListItem,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CircleIcon from '@mui/icons-material/Circle';

const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
        .required('กรุณากรอกรหัสผ่านใหม่')
        .min(6, 'รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 6 ตัวอักษร')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'รหัสผ่านควรประกอบด้วยตัวอักษรพิมพ์เล็ก ตัวอักษรพิมพ์ใหญ่ และตัวเลข'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน')
        .required('กรุณายืนยันรหัสผ่าน'),
});

export default function ResetPasswordPage() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data: any) => {
        // Implement the password reset logic here
        // Replace this with your API call to reset the password
        console.log(data);
        toast.success("รหัสผ่านถูกเปลี่ยนแล้ว!");
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <Toaster position="top-right" reverseOrder={false} />
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "90vh",
                }}
            >
                <Stack mx={5} my={5}>
                    <Paper
                        elevation={3}
                        sx={{
                            my: 2,
                            mx: 2,
                            padding: 7,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Typography component="h4" variant="h4" fontWeight={400}>
                                เปลี่ยนรหัสผ่าน
                            </Typography>
                        </Box>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Controller
                                name="newPassword"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        required
                                        label="รหัสผ่านใหม่"
                                        type="password"
                                        fullWidth
                                        error={!!errors.newPassword}
                                        helperText={errors.newPassword ? errors.newPassword.message : ""}
                                        sx={{ marginTop: 2 }}
                                    />
                                )}
                            />
                            <Controller
                                name="confirmPassword"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        required
                                        label="ยืนยันรหัสผ่าน"
                                        type="password"
                                        fullWidth
                                        error={!!errors.confirmPassword}
                                        helperText={errors.confirmPassword ? errors.confirmPassword.message : ""}
                                        sx={{ marginTop: 2 }}
                                    />
                                )}
                            />
                            <Box>
                                <Typography className='mt-4'>เงื่อนไขรหัสผ่าน</Typography>
                                <List>
                                    <ListItem><CircleIcon className='w-4 mr-1' />รหัสผ่านควรมีความยาวอย่างน้อย 6 ตัวอักษร</ListItem>
                                    <ListItem><CircleIcon className='w-4 mr-1' />รหัสผ่านควรประกอบด้วยตัวอักษรพิมพ์เล็ก ตัวอักษรพิมพ์ใหญ่ และตัวเลข</ListItem>
                                    <ListItem><CircleIcon className='w-4 mr-1' />ไม่ควรใช้รหัสผ่านที่เคยใช้มาก่อน</ListItem>
                                </List>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    marginY: 1,
                                    alignItems: "center",
                                    marginTop: "20px",
                                }}
                            >
                                <Button type="submit" variant="contained" className='rounded-full bg-gradient-to-r from-cyan-500 to-blue-500' color="primary">
                                    บันทึกรหัสผ่าน
                                </Button>
                            </Box>
                        </form>
                    </Paper>
                </Stack>
            </Container>
        </React.Fragment>
    );
}
