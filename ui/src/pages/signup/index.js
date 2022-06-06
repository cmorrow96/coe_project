import { InputFields } from "./components/index";
import { Box } from "@mui/material";

export default function signup() {
  return (
    <Box>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Create a User Account</h1>
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
