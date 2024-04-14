import {useRecoilValue } from "recoil";
import useGetData from "../hooks/getData";
import { authorizeToken } from "../states/authorizeToken";

function Home() {
  const authorizetoken = useRecoilValue(authorizeToken);
  const verifyUSER = useGetData(
    `${import.meta.env.VITE_SERVER_URL}api/auth/verify`,
    {
      headers: {
        authtoken: document.cookie
          .split(";")
          .find((cookie) => cookie.includes("x-auth-token"))
          ?.split("=")[1],
      },
    }
  );

    
  if (verifyUSER.loading) return <h1>Loading...</h1>;
  return (
    <>
      <div>
        <h1>{JSON.stringify(verifyUSER.data)}</h1>
        <h1>{verifyUSER.data.message}</h1>
        <h1>{"Token: " + authorizetoken}</h1>
      </div>
    </>
  );
}

export default Home;
