import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Avatar,
  Tooltip,
  Button,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { NavigationRoutes } from "../../constants";
import { SearchBar } from "..";
import { AuthContext } from "../../contexts";
import { LoginUtils } from "../../utils";
import { TokenService } from "../../services";

const pages = [
  {
    display: "Games",
    nav: NavigationRoutes.Games,
  },
  {
    display: "Admin Tools",
    nav: NavigationRoutes.AdminTools,
  },
  {
    display: "About",
    nav: NavigationRoutes.About,
  },
];

const userSettings = [
  {
    display: "Profile",
    nav: NavigationRoutes.Profile,
  },
];

const CustomAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  const { state, dispatch } = AuthContext.useLogin();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [username, setUsername] = useState("");

  useEffect(() => {
    const loggedIn =
      state && state.accessToken && !LoginUtils.isTokenExpired(state);
    if (loggedIn === "undefined") {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(loggedIn);
      const username = loggedIn
        ? LoginUtils.getUsername(state.accessToken)
        : null;
      setUsername(username);
    }
  }, [state]);

  const logout = () => {
    dispatch({ type: "logout" });
    TokenService.removeAuth();
    navigate(NavigationRoutes.Home);
    alert("Logged out");
  };

  return (
    <AppBar sx={{ bgcolor: "green" }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 0,
              mr: 5,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Button
              disableRipple
              onClick={() => {
                navigate(NavigationRoutes.Home);
              }}
            >
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontFamily: "Impact",
                  fontSize: 24,
                  fontWeight: 500,
                  letterSpacing: ".3rem",
                  color: "white",
                  textDecoration: "none",
                  textTransform: "none",
                }}
              >
                LookingForGame
              </Typography>
            </Button>
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map(({ display, nav }) => (
                <MenuItem
                  key={nav}
                  onClick={() => {
                    navigate(nav);
                    handleCloseNavMenu();
                  }}
                >
                  <Typography
                    textTransform="none"
                    textAlign="center"
                    sx={{ fontFamily: "impact" }}
                  >
                    {display}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <Button
              disableRipple
              onClick={() => {
                navigate(NavigationRoutes.Home);
              }}
            >
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "impact",
                  fontSize: 24,
                  fontWeight: 500,
                  letterSpacing: ".3rem",
                  color: "white",
                  textDecoration: "none",
                  textTransform: "none",
                }}
              >
                LookingForGame
              </Typography>
            </Button>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(({ display, nav }) => (
              <Button
                disableRipple
                key={nav}
                onClick={() => {
                  navigate(nav);
                }}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  textTransform: "none",
                  fontFamily: "impact",
                  fontSize: 16,
                }}
              >
                {display}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <SearchBar placeholder="Search Games..." onKeyPress />
          </Box>

          <Box sx={{ flexGrow: 0, mr: 5, display: { xs: "none", md: "flex" } }}>
            <SearchBar placeholder="Search Games..." onKeyPress />
          </Box>

          {isLoggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <Stack direction="row">
                <Tooltip title="Open User Settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar name={username} />
                  </IconButton>
                </Tooltip>
                <Menu
                  id="menu-appbar"
                  keepMounted
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {userSettings.map(({ display, nav }) => (
                    <MenuItem
                      key={nav}
                      onClick={() => {
                        navigate(nav);
                        handleCloseUserMenu();
                      }}
                    >
                      <Typography textAlign="center">{display}</Typography>
                    </MenuItem>
                  ))}
                  <MenuItem key="logout" onClick={logout}>
                    Logout
                  </MenuItem>
                </Menu>
                <Typography
                  sx={{
                    mx: 1,
                    my: 1,
                    fontFamily: "impact",
                  }}
                >
                  {username}
                </Typography>
              </Stack>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Stack direction="row">
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ my: 0, color: "white", display: "block" }}
                  onClick={() => navigate(NavigationRoutes.Login)}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ my: 0, color: "white", display: "block" }}
                  onClick={() => navigate(NavigationRoutes.Signup)}
                >
                  Signup
                </Button>
              </Stack>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default CustomAppBar;
