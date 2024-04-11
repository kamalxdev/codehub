
import axios from "axios";
import useGetData from "../hooks/getData";
import backblaze from "../controllers/backblaze";


function Home() {
  const b2=new backblaze();
  b2.authorizeAccount();
  return (
    <div>
      <h1>Home gguigujg</h1>
    </div>
  );
}




export default Home;