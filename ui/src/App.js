import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  About,
  GameDetails,
  Games,
  Home,
  Login,
  UserProfile,
  Signup,
} from "./pages";
import { CustomAppBar } from "./components";
import { NavigationRoutes } from "./constants";
import { SearchContext, AuthContext } from "./contexts";
import { LoginUtils } from "./utils";

function App() {
  const { state } = AuthContext.useLogin();
  const loggedIn = state.accessToken && !LoginUtils.isTokenExpired(state);
  
  return (
    <>
      <BrowserRouter>
        <SearchContext.SearchProvider>
          <CustomAppBar />
          <Routes>
            <Route path={NavigationRoutes.About} element={<About />} />
            <Route
              path={NavigationRoutes.GameDetails}
              element={<GameDetails />}
            />
            <Route path={NavigationRoutes.Games} element={<Games />} />
            <Route path={NavigationRoutes.Home} element={<Home />} />
            <Route path={NavigationRoutes.Login} element={<Login />} />
            {loggedIn && (
              <Route
                path={NavigationRoutes.Profile}
                element={<UserProfile />}
              />
            )}

            <Route path={NavigationRoutes.Signup} element={<Signup />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </SearchContext.SearchProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
