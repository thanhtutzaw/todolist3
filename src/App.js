import "./App.css";
import React from "react";
import {
  BrowserRouter as Router, Route,
  Routes
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import { AuthProvider } from "./Context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
