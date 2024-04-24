import axios from "axios";
import { memo, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authorizeToken } from "../states/authorizeToken";

type ibucketData = {
  bucket:{[key:string]:string},
  files:{[key:string]:string | number}[]
}

type ifile={
  name:string |number,
  data:string,
  id:string
}
function Bucket() {

  const { id } = useParams();
  const [cookie] = useCookies();
  const accountauthorizationtoken = useRecoilValue(authorizeToken);
  const [bucketData, setBucketData] = useState<ibucketData | undefined>();
  const [file, setFile] = useState<ifile>({
    name:"",
    id:"",
    data:""
  });

  const server_URL = import.meta.env.VITE_SERVER_URL;
  useEffect(() => {
    axios
      .get(`${server_URL}api/backblaze/bucket/${id}`, {
        headers: {
          authorization: cookie["x-auth-token"],
          accountauthorizationtoken,
        },
      })
      .then((res) => {
        if (res.data.status == 200) {
          return setBucketData(res.data?.data);
        }
        return alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        return alert("An error occured");
      });
  }, [id]);
  useEffect(() => {
    if(file.id){
      axios.get(`${server_URL}api/backblaze/file/${file.id}`, {
        headers: {
          authorization: cookie["x-auth-token"],
          accountauthorizationtoken,
        },
      }).then((res) => {
        if (res.data.status == 400) {
          return alert(res.data.message);
        }
        return setFile({...file,data:res.data as string});
      });
    }
  }, [file.name]);
  return (
    <>
      <section className="flex">
        <section className="border w-full h-full">
          <h1>Files</h1>
          <div className="flex flex-col">
            {(bucketData as ibucketData)?.files.map((file) => {
              let fileName= (file.fileName as string).split('/')[1] as string
              return (
                <button key={file.fileName} type="button" onClick={()=>setFile(prev =>({...prev,name:fileName,
                id:file.fileId as string}))}>
                  <p>{fileName}</p>
                </button>
              );
            
            })}
          </div>
        </section>
        <section className="border w-full h-full">
          <h1>File opened</h1>
          <p>{JSON.stringify(file.data)}</p>
        </section>
        <section className="border w-full h-full">
          <h1>Terminal</h1>
        </section>
      </section>
    </>
  );
}

export default memo(Bucket);
