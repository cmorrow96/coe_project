import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Slide,
} from "@mui/material";
import { Box } from "@mui/system";

const AddGame = () => {
  const [open, setOpen] = useState(false);
  const clickOpen = () => {
    setOpen(true);
  };

  const handleCLose = () => {
    setOpen(false);
  };

  const [name, setName] = useState("");
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // const click = () => {};

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        m: "auto",
        width: "fit-content",
        p: 5,
      }}
    >
      <Button variant="contained" color="primary" onClick={clickOpen}>
        Add Game
      </Button>
      <Dialog
        open={open}
        onClose={handleCLose}
        keepMounted
      >
        <DialogContent>
          <DialogTitle>{"Add Game"}</DialogTitle>
          <DialogContentText>Please Add Game Details Below</DialogContentText>
        </DialogContent>
        <TextField
          variant="standard"
          fullWidth
          label="Title"
          value={name}
          onChange={handleNameChange}
        />
        <DialogActions>
          <Button>Submit</Button>
          <Button onClick={handleCLose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default AddGame;
