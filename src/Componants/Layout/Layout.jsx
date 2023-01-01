import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function Layout({ userData, setuserData }) {
  let Navigate = useNavigate();
  function logout() {
    localStorage.removeItem("userToken");
    setuserData(null);
    Navigate("/login");
  }
  return (
    <>
      <Navbar userData={userData} logout={logout} />
      <div className="container">
        <Outlet></Outlet>
      </div>
    </>
  );
}
export default Layout;
