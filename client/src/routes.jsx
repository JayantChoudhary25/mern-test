import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
} from "react-router-dom";

import Header from "./Component/Home/Navbar";
import BusinessPlan from "./Component/BussinessPlan";
import Home from "./Component/Home";
import Footer from "./Component/Home/Footer";
import ContactUs from "./Component/Contact";
import { Admin } from "./Component/AdminModule/Admin";
import { Admin_Login } from "./Component/AdminModule/AdminLogin/Admin";
import Resume from "./Component/Home/Resume";

import NDAAgreement from "./Component/BussinessPlan/Agreement";

function NotFoundPage() {
  return <div className="page">Not Found Page</div>;
}

function HeaderMain() {
  const location = useLocation();

  if (location.pathname === "/admin" || location.pathname === "/admin-login") {
    return null;
  }

  return <Header />;
}

function FooterMain() {
  const location = useLocation();

  // Hide footer on /admin and /admin_login routes
  if (location.pathname === "/admin" || location.pathname === "/admin-login") {
    return null;
  }

  return <Footer />;
}

function PrivateRoute({ element, token }) {
  if (token !== null) {
    return element;
  } else {
    return <Navigate to="/admin-login" replace />;
  }
}

export default function Navbar() {
  const [token, setToken] = useState(
    JSON.parse(sessionStorage.getItem("accessToken"))
  );

  return (
    <BrowserRouter>
      <HeaderMain />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={<PrivateRoute element={<Admin />} token={token} />}
        />
        <Route path="/admin-login" element={<Admin_Login />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="/business-plan" element={<BusinessPlan />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/agreement" element={<NDAAgreement />} />
        <Route path="/">
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
      <FooterMain />
    </BrowserRouter>
  );
}
