/* eslint-disable no-unused-vars */
import React from "react";
import { account } from "../../config";
import { Button } from "@chakra-ui/react";

const SocialSignIn = () => {
  const googleAuth = (e) => {
    e.preventDefault();

    try {
      account.createOAuth2Session(
        "google",
        "http://localhost:5173/home",
        "http://localhost:5173/login"
      );
    } catch (e) {
      console.log(e);
    }
  };

  //   const facebookAuth = (e) => {
  //     e.preventDefault();

  //     try {
  //       account.createOAuth2Session(
  //         "facebook",
  //         "http://localhost:5173/home",
  //         "http://localhost:5173/login"
  //       );
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  return (
    <div>
      <b>OR:</b>
      <br />

      <Button colorScheme="red" onClick={(e) => googleAuth(e)}>
  Google
</Button>
    </div>
  );
};

export default SocialSignIn;
