import React, { useEffect, useState } from "react";
import { DataTable } from "../../../components/index"

export const GameList = () => {
  const columns = [
    { field: "name", headerName: "Game Title", width: 250 },
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
