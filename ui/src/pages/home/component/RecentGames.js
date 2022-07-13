import React, { useEffect, useState } from "react";
import { DataTable } from "../../../components/index";

const RecentGames = () => {
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
  ];

  const getGames = async () => {
    const response = await fetch("http://localhost:3001/games", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    return await response.json();
  };

  const [games, setGames] = useState([]);
  useEffect(() => {
    getGames().then((res) => {
      setGames(res);
    });
  }, []);

  return <DataTable rows={games} columns={columns}></DataTable>;
};
export default RecentGames;
