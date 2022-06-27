import React, { useState } from "react";
import { Box, Typography, Divider, Tabs, Tab } from "@mui/material";

const AdminTools = () => {
  const [tab, setTab] = useState("Developers");
  const handleChange = (event, newTab) => {
    setTab(newTab);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography sx={{mt:1, my:1}} variant="h4">Manage records for game creators, genres, and users</Typography>
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
          <h1>test</h1>
        </Box>
      )}
      {tab === "Publishers" && (
        <Box>
          <h1>test</h1>
        </Box>
      )}
      {tab === "Genres" && (
        <Box>
          <h1>test</h1>
        </Box>
      )}
      {tab === "Users" && (
        <Box>
          <h1>test</h1>
        </Box>
      )}
    </Box>
  );
};
export default AdminTools;
