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
  Tooltip,
  Typography,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { Fingerprint, Visibility, VisibilityOff } from "@mui/icons-material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
      rememberMe
    });

    if (result?.error) {
      toast.error("รหัสผ่านหรือชื่อผู้ใช้ไม่ถูกต้อง!");
    } else if (result?.ok) {
      toast.success("เข้าสู่ระบบสำเร็จ!");
      window.location.href = "/";
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Toaster position="top-right" reverseOrder={false} />
      <Box>
        <Box component="img"
          src="/Logo/bg.png"
          style={{
            opacity: "0.8",
            position: "fixed",
            zIndex: "-10000",
            backgroundSize: "cover",
            width: "100vw",
            backgroundPosition: "center",
            overflow: "hidden",
            height: "100vh",
            margin: 0,
            padding: 0,
          }}
        />
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
            width: "100vw",
            maxWidth: "1024px",
            padding: 0,
            margin: "0 auto",
            zIndex: 10000,
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
                <div>
                  <Box
                    component="img"
                    className="mb-1"
                    sx={{ width: "150px", marginTop:'-20px' }}
                    src="/Logo/logo.png"
                  />
                  <Typography
                    component="h4"
                    variant="h4"
                    fontWeight={400}
                    sx={{ fontFamily: "Kanit, sans-serif" }}
                  >
                    เข้าสู่ระบบ
                  </Typography>
                </div>
              </Box>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
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
                        className="rounded-full mb-4 "
                        sx={{ width: "600px", height: '50px', border: "1px solid #0e74bc" }}
                      >
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: "20px",
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
              </div>
            </Paper>
          </Stack>
        </Container>
      </Box>
    </React.Fragment>
  );
}
