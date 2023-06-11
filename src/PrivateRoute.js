/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

// This will make sure that any user trying to access a page rendered with this component has been logged in.
import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  appwrite: appwrite,
  component: Component,
  auth: auth,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      return localStorage.getItem("auth_state") ? (
        <Component {...props} auth={auth} />
      ) : (
        <Redirect to="/signin" />
      );
    }}
  />
);

export default PrivateRoute;
