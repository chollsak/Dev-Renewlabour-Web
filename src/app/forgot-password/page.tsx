"use client";
import React, { useState } from "react";
import {
    Box,
    Button,
    Container,
    CssBaseline,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import Swal, { SweetAlertResult } from "sweetalert2";
import axios from "axios";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");

    const handleForgotPassword = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/api/sendmail`, {
                email: email,
            });

            if (response.status === 200) {
                Swal.fire({
                    title: 'สำเร็จ!',
                    text: response.data.message,
                    icon: 'success',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    timer: 1000,
                }).then((result: SweetAlertResult) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                        window.location.href = '/auth/signin'
                    }
                });

            } else {
                Swal.fire({
                    title: 'ล้มเหลว!',
                    text: response.data.message,
                    icon: 'error',
                    showConfirmButton: true,
                    allowOutsideClick: false,
                });
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                Swal.fire({
                    title: 'ล้มเหลว!',
                    text: error.response.data.message,
                    icon: 'error',
                    showConfirmButton: true,
                    allowOutsideClick: false,
                });
            } else {
                Swal.fire({
                    title: 'ล้มเหลว!',
                    text: 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ',
                    icon: 'error',
                    showConfirmButton: true,
                    allowOutsideClick: false,
                });
            }
        }
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <Toaster position="top-right" reverseOrder={false} />
            <Box>
                <Box
                    component="img"
                    src="/Logo/bg.png"
                    style={{
                        opacity: "0.8",
                        position: "fixed",
                        zIndex: "-10000",
                        width: "100%",
                        backgroundPosition: "center",
                        top: "32%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        WebkitMaskImage: "radial-gradient(circle, white, transparent 400%)", // For Safari and Chrome
                        maskImage: "radial-gradient(circle, white, transparent 100%)", // Standard
                    }}
                />
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
                                <Typography component="h4" variant="h4" fontWeight={600}>
                                    ลืมรหัสผ่าน
                                </Typography>
                                <Typography fontWeight={400} color='error'>
                                    *โปรดกรอกอีเมลที่ผูกกับผู้ใช้งานในระบบนี้ของคุณเพื่อรับลิงก์สำหรับเปลี่ยนรหัสผ่าน
                                </Typography>
                            </Box>
                            <form onSubmit={handleForgotPassword}>
                                <TextField
                                    required
                                    name="email"
                                    label="อีเมล"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    fullWidth
                                    sx={{ marginTop: 2 }}
                                />
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        marginY: 1,
                                        alignItems: "center",
                                        marginTop: "20px",
                                    }}
                                >
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        className='rounded-full mt-3 bg-gradient-to-r from-cyan-500 to-blue-500' color="primary"
                                    >
                                        ส่งอีเมลรีเซ็ตรหัสผ่าน
                                    </Button>
                                </Box>
                            </form>
                        </Paper>
                    </Stack>
                </Container>
            </Box>
        </React.Fragment>
    );
}
