import React from "react";
import { Box } from "@mui/material";
import { RecentGames, RecentUsers } from "./component/index";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column nowrap",
      }}
    >
      <h1>Welcome to LookingForGame.co.uk</h1>
      <h3>Recently added games...</h3>
      <RecentGames/>
      <h3>Recent users...</h3>
      <RecentUsers/>
    </Box>
  );
}
export default Home;
