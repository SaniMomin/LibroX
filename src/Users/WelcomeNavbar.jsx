import React from "react";
import { Link } from "react-router-dom";
import "../UserSide_CSS(Files)/WelcomeNavbarUR.css";

const WelcomeNavbar = () => {
  return (
    <div className="WelcomeNavrbar-wrapper">
      <div className="WelcomeNavrbar-container">
        <nav className="WelcomeNavrbar-menu">
          <ul>
            <div className="WelcomeNavrbar-heading">
              <li>
                <strong>LibroX Online Library</strong>
              </li>
            </div>
            <div className="WelcomeNavrbar-links">
              <li>
                <Link to="signupUR">Signup</Link>
              </li>
              <li>
                <Link to="loginUR">Login</Link>
              </li>
            </div>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default WelcomeNavbar;
