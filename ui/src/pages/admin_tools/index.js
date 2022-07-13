import React, { useState } from "react";
import { Box, Typography, Divider, Tabs, Tab } from "@mui/material";
import { DevList, PubList, GenreList, UserList } from "./components";

const AdminTools = () => {
  const [tab, setTab] = useState("Developers");
  const handleChange = (event, newTab) => {
    setTab(newTab);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography sx={{ fontFamily: "Serif", mt: 1, my: 1 }} variant="h3">
        Manage records for game personnel, genres, and users
      </Typography>
      <Divider sx={{ borderBottomWidth: 3 }} />
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={tab}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab value="Developers" label="Developers" />
          <Tab value="Publishers" label="Publishers" />
          <Tab value="Genres" label="Genres" />
          <Tab value="Users" label="Users" />
        </Tabs>
      </Box>
      {tab === "Developers" && (
        <Box>
          <DevList />
        </Box>
      )}
      {tab === "Publishers" && (
        <Box>
          <PubList />
        </Box>
      )}
      {tab === "Genres" && (
        <Box>
          <GenreList />
        </Box>
      )}
      {tab === "Users" && (
        <Box>
          <UserList />
        </Box>
      )}
    </Box>
  );
};
export default AdminTools;
