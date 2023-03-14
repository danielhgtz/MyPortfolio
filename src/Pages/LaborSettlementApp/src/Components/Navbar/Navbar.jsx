import React from "react";
import { useNavigate } from "react-router-dom";
import { useIsLogged } from "../../helper/Context";
import "./Navbar.css";

export const NavBar = () => {
  const navigate = useNavigate();
  const { isLogged, setIsLogged } = useIsLogged();
  console.log(isLogged);

  const navigateHome = () => {
    navigate("../", { replace: true });
  };

  const navigateToRegister = () => {
    navigate("../Register", { replace: true });
  };

  const navigateToLogin = () => {
    navigate("../Login", { replace: true });
  };

  const logout = () => {
    setIsLogged(false);
    navigate("../", { replace: true });
  };

  return (
    <nav>
      <a onClick={navigateHome} className="siteTitle">
        Home
      </a>
      {isLogged ? (
        <ul>
          <li className="active">
            <a onClick={logout}>Logout</a>
          </li>
        </ul>
      ) : (
        <ul>
          <li className="active">
            <a onClick={navigateToRegister}>Register</a>
          </li>
          <li className="active">
            <a onClick={navigateToLogin}>Login</a>
          </li>
        </ul>
      )}
    </nav>
  );
};
