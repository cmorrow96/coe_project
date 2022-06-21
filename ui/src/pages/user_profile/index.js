import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Divider,
  Stack,
  Tab,
  Tabs,
  Typography,
  TextField,
} from "@mui/material";
import { AuthContext } from "../../contexts";
import { UserService, TokenService } from "../../services";
import { LoginUtils } from "../../utils";
import { FavouritesList } from "./components";

const UserProfile = () => {
  const [tUsername, setTUsername] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [forename, setForename] = useState("");
  const [surname, setSurname] = useState("");
  const [aboutMe, setAboutMe] = useState("");

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
    setUsername(username);
    getUserData(LoginUtils.getUserID(state.accessToken));
  }, [state]);

  const getUserData = async (userID) => {
    UserService.getUser(userID).then(async (data) => {
      const userData = data.data;
      setEmail(userData.email_address);
      setForename(userData.forename);
      setSurname(userData.surname);
      setAboutMe(userData.about_me);
    });
  };

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
      {tab === "User Details" && (
        <Container
          fixed
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Stack direction="column" spacing={2}>
            <TextField
              disabled
              id="outlined-required"
              label="Username"
              type="Username"
              color="secondary"
              sx={{
                mt: 2
              }}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            ></TextField>
            <TextField
              required
              id="outlined-required"
              label="Email" 
              value={email}
            ></TextField>
            <TextField
              id="outlined"
              label="Forename"
              type="Forename"
              color="secondary"
              placeholder="Enter your forename here..."
              onChange={(e) => setForename(e.target.value)}
              value={forename}
            ></TextField>
            <TextField
              id="outlined"
              label="Surname"
              type="Surname"
              color="secondary"
              placeholder="Enter your surname here..."
              onChange={(e) => setSurname(e.target.value)}
              value={surname}
            ></TextField>
            <TextField
              multiline
              id="outlined-multiline-static"
              label="About Me"
              type="About Me"
              color="secondary"
              placeholder="Enter a bio here..."
              rows={4}
              onChange={(e) => setAboutMe(e.target.value)}
              value={aboutMe}
            ></TextField>
          </Stack>
        </Container>
      )}
      {tab === "Favourites List" && (
        <Box>
          <FavouritesList />
        </Box>
      )}
    </Box>
  );
};
export default UserProfile;
