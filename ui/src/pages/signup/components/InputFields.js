import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

export const InputFields = () => {
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

  const signup = async () => {
      let email_address = email;
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
          email_address: email_address
      })
    });
    return await response.json();
  };

  const click = () => {
      signup();
      setEmail("");
      setUsername("");
      setPassword("");
  }

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
          label="Email Address"
          value={email}
          onChange={handleEmailChange}
          variant="outlined"
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
          label="Username"
          value={username}
          onChange={handleUsernameChange}
          variant="outlined"
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
          value={password}
          onChange={handlePasswordChange}
          variant="outlined"
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
          Signup
        </Button>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>Already have an account?</Typography>
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
          href="/login"
          sx={{
            textAlign: "center",
            width: 150,
            my: 2,
            color: "white",
            display: "block",
          }}
        >
          Login
        </Button>
      </div>
    </Box>
  );
};
