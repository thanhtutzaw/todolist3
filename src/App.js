import React from "react";
import {
  BrowserRouter as Router, Route,
  Routes
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home.jsx";
import Login from "./components/Login";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
