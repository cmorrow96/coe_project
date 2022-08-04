import React, { useState, useEffect } from "react";
import { DataTable } from "../../../components";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { AuthContext } from "../../../contexts";
import { UserService } from "../../../services";
import { LoginUtils } from "../../../utils";
import { useNavigate } from "react-router-dom";
import { NavigationRoutes } from "../../../constants";

const FavouritesList = () => {
  const navigate = useNavigate();

  const { state } = AuthContext.useLogin();
  const userID = LoginUtils.getUserID(state.accessToken);

  const [favs, setFavs] = useState([]);
  const handleFavs = (favs) => {
    setFavs(favs);
  };

  const getFavourites = () => {
    UserService.getFavourites(userID).then(async (data) => {
      const status = data.status;
      if (status === 200) {
        const favs = data.data;
        handleFavs(favs);
      } else {
        alert("Error, check favourites");
        navigate(NavigationRoutes.Profile);
      }
    });
  };

  useEffect(() => {
    getFavourites();
  });

  const [name, setName] = useState("");
  const handleName = (name) => {
    setName(name);
  };

  const viewButton = (params) => {
    return (
      <Button variant="outlined" color="primary" size="small">
        View
      </Button>
    );
  };

  const editButton = (params) => {
    return (
      <Button variant="outlined" color="secondary" size="small">
        Edit
      </Button>
    );
  };

  const deleteButton = (params) => {
    return (
      <Button
        variant="outlined"
        color="error"
        size="small"
        onClick={(event) => {
          event.stopPropagation();
          const name = params.row.game.name;
          handleName(name);
          handleOpenDel();
        }}
      >
        Delete
      </Button>
    );
  };

  const [openDel, setOpenDel] = useState(false);
  const handleOpenDel = () => {
    setOpenDel(true);
  };
  const handleCloseDel = () => {
    setOpenDel(false);
  };

  const handleDelete = (params) => {
    const id = params.row.id;
    const user_id = params.row.user_id;
    UserService.deleteFavourite(id, user_id);
  };

  const columns = [
    {
      field: "game",
      headerName: "Title",
      valueFormatter: (params) => params.value.name,
      width: 250,
    },
    {
      field: "favourite_status",
      headerName: "Favourite Status",
      valueFormatter: (params) => params.value.type,
      width: 250,
    },
    { field: "rating", headerName: "Rating", width: 250 },
    { field: "view", headerName: "", width: 80, renderCell: viewButton },
    { field: "edit", headerName: "", width: 80, renderCell: editButton },
    { field: "delete", headerName: "", width: 80, renderCell: deleteButton },
  ];

  return (
    <Box>
      <Dialog
        open={openDel}
        onClose={handleCloseDel}
        aria-labelledby="delete alert title"
      >
        <DialogTitle id="delete alert title">
          {"Favourite Deletion"}
        </DialogTitle>
        <DialogContent>
          <Typography>
            This will remove "{name}" from your favourites list.
          </Typography>
          <Typography>Delete this favourite?</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => handleDelete()}>
            Delete
          </Button>
          <Button onClick={() => handleCloseDel()}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <DataTable rows={favs} columns={columns}></DataTable>
    </Box>
  );
};
export default FavouritesList;
