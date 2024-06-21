import React, { useEffect, useState } from "react";
import { Login } from "./pages/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // Import Navigate from react-router-dom
import { SignUp } from "./pages/SignUp";
import { Profile } from "./pages/Profile/index";
import { log } from "console";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/:username"
          element={<Profile />} // Use Navigate from react-router-dom
        />
      </Routes>
    </Router>
  );
}

export default App;
