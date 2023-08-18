import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const User = () => {
  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "Admin" && !isAuthenticated) {
        navigate("/admin");
      }
    } else {
      navigate("/");
    }
  }, [user]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link " to="/Dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to="/user">
                User
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <h1>My Account</h1>
      {user && (
        <div className="userbox">
          <div
            className="box"
            style={{
              justifyContent: "flex-start",
            }}
          >
            <div className="userlogo">logo</div>
            <h1> {user.username}</h1>{" "}
          </div>
          <div
            className="box"
            style={{
              justifyContent: "flex-start",
            }}
          >
            <h1>Subscription</h1>
            <div className="userlogo">logo</div>
            <h1> {user.product}</h1>{" "}
          </div>
        </div>
      )}
    </div>
  );
};
