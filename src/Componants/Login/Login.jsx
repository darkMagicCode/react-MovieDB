import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

function Login({saveUserData}) {
  // ---------------------------------use state---------------------------------------
  const [user, setuser] = useState({
    email: "",
    password: "",
  });
  // ---------------------------------error of Api---------------------------------------

  const [error, seterror] = useState("");
  // --------------------------------- button spinner---------------------------------------

  const [isLoading, setisLoading] = useState(false);

  // ---------------------------------error list of valid form---------------------------------------
  const [errorlist, seterrorlist] = useState([]);

  // ---------------------------------decrations---------------------------------------

  let navigate = useNavigate();

  // ---------------------------------onChange Event form on input---------------------------------------

  function getUserData(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setuser(myUser);
  }
  // ---------------------------------send data to api---------------------------------------

  async function sendRegDataToApi() {
    let { data } = await axios.post(
      "https://api.storerestapi.com/auth/login",
      user
    );
    if (data.data.access_token) {
        setisLoading(false);
        localStorage.setItem('userToken', data.data.access_token)
        console.log(data.data.access_token);
        saveUserData()
        navigate("/home");
    } else {
        console.log(data.message);
        seterror(data.message);
        setisLoading(false);
    }
  }
  // --------------------------------- onSubmit event---------------------------------------

  function submitRegForm(e) {
    e.preventDefault();
    setisLoading(true);
    
    let vallidation = validRegForm();
    if (vallidation.error) {
        seterrorlist(vallidation.error.details);
        console.log(vallidation.error.details );
        setisLoading(false);
        
    } else {
        sendRegDataToApi();

    }
  }
  // -----------------vail reg form--------------------------
    function validRegForm() {
        setisLoading(true);

    let scheme = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .min(3)
        .max(20)
        .required(),
      password: Joi.string().min(3).max(30).required(),
    });
    return scheme.validate(user, { abortEarly: false });
  }

  // --------------------------------------------render part--------------------------------------------

  return (
    <>
      {errorlist.length > 0 ? (
        <div className="alert alert-danger text-black ">
          {" "}
          {errorlist.map((err, index) => (
            <li key={index} className="  px-2">
              {" "}
              {err.message}{" "}
            </li>
          ))}
        </div>
      ) : (
        ""
      )}

      {error.length > 0 ? (
        <div className=" alert alert-danger ">{error}</div>
      ) : (
        ""
      )}

      <form onSubmit={submitRegForm}>
        <label htmlFor="email">email:</label>
        <input
          type="emil"
          className=" bg-transparent text-light my-2 form-control"
          name="email"
          id="email"
          onChange={getUserData}
        />

        <label htmlFor="password">password:</label>
        <input
          type="password"
          className=" bg-transparent text-light my-2 form-control"
          name="password"
          id="password"
          onChange={getUserData}
        />

        <button className=" btn btn-success my-2">
          {isLoading == true ? (
            <i className=" fas fa-spinner fa-spin"></i>
          ) : (
            "login"
          )}
        </button>
      </form>
    </>
  );
}

export default Login;
