import { useRecoilValue } from "recoil";
import { authorizeToken } from "../states/authorizeToken";
import { user } from "../states/user";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

function Home() {
  const authorizetoken = useRecoilValue(authorizeToken);
  const UserData = useRecoilValue(user);
  const [userbuckets, setUserBuckets] = useState([]);
  const [cookies] =useCookies()
    useEffect(() => {
      let server_URL=import.meta.env.VITE_SERVER_URL
        axios
        .get(`${server_URL}api/backblaze/bucket`, {
          headers: {
            authorization: cookies["x-auth-token"],
            accountAuthorizationToken: authorizetoken,
          },
        })
        .then((res) => {
          let data = res.data;
          if (data.status == 200) {
            return setUserBuckets(data.data);
          }
        })
        .catch((err) => {
          console.log("error", err);
        });
    }, [authorizeToken,UserData]);

  return (
    <>
      <div>
        <h1>{JSON.stringify(UserData)}</h1>
        <h1>{"Token: " + authorizetoken}</h1>
      </div>
      <h2>Your buckets:</h2>
      <div className="flex flex-col">{userbuckets.map((bucket:{name:string,server:string})=>{
        return <Link to={`/bucket/${bucket?.name}`}><span className="border">{bucket?.name} on the {bucket?.server} server</span></Link>
      })}</div>
    </>
  );
}

export default Home;
