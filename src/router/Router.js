import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Post from "../views/Post.js";
import Posts from "../views/Posts.js";
import Profile from "../views/Profile.js";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts/>}/>
        <Route path="/:id" element={<Post/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  )
};

export default Routing;