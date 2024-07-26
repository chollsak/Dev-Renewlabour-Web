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
import Swal from "sweetalert2";
import axios from "axios";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");

    const handleForgotPassword = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/api/sendmail`, {
                email: email,
            });

            if (res) {
                Swal.fire('Success', 'ผ่าน', 'success');

            } else {
                Swal.fire('Error', 'ไม่ผ่าน', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'An unexpected error occurred', 'error');
        }
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
                                ลืมรหัสผ่าน
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
        </React.Fragment>
    );
}
