import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import { useEffect } from "react";
import { socket } from "./controllers/socket";
import Signin from "./pages/signin";
import Navbar from "./components/navbar";
import CreateBucket from "./pages/create_bucket";
import Signup from "./pages/signup";

function App() {
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  });
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/create/bucket" element={<CreateBucket/>} />
        <Route path="/auth/signup" element={<Signup/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
