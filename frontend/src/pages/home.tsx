
import useGetData from "../hooks/getData";


function Home() {
  const verifyUSER=useGetData(`${import.meta.env.VITE_SERVER_URL}api/auth/verify`,{
    headers:{
      authtoken:document.cookie.split(";").find((cookie) => cookie.includes("x-auth-token"))?.split("=")[1]
    }
  
  });

  const b2_authorize=useGetData(`${import.meta.env.VITE_SERVER_URL}api/backblaze/authorize`);
  console.log("USER: ",verifyUSER);
  




  if(verifyUSER.loading || b2_authorize.loading) return <h1>Loading...</h1>
  return (
    <>
    <div>
      <h1>{JSON.stringify(verifyUSER.data)}</h1>
      <h1>{JSON.stringify(b2_authorize.data)}</h1>
    </div>
    </>
      );
}




export default Home;