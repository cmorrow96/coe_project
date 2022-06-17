import React from "react";
import { InputFields } from "./components";
import { Box } from "@mui/material";

const Login = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Login to User Account</h1>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <InputFields></InputFields>
      </Box>
    </>
  );
}
export default Login;
