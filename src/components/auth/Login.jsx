/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { account } from "../../config";
import SocialSignIn from "./SocialSignIn";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      await account.createEmailSession(
        loginDetails.email,
        loginDetails.password
      );
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Login</h3>
      <form>
        <div>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            onChange={(e) =>
              setLoginDetails({
                ...loginDetails,
                email: e.target.value,
              })
            }
            type="email"
            className="form-control"
            id="email"
            name="email"
          />
        </div>
        <div>
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={(e) =>
              setLoginDetails({
                ...loginDetails,
                password: e.target.value,
              })
            }
            type="password"
            className="form-control"
            id="password"
            name="password"
          />
        </div>
        <div className="mb-3">
          <span>New here?</span>{" "}
          <Link to="/signup">
            <button>Signup</button>
          </Link>
        </div>

        <button onClick={(e) => loginUser(e)} type="submit">
          Login
        </button>
      </form>
      <SocialSignIn />
    </div>
  );
};

export default Login;
