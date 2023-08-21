import React from "react";
import logo from "../../Assets/logo.svg";
import linkedin from "../../Assets/Group.svg";
import "../Navbar/style.css";

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
  {
    id: 5,
    img: true,
    path: "/https://www.linkedin.com",
  },
];

const Footer = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg header_main">
        <div className="container justify-content-between">
          <a className="navbar-brand" href="/">
            <img
              src={logo}
              alt=""
              width="213"
              height="90"
              className="d-inline-block align-text-top"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav align-items-center mb-0">
              {navItems.map((menu) => {
                return (
                  <li className="nav-item list_items px-3">
                    <a
                      className={`active ${menu.img ? "" : "nav-link"}`}
                      aria-current="page"
                      href={menu.path}
                    >
                      {menu.img ? (
                        <img src={linkedin} alt="image" />
                      ) : (
                        menu.item
                      )}
                    </a>
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

export default Footer;
