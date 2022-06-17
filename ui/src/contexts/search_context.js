import React, { createContext, useEffect, useState } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const handleSearch = (userInput) => {
      setQuery(userInput);
  };

  const [games, setGames] = useState([])
  useEffect(() => {
        getGames().then((res) => {
            setGames(res);
        })
  }, [query]);

  const getGames = async () => {
    const response = await fetch("http://localhost:3001/games?" +
    new URLSearchParams({ search: query }), {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    return await response.json();
  };

  return (
    <SearchContext.Provider value={{ handleSearch: handleSearch, games: games}}>
      {children}
    </SearchContext.Provider>
  );
};

export default { SearchContext, SearchProvider };
