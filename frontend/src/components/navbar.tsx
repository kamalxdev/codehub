import { memo } from "react";
import { Link } from "react-router-dom";



function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/create/bucket">Create Bucket</Link>
        </li>
      </ul>
    </nav>
  );
}




export default memo(Navbar);