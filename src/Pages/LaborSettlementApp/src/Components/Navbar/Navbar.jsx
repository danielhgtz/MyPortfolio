import React from "react";
import { useNavigate } from "react-router-dom";
import { useIsLogged } from "../../helper/Context";
import "./Navbar.css";

export const NavBar = () => {
  const navigate = useNavigate();
  const { isLogged, setIsLogged } = useIsLogged();

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
    <div className="navLSA">
      <div onClick={navigateHome} className="siteTitle">
        Home
      </div>
    </div>
  );
};
