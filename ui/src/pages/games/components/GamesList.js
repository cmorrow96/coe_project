import React, { useContext } from "react";
import { DataTable } from "../../../components";
import { SearchContext } from "../../../contexts";
import { Button } from "@mui/material";

const GamesList = () => {
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
    { field: "name", headerName: "Title", width: 250 },
    {
      field: "developer",
      headerName: "Developer",
      valueFormatter: (params) => params.value.name,
      width: 250,
    },
    {
      field: "publisher",
      headerName: "Publisher",
      valueFormatter: (params) => params.value.name,
      width: 250,
    },
    {
      field: "game_genre",
      headerName: "Genres",
      valueFormatter: (params) => {
        const genreNames = params.value
          .map((g) => {
            return g.genre.name;
          })
          .toString();
        return genreNames.replace(",", ", ");
      },
      width: 250,
    },
    { field: "release_date", headerName: "Release Date", width: 250 },
    { field: "description", headerName: "Description", width: 250 },
    { field: "view", headerName: "", width: 80, renderCell: viewButton },
    { field: "edit", headerName: "", width: 80, renderCell: editButton },
    { field: "delete", headerName: "", width: 80, renderCell: deleteButton },
  ];

  const { games } = useContext(SearchContext.SearchContext);

  return <DataTable rows={games} columns={columns}></DataTable>;
};
export default GamesList;
