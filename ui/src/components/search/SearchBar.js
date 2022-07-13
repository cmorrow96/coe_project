import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, TextField } from "@mui/material";
import { SearchContext } from "../../contexts";
import { NavigationRoutes } from "../../constants";

const SearchBar = () => {
  const searchText = useRef(null);
  const { handleSearch } = useContext(SearchContext.SearchContext);

  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SearchIcon sx={{ mr: 1 }}></SearchIcon>
      <TextField
        type="text"
        variant="outlined"
        color="secondary"
        inputRef={searchText}
        placeholder="Search..."
        onChange={(event) => setUserInput(event.target.value)}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            handleSearch(userInput);
            if (userInput != "") {
              navigate(NavigationRoutes.Games);
            }
          }
        }}
        sx={{
          fontSize: "1.1rem",
        }}
      />
      <Button
        size="small"
        variant="contained"
        color="secondary"
        onClick={() => {
          searchText.current.value = "";
          setUserInput("");
          handleSearch("");
        }}
      >
        Clear
      </Button>
    </Box>
  );
};
export default SearchBar;
