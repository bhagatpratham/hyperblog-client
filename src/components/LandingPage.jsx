/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router";
import SocialSignIn from "./auth/SocialSignIn";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h3>LandingPage</h3>
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/signup")}>Signup</button>
      <SocialSignIn />
    </div>
  );
};

export default LandingPage;
