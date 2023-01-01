import { createHashRouter, Navigate, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Componants/Layout/Layout";
import Home from "./Componants/Home/Home";
import Login from "./Componants/Login/Login";
import Register from "./Componants/Register/Register";
import People from "./Componants/People/People";
import Movies from "./Componants/Movies/Movies";
import Tv from "./Componants/Tv/Tv";
import jwtDecode from "jwt-decode";
import { useEffect, useContext } from "react";
import Profile from "./Componants/Profile/Profile";
import ProtectedRoute from "./Componants/ProtectedRoute/ProtectedRoute";
import Moviedetails from "./Componants/Moviedetails/Moviedetails";
import { Offline } from "react-detect-offline";
import { AuthContext } from "./Componants/Context/AuthContext";

export default function App() {
  let { userData, setuserData } = useContext(AuthContext);
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      saveUserData();
    }
  }, []);

  function saveUserData() {
    let userEncoded = localStorage.getItem("userToken");

    let decodedToken = jwtDecode(userEncoded);
    setuserData(decodedToken);
    console.log(decodedToken);
  }
  let routers = createHashRouter([
    {
      path: "/",
      element: <Layout userData={userData} setuserData={setuserData} />,
      children: [
        {
          path: "home",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "movies",
          element: (
            <ProtectedRoute>
              <Movies />
            </ProtectedRoute>
          ),
        },
        {
          path: "people",
          element: (
            <ProtectedRoute>
              <People />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile userData={userData} />
            </ProtectedRoute>
          ),
        },
        {
          path: "tv",
          element: (
            <ProtectedRoute>
              <Tv />
            </ProtectedRoute>
          ),
        },
        {
          path: "moviedetails/:id/:media_type",
          element: (
            <ProtectedRoute>
              <Moviedetails />
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        { path: "*", element: <Navigate to={"/login"} /> },
        { index: true, element: <Register /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routers} />

      <div>
        <Offline>Only shown offline (surprise!)</Offline>
      </div>
    </>
  );
}
