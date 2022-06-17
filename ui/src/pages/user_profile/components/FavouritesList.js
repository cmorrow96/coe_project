import React, { useEffect } from "react";
import { DataTable } from "../../../components";
import { Button } from "@mui/material";

const FavouritesList = () => {
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
        const favouriteNames = params.value.map((g) => {
          return g.game.name;
        });
        return favouriteNames;
      },
      width: 250,
    },
    {field: "favourite_status", headerName: "Favourite Status",
        valueFormatter:(params) => {
            const favouriteStatus = params.value.map((f) => {
                return f.favourite_status.type;
            })
            return favouriteStatus;
        }},
    { field: "view", headerName: "", width: 80, renderCell: viewButton },
    { field: "edit", headerName: "", width: 80, renderCell: editButton },
    { field: "delete", headerName: "", width: 80, renderCell: deleteButton },
  ];

  const { state } = AuthContext.useLogin();

  useEffect(() => {
    const loggedIn = state.accessToken && !LoginUtils.isTokenExpired(state);
    const username = loggedIn
      ? LoginUtils.getUsername(state.accessToken)
      : null;
    setTUsername(username);
  }, [state]);

  const getFavs = async () => {
    const response = await fetch("http://localhost:3001/users/", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    return await response.json();
  };

  const [favs, setFavs] = useState([]);
  useEffect(() => {
    getFavs().then((res) => {
      setFavs(res);
    });
  }, []);

  return <DataTable rows={favs} columns={columns}></DataTable>;
};
export default FavouritesList;
