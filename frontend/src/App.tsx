import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import { useEffect } from "react";
import { socket } from "./controllers/socket";
import Signin from "./pages/signin";
import Navbar from "./components/navbar";
import CreateBucket from "./pages/create_bucket";
import Signup from "./pages/signup";
import useGetData from "./hooks/getData";
import { useSetRecoilState } from "recoil";
import { authorizeToken } from "./states/authorizeToken";
import { user } from "./states/user";
import { useCookies } from "react-cookie";
import Bucket from "./pages/bucket";

function App() {
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  });
  const [cookies] =useCookies()
  
  let server_URL=import.meta.env.VITE_SERVER_URL

  const setAuthorizeToken=useSetRecoilState(authorizeToken)
  const userData=useSetRecoilState(user)


  const verifyUSER = useGetData(
    `${server_URL}api/auth/verify`,
    {
      headers: {
        authorization: cookies["x-auth-token"],
      },
    }
  );
  const b2_authorize = useGetData(
    `${server_URL}api/backblaze/authorize`,
    {
      headers: {
        authorization: cookies["x-auth-token"],
      },
    }
  );

  if (b2_authorize.data) {
    setAuthorizeToken(b2_authorize?.data?.data?.authorizationToken);
  }
  if (verifyUSER.data) {
    userData(verifyUSER?.data?.decoded);
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/auth/signup" element={<Signup/>} />
        <Route path="/create/bucket" element={<CreateBucket/>} />
        <Route path="/bucket/:id" element={<Bucket/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
