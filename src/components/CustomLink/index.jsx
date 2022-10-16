import React from "react";
import "./styles.scss";
import { Link, useMatch, useNavigate, useResolvedPath } from "react-router-dom";

const CustomLink = ({ children, to, ...props }) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  const navigate = useNavigate();

  return (
    <li
      className={`custom-li ${match && "active"}`}
      style={{ cursor: "pointer" }}
      onClick={() => {
        navigate(to);
      }}
    >
      <Link className="custom-link" to={to} {...props}>
        {children}
      </Link>
      {/* {children} */}
    </li>
  );
};

export default CustomLink;
