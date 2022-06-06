import { InputFields } from "./components/index";
import { Box } from "@mui/material";

export default function login() {
  return (
    <Box>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Login to User Account</h1>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <InputFields></InputFields>
      </div>
    </Box>
  );
}
