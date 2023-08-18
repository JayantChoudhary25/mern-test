import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Login } from "./Component/Login";
import { loaduser } from "./actions/UserAction";
import { AdminLogin } from "./Component/AdminLogin";
import { AdminDash } from "./Component/AdminDash";
import { Dashboard } from "./Component/Dashboard";
import { Profile } from "./Component/Profile";
import { Admin } from "./Component/Admin";
import { ForgotPassword } from "./Component/ForgotPassword";
import { PasswordReset } from "./Component/PasswordReset";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  dispatch(loaduser());
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/passwordreset/:token" element={<PasswordReset/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
