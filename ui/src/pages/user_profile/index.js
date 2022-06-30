import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { AuthContext } from "../../contexts";
import { UserService } from "../../services";
import { LoginUtils } from "../../utils";
import { AddFavourite, FavouritesList } from "./components";

const UserProfile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [forename, setForename] = useState("");
  const [surname, setSurname] = useState("");
  const [aboutMe, setAboutMe] = useState("");

  const { state } = AuthContext.useLogin();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const handleDeleteOpen = () => {
    setDeleteDialogOpen(true);
  };
  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
  };

  const [tab, setTab] = useState("User Details");
  const handleChange = (event, newTab) => {
    setTab(newTab);
  };

  useEffect(() => {
    const loggedIn = state.accessToken && !LoginUtils.isTokenExpired(state);
    const username = loggedIn
      ? LoginUtils.getUsername(state.accessToken)
      : null;
    setUsername(username);
    getUserData(LoginUtils.getUserID(state.accessToken));
  }, []);

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
      <Typography sx={{ mt: 1, my: 1 }} variant="h4">
        User Profile Section - {username}
      </Typography>
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
              sx={{
                mt: 2,
              }}
              value={username}
            ></TextField>
            <TextField
              required
              id="outlined-required"
              label="Email"
              color="secondary"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            ></TextField>
            <TextField
              id="outlined"
              label="Forename"
              type="Forename"
              color="secondary"
              placeholder="Enter your forename here..."
              onChange={(event) => setForename(event.target.value)}
              value={forename}
            ></TextField>
            <TextField
              id="outlined"
              label="Surname"
              type="Surname"
              color="secondary"
              placeholder="Enter your surname here..."
              onChange={(event) => setSurname(event.target.value)}
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
              onChange={(event) => setAboutMe(event.target.value)}
              value={aboutMe}
            ></TextField>
          </Stack>

          <Grid container>
            <Grid item xs={5} sx={{ textAlign: "end" }}>
              <Button
                style={{ width: 175 }}
                size="medium"
                variant="contained"
                sx={{ mt: 1 }}
                // onClick={()}
              >
                Update Details
              </Button>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={5}>
              <Button
                style={{ width: 175 }}
                size="medium"
                variant="contained"
                color="error"
                sx={{ mt: 1 }}
                onClick={() => handleDeleteOpen()}
              >
                Delete Account
              </Button>
            </Grid>
            <Dialog
              open={deleteDialogOpen}
              onClose={handleDeleteClose}
              aria-labelledby="delete alert title"
              aria-describedby="delete alert description"
            >
              <DialogTitle id="delete alert title">
                {username} account deletion
              </DialogTitle>
              <DialogContent>
                <Typography>
                  This will delete your user account and all associated
                  information.
                </Typography>
                <Typography>Delete your account?</Typography>
              </DialogContent>
              <DialogActions>
                <Button color="error">Delete</Button>
                <Button onClick={() => handleDeleteClose()}>Cancel</Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Container>
      )}
      {tab === "Favourites List" && (
        <Box justifyContent="center" alignItems="center" sx={{ }}>
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              direction: "row",
            }}
          >
            <Grid item xs={2}>
              <AddFavourite />
            </Grid>
            <Grid item xs={12}>
              <FavouritesList />
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};
export default UserProfile;
