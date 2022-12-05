import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Create from "./Pages/Create";
import ViewPost from "./Pages/ViewPost";


console.log(process.env.REACT_APP_MY_KEY)



function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create" element={<Create />} />
          <Route path="/viewpost" element={<ViewPost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
