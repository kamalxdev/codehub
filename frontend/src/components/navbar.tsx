import { memo } from "react";
import { Link } from "react-router-dom";



function Navbar() {
  return (
    <nav className="border border-black flex">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/auth/signin">Sign in</Link>
        </li>
        <li>
          <Link to="/auth/signup">Sign up</Link>
        </li>
        <li>
          <Link to="/create/bucket">Create Bucket</Link>
        </li>
      </ul>
    </nav>
  );
}




export default memo(Navbar);