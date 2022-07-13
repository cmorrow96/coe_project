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
        <Toolbar disableGutters variant="regular">
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-start",
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
                  fontFamily: "Serif",
                  fontSize: 36,
                  fontWeight: 1000,
                  letterSpacing: 1,
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
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-start",
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
                    sx={{ fontFamily: "Serif" }}
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
              justifyContent: "flex-start",
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
                  display: { xs: "flex", md: "none" },
                  fontFamily: "Serif",
                  fontSize: 32,
                  fontWeight: 1000,
                  letterSpacing: 2,
                  color: "white",
                  textDecoration: "none",
                  textTransform: "none",
                }}
              >
                LookingForGame
              </Typography>
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
            {pages.map(({ display, nav }) => (
              <Button
                disableRipple
                key={nav}
                onClick={() => {
                  navigate(nav);
                }}
                sx={{
                  color: "white",
                  display: "block",
                  textTransform: "none",
                  fontFamily: "Serif",
                  fontSize: 24,
                }}
              >
                {display}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, justifyContent: "flex-end", mr: 5 }}>
            <SearchBar placeholder="Search Games..." onKeyPress />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "flex-end", mr: 5 }}>
            <SearchBar placeholder="Search Games..." onKeyPress />
          </Box>

          {isLoggedIn ? (
            <Box sx={{ flexGrow: 0, display: "flex", justifyContent: "flex-end" }}>
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
                      <Typography
                        textAlign="center"
                        sx={{ fontFamily: "Serif" }}
                      >
                        {display}
                      </Typography>
                    </MenuItem>
                  ))}
                  <MenuItem
                    textAlign="center"
                    sx={{ fontFamily: "Serif" }}
                    key="logout"
                    onClick={logout}
                  >
                    Logout
                  </MenuItem>
                </Menu>
                <Typography
                  display="flex"
                  alignItems="center"
                  sx={{
                    fontFamily: "Serif",
                    ml: 1,
                  }}
                >
                  {username}
                </Typography>
              </Stack>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0, display: "flex", justifyContent: "flex-end" }}>
              <Stack direction="row">
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ mr: 1, color: "white", display: "block" }}
                  onClick={() => navigate(NavigationRoutes.Login)}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ color: "white", display: "block" }}
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
