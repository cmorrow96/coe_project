import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
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

  useEffect(() => {
    
  }, []);


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
    </Box>
  );
};
export default AddFavourite;
