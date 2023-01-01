import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

function Register() {
  // ---------------------------------use state---------------------------------------

  const [user, setuser] = useState({
    name: "",
    email: "",
    number: 0,
    password: "",
    password_repeat: "",
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
      "https://api.storerestapi.com/auth/register",
      user
    );
    if (data.message === "User created") {
      seterror(data.message);
      
      
      navigate("/login");
      setisLoading(false);
    } else {
      setisLoading(false);
      seterror(data.message);
    }
  }
  // --------------------------------- onSubmit event---------------------------------------

  function submitRegForm(e) {
    e.preventDefault();
    setisLoading(true);
    
    
    let vallidation = validRegForm();
    if (
      vallidation.error) {
      seterrorlist(vallidation.error.details)
      setisLoading(false);
  
    } else {
      sendRegDataToApi()
    }
  }

  // -----------------vail reg form--------------------------
  function validRegForm() {
    let scheme = Joi.object({
      name: Joi.string().min(3).max(10).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .min(3)
        .max(20)
        .required(),
      number: Joi.number().required(),
      password: Joi.string().min(3).max(10).required(),
      password_repeat: Joi.string()
        .min(3)
        .max(10)
        .required()
        .valid(Joi.ref("password")),
    });
    // setisLoading(false);
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
        <label htmlFor="name">name</label>
        <input
          type="text"
          className=" bg-transparent text-light my-2 form-control"
          name="name"
          id="name"
          onChange={getUserData}
        />
        <label htmlFor="email">email:</label>
        <input
          type="emil"
          className=" bg-transparent text-light my-2 form-control"
          name="email"
          id="email"
          onChange={getUserData}
        />
        <label htmlFor="number">number:</label>
        <input
          type="number"
          className=" bg-transparent text-light my-2 form-control"
          name="number"
          id="number"
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
        <label htmlFor="password_repeat">password repeat:</label>
        <input
          type="password"
          className=" bg-transparent text-light my-2 form-control"
          name="password_repeat"
          id="password_repeat"
          onChange={getUserData}
        />
        <button className=" btn btn-success my-2">
          {isLoading == true ? (
            <i className=" fas fa-spinner fa-spin"></i>
          ) : (
            "Register"
          )}
        </button>
      </form>
    </>
  );
}

export default Register;
