import React, { useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import PostList from "./POST/PostList";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Protected } from "./ProtectedPages";
import AuthContext from "./context/AuthContext";
import TestLogin from "./AUTH/TestLogin";
import TestRegister from "./AUTH/TestRegister";
import UsersPosts from "./components/UsersPosts";
import Home from "./components/Home";
import Comments from "./COMMENTS/Comments";
import About from "./components/About";
import Post from "./POST/Post";
import PostPage from "./POST/Post";

export const App = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [search, setSearch] = useState("");
 
  // Function to update the date and time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Format date and time
  const formattedDate = currentDateTime.toLocaleDateString();
  const formattedTime = currentDateTime.toLocaleTimeString();

  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setAuth(null);
    navigate("/");
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<TestLogin />} />
        <Route path="/register" element={<TestRegister />} />
        <Route
          element={
            <Protected
              handleLogout={handleLogout}
              search={search}
              setSearch={setSearch}/>}>
          <Route
            path="/home"
            element={
              <Home
                formattedDate={formattedDate}
                formattedTime={formattedTime} />}/>
          <Route
            path="/postlist"
            element={<PostList search={search} setSearch={setSearch} />}/>
          <Route path="/post/:blogId" element={<PostPage/>} />
          <Route path="/usersposts" element={<UsersPosts />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
