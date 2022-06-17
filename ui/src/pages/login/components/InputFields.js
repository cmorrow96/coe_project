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
import { AuthContext } from "../../../contexts";
import { LoginService, TokenService } from "../../../services";

const InputFields = () => {
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

  const { dispatch } = AuthContext.useLogin();

  const loginClick = async () => {
    const response = await LoginService.login(username, password);
    if (response.status === 200) {
      const loginResult = await response.json();
      TokenService.setAuth(loginResult);
      dispatch({
        type: "login",
        ...loginResult,
      });
      navigate(NavigationRoutes.Home);
    } else {
      alert("Invalid login details");
    }
    setUsername("");
    setPassword("");
    alert("Logged in")
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
          label="Username"
          variant="outlined"
          value={username}
          onChange={handleUsernameChange}
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
          onClick={() => loginClick()}
        >
          Login
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>Need to create an account?</Typography>
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
          onClick={() => navigate(NavigationRoutes.Signup)}
        >
          Signup
        </Button>
      </Box>
    </Box>
  );
};
export default InputFields;
