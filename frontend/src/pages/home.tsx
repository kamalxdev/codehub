
import useGetData from "../hooks/getData";
import backblaze from "../controllers/backblaze";


function Home() {
  const verifyUSER=useGetData(`${import.meta.env.VITE_SERVER_URL}api/auth/verify`,{
    headers:{
      authtoken:document.cookie.split(";").find((cookie) => cookie.includes("x-auth-token"))?.split("=")[1]
    }
  
  });
  console.log("USER: ",verifyUSER);
  


  // making backblaze object
  const b2=new backblaze();


  // To authorize the backblaze account
  b2.authorizeAccount();
  if(verifyUSER.loading) return <h1>Loading...</h1>
  return (
    <div>
      <h1>${JSON.stringify(verifyUSER.data)}</h1>
    </div>
  );
}




export default Home;