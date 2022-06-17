import React, { useState, useEffect } from "react";
import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import { AuthContext } from "../../contexts";
import { LoginUtils } from "../../utils";

const UserProfile = () => {
  const [tUsername, setTUsername] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [forename, setForename] = useState("");
  const [surname, setSurname] = useState("");
  const [about, setAbout] = useState("");

  const [tab, setTab] = useState("User Details");
  const handleChange = (event, newTab) => {
    setTab(newTab);
  };

  const { state } = AuthContext.useLogin();

  useEffect(() => {
    const loggedIn = state.accessToken && !LoginUtils.isTokenExpired(state);
    const username = loggedIn
      ? LoginUtils.getUsername(state.accessToken)
      : null;
    setTUsername(username);
  }, [state]);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4">User Profile Section - {tUsername}</Typography>
      <Divider sx={{ borderBottomWidth: 3 }} />
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={tab}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab value="User Details" label="User Details" />
          <Tab value="Favourites List" label="Favourites List" />
        </Tabs>
      </Box>
      {tab === "User Details" && <Typography>test</Typography>}
      {tab === "Favourites List" && <Typography>test</Typography>}
    </Box>
  );
};
export default UserProfile;
