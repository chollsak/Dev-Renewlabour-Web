"use client";
import React, { useState } from "react";
import { useRef } from "react";
import { signIn, useSession } from "next-auth/react";
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
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import ReactHotToast from "../../core/style/libs/react-hot-toast";
import GlobalStyling from "../../core/theme/globalStyles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from 'sweetalert2';
export default function Page() {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const { status } = useSession()
  let theme = createTheme();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()
    const result = await signIn("credentials", {
      username: username.current?.value,
      password: password.current?.value,
      redirect: false, // Prevent automatic redirection
    });

    console.log(result)

    if (result?.error) {
       
      Swal.fire({
        title: 'Login Failed!',
        text: 'Username or password is incorrect.',
        icon: 'error',
        confirmButtonText: 'Try Again'
    });// Display error message as a toast
    } else {
     
      Swal.fire({
        title: 'Login Successful!',
        text: 'You have successfully logged in.',
        icon: 'success',
        confirmButtonText: 'OK'
    });// Display success message
      setTimeout(() => {

        window.location.href = "/";
      }, 1000);

    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <ThemeProvider theme={theme}>
      <ReactHotToast>
        <CssBaseline />
        <GlobalStyles styles={() => GlobalStyling(theme) as any} />
        <Toaster position="top-right" reverseOrder={false} />
        <Box sx={{ backgroundColor: "#630e0e", display: "flex", justifyContent: "start", pl: 5 }}>
          <Box component="img" src="/images/logos/logo-dark.png" />
        </Box>
        <Box sx={{ background: `url("/images/background/bg-about.jpg")`, minHeight: '90vh', }}>
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '60vh',
              width: '100vw', // ให้ Container ขยายครอบคลุมทั้งหน้าจอ
              maxWidth: '1024px', // จำกัดความกว้างสูงสุดของ Container
              padding: 0,
              margin: '0 auto', // จัดให้อยู่ตรงกลางหน้าจอ
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
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
                  <Typography component="h1" variant="h3">IT Service Request</Typography>
                </Box>
                <form onSubmit={handleLogin}>
                  <TextField required name="username" label="Username" type="text" inputRef={username} fullWidth sx={{ marginTop: 2 }} />
                  <TextField
                    required
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"} // Toggle type based on state
                    inputRef={password}
                    fullWidth
                    sx={{ marginTop: 2 }}
                    InputProps={{ // Add the end adornment for password visibility toggle
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={togglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Box sx={{ display: "flex", justifyContent: "center", marginY: 2 }}>
                    <Button type="submit" variant="contained" color="primary" size="large" fullWidth>Login</Button>
                  </Box>
                </form>
              </Paper>
            </Stack>
          </Container>
        </Box>
      </ReactHotToast>
    </ThemeProvider>
  );
}
