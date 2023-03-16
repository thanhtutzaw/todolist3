import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import { AppProvider } from "./Context/AppContext";
export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
