import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul >
          <li >
            <Link to="/orderHistory">
              Order History
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
          <li >
            <Link to="/Education">
             Education
            </Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul>
          <Link to="/">
           <h1 role="img" aria-label="shopping bag">Cannabinode</h1>
           </Link>
          <li >
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li >
            <Link to="/login">
              Login
            </Link>
           <li >
            <Link to="/Education">
             Education
            </Link>
          </li>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <nav>
        {showNavigation()}
      </nav>
   </header>
  );
}

export default Nav;
