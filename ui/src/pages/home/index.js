import React from "react";
import { Box } from "@mui/material";
import { RecentGames, RecentUsers } from "./component/index";

const home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column nowrap",
      }}
    >
      <h1>Welcome to LookingForGame.com</h1>
      <h3>Recently added games...</h3>
      <RecentGames/>
      <h3>Recent users...</h3>
      <RecentUsers/>
    </Box>
  );
}
export default home;
