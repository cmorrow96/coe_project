import React from "react"
import { InputFields } from "./components";
import { Box } from "@mui/material";

const Signup = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Create a User Account</h1>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <InputFields />
      </Box>
    </>
  );
};
export default Signup;
