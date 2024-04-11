import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import { useEffect } from "react";
import { socket } from "./controllers/socket";
import Login from "./pages/login";

function App() {
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    }
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
