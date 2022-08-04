import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NavigationRoutes } from "../../../constants";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  DeveloperService,
  PublisherService,
  GenreService,
  GameService,
} from "../../../services";
import { LoginUtils } from "../../../utils";
import { AuthContext } from "../../../contexts";

const AddGame = () => {
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

  const [name, setName] = useState("");
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const [dev, setDev] = useState("");
  const handleDevChange = (event, dev) => {
    setDev(dev);
  };

  const [devs, setDevs] = useState([]);
  const getDevelopers = async () => {
    DeveloperService.getDevelopers().then(async (data) => {
      const status = data.status;
      if (status === 200) {
        const devArray = data.data;
        setDevs(devArray);
      } else {
        alert("Error, check developers");
        navigate(NavigationRoutes.Games);
      }
    });
  };

  const [pub, setPub] = useState("");
  const handlePubChange = (event, pub) => {
    setPub(pub);
  };

  const [pubs, setPubs] = useState([]);
  const getPublishers = async () => {
    PublisherService.getPublishers().then(async (data) => {
      const status = data.status;
      if (status === 200) {
        const pubArray = data.data;
        setPubs(pubArray);
      } else {
        alert("Error, check publishers");
        navigate(NavigationRoutes.Games);
      }
    });
  };

  const [genres, setGenres] = useState([]);
  const handleGenresChange = (event, newGenres) => {
    setGenres(newGenres);
  };

  const [genresList, setGenresList] = useState([]);
  const getGenres = async () => {
    GenreService.getGenres().then(async (data) => {
      const status = data.status;
      if (status === 200) {
        const genreArray = data.data;
        setGenresList(genreArray);
      } else {
        alert("Error, check genres");
        navigate(NavigationRoutes.Games);
      }
    });
  };

  const [date, setDate] = useState(new Date());
  const handleDateChange = (date) => {
    setDate(date);
  };

  const [description, setDescription] = useState("");
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = () => {
    GameService.createGame(userID, name, dev, pub, date, description);
  };

  useEffect(() => {
    getDevelopers();
    getPublishers();
    getGenres();
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end"
      }}
    >
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Game
      </Button>
      <Dialog
        open={open}
        onClose={handleCLose}
        aria-labelledby="add-game-title"
        aria-describedby="add-game-description"
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
            <DialogContentText id="add-game-description">
              Please add details of a new game in the boxes below:
            </DialogContentText>
            <Divider sx={{ my: 1 }} />
            <Stack display="flex" spacing={2} direction="column">
              <TextField
                variant="outlined"
                fullWidth
                label="Title"
                placeholder="Enter a Title for this game..."
                value={name}
                onChange={handleNameChange}
              />
              <Autocomplete
                id="developer-autocomplete"
                options={devs}
                getOptionLabel={(option) => (option.name ? option.name : "")}
                isOptionEqualToValue={(option, value) =>
                  option.name === value.name
                }
                onChange={handleDevChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Developer"
                    placeholder="Type name or select a Developer from the list..."
                  />
                )}
              />
              <Autocomplete
                id="publisher-autocomplete"
                options={pubs}
                getOptionLabel={(option) => (option.name ? option.name : "")}
                isOptionEqualToValue={(option, value) =>
                  option.name === value.name
                }
                onChange={handlePubChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Publisher"
                    placeholder="Type name or select a Publisher from the list..."
                  />
                )}
              />
              <Autocomplete
                multiple
                id="genre-autocomplete"
                options={genresList}
                disableCloseOnSelect
                filterSelectedOptions
                getOptionLabel={(option) => (option.name ? option.name : "")}
                isOptionEqualToValue={(option, value) =>
                  option.name === value.name
                }
                onChange={handleGenresChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Genres"
                    placeholder="Type name or select Genres from the list..."
                  />
                )}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  disableFuture
                  label="Release Date"
                  openTo="year"
                  views={["year", "month", "day"]}
                  inputFormat="yyyy/MM/dd"
                  value={date}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <TextField
                variant="outlined"
                multiline
                fullWidth
                label="Description"
                placeholder="Enter a description for this game..."
                value={description}
                onChange={handleDescriptionChange}
              />
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleSubmit()}>Submit</Button>
          <Button onClick={() => handleCLose()}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default AddGame;
