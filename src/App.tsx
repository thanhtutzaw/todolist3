import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AppProvider from './Context/AppContext';
import Home from './components/Home';
import Login from './components/Login';
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
