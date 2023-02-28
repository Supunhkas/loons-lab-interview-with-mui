import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockIcon from "@mui/icons-material/Lock";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import bgImage from "../assets/background.jpg";

import { user } from "../database/data";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const triggerPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    const currentUser = user.find((user) => user.email === email);

    if (!currentUser || currentUser.password !== password) {
      alert("Invalid email or password");
      return;
    }

    navigate("home");
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          height: "100vh",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <CssBaseline />

          <Box
            display="flex"
            flexDirection="column"
            maxWidth={400}
            alignItems="center"
            justifyContent="center"
            padding={3}
            borderRadius={5}
            boxShadow={"5px 5px 10px #ccc"}
            bgcolor="#fffde7"
            sx={{
              ":hover": {
                boxShadow: "10px 10px 20px #ccc",
              },
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#e65100", fontSize: "large" }}>
              <AccountCircleIcon fontSize="large" />
            </Avatar>

            <Typography component="h1" variant="h5">
              Welcome back
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"} // Show/hide password based on `showPassword` state
                id="password"
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {showPassword ? (
                        <VisibilityIcon
                          onClick={triggerPassword}
                          cursor={"pointer"}
                        />
                      ) : (
                        <VisibilityOffIcon
                          onClick={triggerPassword}
                          cursor={"pointer"}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="warning"
                sx={{ marginTop: 3, marginBottom: 2, borderRadius: 3 }}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}
