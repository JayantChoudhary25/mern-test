import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Header from "./Component/Home/Navbar";
import BusinessPlan from "./Component/BussinessPlan";
import Home from "./Component/Home";
import Footer from "./Component/Home/Footer";
import ContactUs from "./Component/Contact";
import { Admin } from "./Component/AdminModule/Admin";


function NotFoundPage() {
  return <div className="page">Not Found Page</div>;
}

function ApplePage() {
  return <div className="page">🍎 Page</div>;
}

export default function Navbar() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/admin" element={<Admin/>} /> 
        <Route path="/404" element={<NotFoundPage />} />
          <Route path="/business_plan" element={<BusinessPlan />} />
          <Route path="/contact" element={<ContactUs />} />
        <Route path="/">
          <Route path="/" element={<ApplePage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
      <Footer />

    </BrowserRouter>
  );
}
