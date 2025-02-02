import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("token") !== null,
  );
  useEffect(() => {
    localStorage.setItem("logged_in", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);
  const logIn = () => setIsLoggedIn(true);

  const logOut = () => {
    localStorage.removeItem("token");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <Home setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/login" element={<Login onLogIn={logIn} />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/profile"
        element={
          isLoggedIn ? (
            <Profile setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/chat/:username" element={<Home />} />
    </Routes>
  );
}

export default App;
