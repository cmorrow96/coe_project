import React, { useState, useEffect } from "react";
import { DataTable } from "../../../components";
import { Button } from "@mui/material";
import { AuthContext } from "../../../contexts";
import { UserService } from "../../../services";
import { LoginUtils } from "../../../utils";
import { useNavigate } from "react-router-dom";
import { NavigationRoutes } from "../../../constants";

const FavouritesList = () => {
    const navigate = useNavigate();

  const viewButton = () => {
    return (
      <Button variant="outlined" color="primary" size="small">
        View
      </Button>
    );
  };

  const editButton = () => {
    return (
      <Button variant="outlined" color="secondary" size="small">
        Edit
      </Button>
    );
  };

  const deleteButton = () => {
    return (
      <Button variant="outlined" color="error" size="small">
        Delete
      </Button>
    );
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

  const { state } = AuthContext.useLogin();
  const userID = LoginUtils.getUserID(state.accessToken);

  const [favs, setFavs] = useState([]);
  useEffect(() => {
    UserService.getFavourites(userID).then(async (data) => {
        const status = data.status;
        if(status === 200){
            const favs = data.data;
            setFavs(favs);
        }else{
            alert("Error, check favourites");
            navigate(NavigationRoutes.Profile);
        }
    });
  }, []);

  return <DataTable rows={favs} columns={columns}></DataTable>;
};
export default FavouritesList;
