import axios from "axios";
import { memo, useState } from "react";
import { useRecoilValue } from "recoil";
import { authorizeToken } from "../states/authorizeToken";
import { user } from "../states/user";
import { useCookies } from "react-cookie";

function CreateBucket() {
  const [bucket, setbucket] = useState({ bucketName: "", server: "node" });
  const accountAuthorizationToken = useRecoilValue(authorizeToken);
  const userData= useRecoilValue(user)
  const [cookies] =useCookies()
  async function handleCreateBucket() {
    let url = import.meta.env.VITE_SERVER_URL + "api/backblaze/bucket";
    await axios
      .post(url,bucket,{
        headers: {
          authorization: cookies["x-auth-token"],
          accountAuthorizationToken
        },
      })
      .then((res) => {
        const data = res.data;
        alert(data.message)
      })
      .catch((err) => {
        console.log(err);
      });
    
  }



  return (
    <div>
      <h1 className=" font-bold text-xl">Create Bucket</h1>
      <input
        type="text"
        placeholder="bucket name"
        onChange={(e) => setbucket({ ...bucket, bucketName: e.target.value })}
        className="border border-black"
      />
      <select
        className="border border-black"
        onChange={(e) => setbucket({ ...bucket, server: e.target.value })}
      >
        <option value="node">Node</option>
        <option value="python">Python</option>
        <option value="react">React</option>
      </select>
      <button
        type="button"
        className="border border-black"
        onClick={handleCreateBucket}
      >
        Create
      </button>
    </div>
  );
}

export default memo(CreateBucket);
