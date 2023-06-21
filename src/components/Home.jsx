/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { account } from "../config";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState();

  const fetchUser = async () => {
    try {
      const data = await account.get();
      setUserDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userDetails]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await account.deleteSession("current");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");
  const secret = urlParams.get("secret");

  if (userId) {
    account
      .updateVerification(userId, secret)
      .then(() => {
        console.log("User is verified!");
        history.push("/");
      })
      .catch((e) => {
        console.error("Verification failed");
        console.log(e);
      });
  }

  // if (userDetails) {
    return (
      <div>
        <h3>Home page (Logged In)</h3>
        <div>
          <button onClick={(e) => handleLogout(e)}>Logout</button>
        </div>
      </div>
    );
  // } else {
  //   return (
  //     <div>
  //       <h2>Please login first to see the homepage</h2>
  //       <button onClick={() => navigate("/login")}>Login</button>
  //     </div>
  //   );
  // }
};

export default Home;
