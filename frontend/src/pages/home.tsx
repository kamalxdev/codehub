import {useRecoilValue } from "recoil";
import { authorizeToken } from "../states/authorizeToken";
import { user } from "../states/user";

function Home() {
  const authorizetoken = useRecoilValue(authorizeToken);
  const UserData= useRecoilValue(user);


  return (
    <>
      <div>
        <h1>{JSON.stringify(UserData)}</h1>
        <h1>{"Token: " + authorizetoken}</h1>
      </div>
    </>
  );
}

export default Home;
