import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

export const InputFields = () => {
  const [username, setUsername] = useState("");
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const login = async () => {
    let uname = username;
    let pword = password;
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: uname,
        password: pword
      }),
    });
    return await response.json();
  };

  const click = () => {
    login();
    setUsername("");
    setPassword("");
  };

  return (
    <Box
      sx={{
        width: 500,
        maxWdith: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
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
          onClick={() => click()}
        >
          Login
        </Button>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>Need to create an account?</Typography>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <Button
          variant="contained"
          href="/signup"
          sx={{
            textAlign: "center",
            width: 150,
            my: 2,
            color: "white",
            display: "block",
          }}
        >
          Signup
        </Button>
      </div>
    </Box>
  );
};
