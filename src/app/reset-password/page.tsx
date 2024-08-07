"use client";
import React, { useEffect, useState, Suspense } from "react";
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
import axios from "axios";
import { useSearchParams } from 'next/navigation';
import PageLoader from "../../../public/components/Loading/Loading2";
import moment from "moment";
import Swal, { SweetAlertResult } from "sweetalert2";

const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
        .required('กรุณากรอกรหัสผ่านใหม่')
        .min(6, 'รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 6 ตัวอักษร')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'รหัสผ่านควรประกอบด้วยตัวอักษรพิมพ์เล็ก ตัวอักษรพิมพ์ใหญ่ และตัวเลข'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน')
        .required('กรุณายืนยันรหัสผ่าน'),
});

function ResetPasswordPage() {
    const [dataToken, setDataToken] = useState<any[]>([])
    const [tokenUsed, setTokenUsed] = useState(false);
    const searchParams = useSearchParams();
    const query = new URLSearchParams(searchParams.toString());
    const token = query.get('token');
    const [expired, setExpired] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/resetpasswords?token=${token}`);
                const tokenData = response.data;

                if (!tokenData.length) {
                    setTokenUsed(true);
                } else if (moment().isAfter(moment(tokenData[0].expires_at, 'YYYY-MM-DD HH:mm'))) {
                    setExpired(true);
                } else {
                    setDataToken(tokenData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [token]);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data: any) => {
        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_API}/api/resetpasswords?token=${token}`, {
                newPassword: data.newPassword,
            });
            if (response) {
                Swal.fire({
                    icon: "success",
                    title: "เปลี่ยนรหัสผ่าน",
                    text: 'คุณเปลี่ยนรหัสผ่านได้สำเร็จ!',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    timer: 1000,
                }).then((result: SweetAlertResult) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                        window.location.href = "/auth/signin";
                    }
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

    const requestNewToken = () => {
        window.location.href = '/forgot-password'
    };

    return (
        <>
            {tokenUsed ? (
                <React.Fragment>
                    <CssBaseline />
                    <Box>
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
                                            Token ถูกใช้ไปแล้ว
                                        </Typography>
                                        <Typography component="p" variant="body1">
                                            กรุณาขอ Token สำหรับเปลี่ยนรหัสผ่านใหม่
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            onClick={requestNewToken}
                                            sx={{ marginTop: 2 }}
                                        >
                                            ขอ Token ใหม่
                                        </Button>
                                    </Box>
                                </Paper>
                            </Stack>
                        </Container>
                    </Box>
                </React.Fragment>
            ) : (!dataToken || dataToken.length === 0) && !expired ? (
                <PageLoader />
            ) : (
                <React.Fragment>
                    <CssBaseline />
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
                                    {expired ? (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Typography component="h4" variant="h4" fontWeight={400}>
                                                Token หมดอายุ
                                            </Typography>
                                            <Typography component="p" variant="body1">
                                                กรุณาขอ Token สำหรับเปลี่ยนรหัสผ่านใหม่
                                            </Typography>
                                            <Button
                                                variant="contained"
                                                onClick={requestNewToken}
                                                sx={{ marginTop: 2 }}
                                            >
                                                ขอ Token ใหม่
                                            </Button>
                                        </Box>
                                    ) : (
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
                                        </Box>
                                    )}
                                </Paper>
                            </Stack>
                        </Container>
                    </Box>
                </React.Fragment>
            )}
        </>
    );
}

export default function ResetPasswordPageWrapper() {
    return (
        <Suspense fallback={<PageLoader />}>
            <ResetPasswordPage />
        </Suspense>
    );
}
