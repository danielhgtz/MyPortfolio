import React from "react";
import { useNavigate } from "react-router-dom";
import { useIsLogged } from "../../helper/Context";
import "./Navbar.css";

export const NavBar = () => {
  const navigate = useNavigate();
  const { isLogged, setIsLogged } = useIsLogged();

  const navigateHome = () => {
    navigate("../");
  };

  return (
    <div className="navLSA">
      <div className="nameContainerLSA">
        <div className="navbarNameLSA" onClick={navigateHome}>
          Daniel H. Gutierrez
        </div>
      </div>
    </div>
  );
};
