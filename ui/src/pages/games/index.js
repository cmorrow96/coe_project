import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { GamesList, AddGame } from "./components";

const Games = () => {
  return (
    <Grid
      container
      display="flex-start"
      justifyContent="space-evenly"
      alignItems="center"
      alignContent="center"
    >
      <Grid item xs={10}>
        <Typography variant="h2" sx={{ fontFamily: "Serif", justifyContent: "flex-start" }}>
          Game Search
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <AddGame />
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <GamesList></GamesList>
        </Box>
      </Grid>
    </Grid>
  );
};
export default Games;
