import React, { useState, useEffect } from "react";
import { DataTable } from "../../../components";
import { Box, Button, Dialog } from "@mui/material";
import { AuthContext } from "../../../contexts";
import { UserService } from "../../../services";
import { LoginUtils, FetchInstance } from "../../../utils";
import { useNavigate } from "react-router-dom";
import { NavigationRoutes } from "../../../constants";

const FavouritesList = () => {
  const navigate = useNavigate();

  const { state } = AuthContext.useLogin();
  const userID = LoginUtils.getUserID(state.accessToken);

  const [favs, setFavs] = useState([]);
  useEffect(() => {
    UserService.getFavourites(userID).then(async (data) => {
      const status = data.status;
      if (status === 200) {
        const favs = data.data;
        setFavs(favs);
      } else {
        alert("Error, check favourites");
        navigate(NavigationRoutes.Profile);
      }
    });
  }, []);

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
          handleDelete(params);
        }}
      >
        Delete
      </Button>
    );
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (params) => {
    const id = params.row.id;
    const user_id = params.row.user_id;
    handleOpen();
  };

  const columns = [
    {
      field: "game",
      headerName: "Game Title",
      valueFormatter: (params) => {
        return params.value.name;
      },
      width: 250,
    },
    {
      field: "favourite_status",
      headerName: "Favourite Status",
      valueFormatter: (params) => {
        return params.value.type;
      },
      width: 250,
    },
    { field: "rating", headerName: "Rating", width: 250 },
    { field: "view", headerName: "", width: 80, renderCell: viewButton },
    { field: "edit", headerName: "", width: 80, renderCell: editButton },
    { field: "delete", headerName: "", width: 80, renderCell: deleteButton },
  ];

  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>
        Hello
      </Dialog>
      <DataTable rows={favs} columns={columns}></DataTable>
    </Box>
  );
};
export default FavouritesList;
