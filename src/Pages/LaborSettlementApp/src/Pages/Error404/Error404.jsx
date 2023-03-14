import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
// import dog from "../../Assets/Error404/error404Dog.png";
import { NavBar } from "../../Components/Navbar/Navbar";

import "./Error404.css";

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <div>
      <NavBar />
      <h1 className="error404MainTitle">Error 404</h1>
      <div className="error404ContentDiv">
        <h1 className="centerContent">Looks like you are lost :&#40;</h1>
        <img className="centerContent" src={"null"} />
      </div>
      <br />
      <br />

      <h4 className="centerContent">
        You can stay and pet our dog if you want.
      </h4>
      <h4 className="centerContent">Or... You can return</h4>
      <Button
        className="error404HomeBtn"
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </Button>
    </div>
  );
};

export default Error404;
