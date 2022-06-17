import React from "react";
import { Stack } from "@mui/material";

 const about = () => {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Stack direction="column">
        <h1>About</h1>
        <h2>
          This is a website to allow users to track their favourite games and
          discuss them with other users in a forum type environment.
        </h2>
        <h3>Please use the links above to navigate.</h3>
      </Stack>
    </div>
  );
}
export default about;
