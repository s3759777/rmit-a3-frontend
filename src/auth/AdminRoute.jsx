import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./";

const AdminRoute = ({ component, ...rest }) => {
  return isAuthenticated() ? (
    <Route {...rest} component={component} />
  ) : (
    <Redirect to={"/"} />
  );
};
export default AdminRoute;
