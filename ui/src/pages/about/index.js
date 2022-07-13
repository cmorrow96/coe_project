import React from "react";
import { Stack, Typography } from "@mui/material";

const About = () => {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Stack direction="column">
        <Typography variant="h1" sx={{ fontFamily: "Serif", mb: 2 }}>
          About LookingForGame
        </Typography>
        <Typography variant="h4" sx={{ fontFamily: "Serif", mb: 2 }}>
          This is a website to allow users to track their favourite games and
          discuss them with other users in a forum type environment.
        </Typography>
        <Typography variant="h6" sx={{ fontFamily: "Serif" }}>
          Please use the links above to navigate.
        </Typography>
      </Stack>
    </div>
  );
};
export default About;
