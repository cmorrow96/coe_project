import React from "react";
import { Box, Grid } from "@mui/material";
import { GamesList, AddGame } from "./components";

const Games = () => {
  return (
    <Grid
      container
      display="flex-start"
      justifyContent="space-evenly"
      alignItems="center"
      alignContent="center"
      spacing={2}
    >
      <Grid item xs={2}>
        <h2>Game Search</h2>
      </Grid>
      <Grid item xs={8}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        ></Box>
      </Grid>
      <Grid item xs={2}>
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        > */}
          <AddGame />
        {/* </Box> */}
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
