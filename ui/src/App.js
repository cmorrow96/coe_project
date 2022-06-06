import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/index";
import Games from "./pages/games/index";
import Comments from "./pages/comments/index";
import About from "./pages/about/index";
import User from "./pages/user/index";
import Signup from "./pages/signup/index";
import Login from "./pages/login/index";

import { CustomAppBar } from "./components/index";

function App() {
  return (
    <>
      <Router>
        <CustomAppBar></CustomAppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
