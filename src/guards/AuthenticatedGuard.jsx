import React, { Fragment } from "react";
import { useAuthenticated } from "src/hooks/useAuthenticated";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const AuthenticatedGuard = ({ children }) => {
  const authenticated = useAuthenticated();

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  return <Fragment>{children}</Fragment>;
};
AuthenticatedGuard.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default AuthenticatedGuard;
