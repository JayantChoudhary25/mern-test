import React from "react";

import logo from "../../Assets/logo.svg";
import menu_icon from "../../Assets/menu.svg";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "./style.css";

const navItems = [
  {
    id: 1,
    item: "home",
    path: "/home",
  },
  {
    id: 2,
    item: "resume",
    path: "/resume",
  },
  {
    id: 3,
    item: "business plan",
    path: "/business-plan",
  },
  {
    id: 4,
    item: "contact me",
    path: "/contact",
  },
  // {
  //   id: 5,
  //   item: "Admin",
  //   path: "",  
  // },
  {
    id: 6,
    item: "",
    path: "",
  },
];


const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar navbar-expand-md header_main">
        <div className="container  justify-content-between nav-header-lg">
          <a className="navbar-brand" href="/">
            <img
              src={logo}
              alt=""
              width="213"
              height="90"
              className="d-inline-block align-text-top h-michel-logo"
            />
          </a>
          <button
            class="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseNavbar"
          >
            <span className="navbar-toggler-icon">
              <img src={menu_icon} alt="bars" height="20" width="20" />
            </span>
          </button>
          
          <div
            className="navbar-collapse collapse justify-content-end responsive_drawer"
            id="collapseNavbar"
          >
            <ul className="navbar-nav">
              {navItems.map((menu) => {
                return (
                  <li className="nav-item list_items px-3">
                    {menu.item === "Admin" ? (
                      <Link
                        className="nav-link active"
                        // onClick={() => navigate("/")}
                        to="/admin_login"
                      >
                        {menu.item}
                      </Link>
                    ) : (
                      <Link
                        className="nav-link active"
                        aria-current="page"
                        to={menu.path}
                      >
                        {menu.item}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
