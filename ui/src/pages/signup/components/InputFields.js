import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { NavigationRoutes } from "../../../constants";

const InputFields = () => {
  const [email, setEmail] = useState("");
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const [username, setUsername] = useState("");
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const navigate = useNavigate();

  const signup = async () => {
    let eaddress = email;
    let uname = username;
    let pword = password;
    const response = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: uname,
        password: pword,
        email_address: eaddress,
      }),
    });
    if (response.status === 201) {
      alert("Account created, please login")
    }
    return await response.json();
  };

  const signupClick = () => {
    signup();
    setEmail("");
    setUsername("");
    setPassword("");
    navigate(NavigationRoutes.Login);
  };

  return (
    <Box
      sx={{
        width: 500,
        maxWdith: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 3,
        }}
      >
        <TextField
          fullWidth
          label="Email Address"
          value={email}
          onChange={handleEmailChange}
          variant="outlined"
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 3,
        }}
      >
        <TextField
          fullWidth
          label="Username"
          value={username}
          onChange={handleUsernameChange}
          variant="outlined"
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 3,
        }}
      >
        <TextField
          fullWidth
          label="Password"
          value={password}
          onChange={handlePasswordChange}
          variant="outlined"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 3,
        }}
      >
        <Button
          variant="contained"
          sx={{
            textAlign: "center",
            width: 150,
            my: 2,
            color: "white",
            display: "block",
          }}
          onClick={() => signupClick()}
        >
          Signup
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>Already have an account?</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 3,
        }}
      >
        <Button
          variant="contained"
          sx={{
            textAlign: "center",
            width: 150,
            my: 2,
            color: "white",
            display: "block",
          }}
          onClick={() => navigate(NavigationRoutes.Login)}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};
export default InputFields;
