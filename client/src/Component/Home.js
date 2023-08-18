import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <nav className="navbar navbar-expand-lg navbar-light ">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <li>
                  <Link className="nav-link" to="/">
                    Login
                  </Link>
                </li>
              </li>
              <li className="nav-item">
                <li>
                  <Link className="nav-link" to="/adminlogin">
                    adminLogin
                  </Link>
                </li>
              </li>
              <li className="nav-item">
                <li>
                  <Link className="nav-link" to="/registration">
                    Registration
                  </Link>
                </li>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};
