"use client";
import React, { useState, MouseEvent, FormEvent } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Link,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Swal, { SweetAlertResult } from "sweetalert2";
import { Fingerprint, Visibility, VisibilityOff } from "@mui/icons-material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:600px)');
  
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
      rememberMe,
    });

    if (result?.error) {
      Swal.fire({
        icon: "error",
        title: "เข้าสู่ระบบ",
        text: 'รหัสผ่านหรือชื่อผู้ใช้ไม่ถูกต้อง!',
        showConfirmButton: true,
        allowOutsideClick: false,
      });
    } else if (result?.ok) {
      Swal.fire({
        icon: "success",
        title: "เข้าสู่ระบบ",
        text: 'คุณเข้าสู่ระบบได้สำเร็จ!',
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 1000,
      }).then((result: SweetAlertResult) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          window.location.href = "/";
        }
      });
    }
  };

  return (
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
            top: isMobile ? "10%" : "32%",
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
            width: "100vw",
            maxWidth: "1024px",
            padding: 0,
            margin: "0 auto",
            zIndex: 10000,
          }}
        >
          <Stack mx={isMobile ? 2 : 5} my={5}>
            <Paper
              elevation={3}
              sx={{
                my: 2,
                mx: 2,
                padding: isMobile ? 4 : 7,
                width: isMobile ? "90%" : "auto",
                marginTop: isMobile ?'-100px' : ''
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  className="mb-1"
                  sx={{ width: isMobile ? "0px" : "150px", marginTop: "-20px" }}
                  src="/Logo/logo.png"
                />
                <Typography
                  component="h4"
                  variant={isMobile ? "h5" : "h4"}
                  fontWeight={400}
                  sx={{ fontFamily: "Kanit, sans-serif", fontSize: isMobile ? "24px" : "32px" }}
                >
                  เข้าสู่ระบบ
                </Typography>
              </Box>
              <form onSubmit={handleLogin}>
                <TextField
                  required
                  name="username"
                  label="Username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  fullWidth
                  sx={{ marginTop: 2 }}
                />
                <TextField
                  required
                  name="password"
                  label="รหัสผ่าน"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  sx={{ marginTop: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: isMobile ? "center" : "space-between",
                    alignItems: "center",
                    marginTop: 2,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="ให้ฉันอยู่ในระบบต่อไป"
                    sx={{ marginTop: 1 }}
                  />
                  <Link href="/forgot-password" variant="body2" sx={{ marginTop: isMobile ? 1 : 2 }}>
                    ลืมรหัสผ่าน?
                  </Link>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginY: 1,
                    alignItems: "center",
                    marginBottom: "-40px",
                    marginTop: "20px",
                  }}
                >
                  <Tooltip title="เข้าสู่ระบบเลย!">
                    <Button
                      type="submit"
                      variant="contained"
                      className="rounded-full mb-4 bg-gradient-to-r from-cyan-500 to-blue-500"
                      sx={{
                        width: isMobile ? "100%" : "600px",
                        height: "50px",
                        border: "1px solid #0e74bc",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: isMobile ? "16px" : "20px",
                          marginRight: "10px",
                        }}
                      >
                        เข้าสู่ระบบ
                      </Typography>
                      <Fingerprint />
                    </Button>
                  </Tooltip>
                </Box>
              </form>
            </Paper>
          </Stack>
        </Container>
      </Box>
    </React.Fragment>
  );
}
