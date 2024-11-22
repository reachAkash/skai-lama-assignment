import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userDetails } from "../recoil/atoms"; // Replace with your actual user atom

const PrivateRoute = ({ element, ...rest }) => {
  const user = useRecoilValue(userDetails); // Get user data from Recoil or your state management

  return (
    <Route
      {...rest}
      element={user._id ? element : <Navigate to="/" />} // If user is not authenticated, redirect to homepage
    />
  );
};

export default PrivateRoute;
