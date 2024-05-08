"use client";
import React, { useState } from "react";
import {
    Box,
    Button,
    Container,
    CssBaseline,
    GlobalStyles,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Theme,
    ThemeProvider,
    Tooltip,
    Typography,
    createTheme,
    makeStyles,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { Fingerprint, Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";
import PageLoader from "../../../../public/components/Loading/Loading2";



export default function Page() {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const tempRouter = () => {
        window.location.href = "/employees";
    }

    const FontStyle: React.CSSProperties = {
        fontFamily: 'Kanit, sans-serif',
    };
    

    return (
        <React.Fragment>
            <CssBaseline />
            <Toaster position="top-right" reverseOrder={false} />
            <Box>
                <img
                    style={{
                        backgroundImage: 'url(/BackGround/bg.png)',
                        opacity: '0.8',
                        position: 'fixed',
                        zIndex: '-10000',
                        backgroundSize: 'cover',
                        width: '100vw',
                        backgroundPosition: 'center',
                        overflow: 'hidden',
                        height: '100vh',
                        margin: 0,
                        padding: 0,
                    }}
                />
                <Container
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '80vh',
                        width: '100vw',
                        maxWidth: '1024px',
                        padding: 0,
                        margin: '0 auto',
                        zIndex: 10000,
                    }}
                >
                    <Stack mx={5} my={5} sx={{}}>
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
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    mb: 2,
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignContent: 'cemter',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Typography
                                        component="h4"
                                        variant="h6"
                                        fontWeight={550}
                                        sx={FontStyle}
                                    >
                                        เข้าสู่ระบบ
                                    </Typography>
                                    <Box
                                        component="img"
                                        sx={{ width: '150px', marginLeft: '10px' }}
                                        src="/Logo/logo.png"
                                    />
                                </div>
                            </Box>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }}
                            >
                                <form /*onSubmit={handleLogin}*/>
                                    <TextField
                                        /*required*/
                                        name="username"
                                        label="Username"
                                        type="text"
                                        /*inputRef={username}*/
                                        fullWidth
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField
                                        /*required*/
                                        name="password"
                                        label="รหัสผ่าน"
                                        type={showPassword ? 'text' : 'password'}
                                        // inputRef={password}
                                        fullWidth
                                        sx={{ marginTop: 2 }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            marginY: 1,
                                            alignItems: 'center',
                                            marginBottom: '-40px',
                                            marginTop: '20px',
                                        }}
                                    >
                                        <Tooltip title="เข้าสู่ระบบเลย!">
                                            <Button
                                                onClick={tempRouter}
                                                // type="submit"
                                                variant="contained"
                                                sx={{ width: '80px', border: '1px solid #0e74bc' }}
                                            >
                                                <Fingerprint />
                                                <Typography
                                                    sx={{
                                                        fontWeight: '600',
                                                        color: 'white',
                                                        fontSize: '10px',
                                                        marginRight: '10px',
                                                    }}
                                                >
                                                    Login
                                                </Typography>
                                            </Button>
                                        </Tooltip>
                                    </Box>
                                </form>
                            </div>
                        </Paper>
                    </Stack>
                </Container>
            </Box>
        </React.Fragment>
    );
}


