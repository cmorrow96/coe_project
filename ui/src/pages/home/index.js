import React from "react";
import { Box, Typography } from "@mui/material";
import { RecentGames, RecentUsers } from "./component/index";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column nowrap",
      }}
    >
      <Typography variant="h2" sx={{ fontFamily: "Serif", mt: 1, mb: 2 }}>
        Welcome to LookingForGame.co.uk
      </Typography>
      <Typography variant="h5" sx={{ fontFamily: "Serif" }}>
        Recently added games...
      </Typography>
      <RecentGames />
      <Typography variant="h5" sx={{ fontFamily: "Serif", mt: 3 }}>
        Recently joined users...
      </Typography>
      <RecentUsers />
    </Box>
  );
};
export default Home;
