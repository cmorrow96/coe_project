import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  GameService,
} from "../../../services";
import { LoginUtils } from "../../../utils";
import { AuthContext } from "../../../contexts";

const AddFavourite = () => {
  const navigate = useNavigate();
  const { state } = AuthContext.useLogin();
  const userID = LoginUtils.getUserID(state.accessToken);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleCLose = () => {
    setOpen(false);
  };

  const [game, setGame] = useState("");
  const handleGameChange = (event, game) => {
    setGame(game);
  };

  const [games, setGames] = useState([]);
  const handleGames = (games) => {
    setGames(games);
  };

  useEffect(() => {
    GameService.getGames().then(async (data) => {
      const status = data.status;
      if (status === 200) {
        const games = data.data;
        handleGames(games);
      } else {
        alert("Error, check favourites");
      }
    });
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        m: "auto",
        p: 2,
      }}
    >
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Favourite
      </Button>
      <Dialog
        open={open}
        onClose={handleCLose}
        aria-labelledby="add-favourite"
        aria-describedby="add-favourite-description"
        keepMounted
      >
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              p: 1,
              width: 500,
            }}
          >
            <DialogTitle id="add-game-title">Add Game</DialogTitle>
            <DialogContentText id="add-favourite-description">
              Select a favourite by typing or selecting from the dropdown. You
              can also set a status and rating:
            </DialogContentText>
            <Divider sx={{ my: 1 }} />
            <Autocomplete
              id="games-autocomplete"
              options={games}
              getOptionLabel={(option) => (option.name ? option.name : "")}
              isOptionEqualToValue={(option, value) =>
                option.name === value.name
              }
              onChange={handleGameChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Game"
                  placeholder="Type game title or select from list..."
                />
              )}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
export default AddFavourite;
