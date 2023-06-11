/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { account } from "../../config";
import { ID } from "appwrite";

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    userId: ID.unique(),
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const signUpUser = async (e) => {
    e.preventDefault();
    try {
      const newUser = await account.create(
        ID.unique(),
        userDetails.email,
        userDetails.password,
        userDetails.name
      );
      console.log(newUser);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Signup</h3>

      <form className="container">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            onChange={(e) => {
              setUserDetails({
                ...userDetails,
                name: e.target.value,
              });
            }}
            type="text"
            id="name"
            aria-describedby="name"
            name="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            onChange={(e) => {
              setUserDetails({
                ...userDetails,
                email: e.target.value,
              });
            }}
            type="email"
            className="form-control"
            id="email"
            aria-describedby="email"
            name="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={(e) => {
              setUserDetails({
                ...userDetails,
                password: e.target.value,
              });
            }}
            type="password"
            className="form-control"
            id="password"
            name="password"
          />
        </div>
        <div className="mb-3">
          <span>Already have an account ? </span>{" "}
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>

        <button onClick={(e) => signUpUser(e)} type="submit">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
