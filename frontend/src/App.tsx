import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import { useEffect } from "react";
import { socket } from "./controllers/socket";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
