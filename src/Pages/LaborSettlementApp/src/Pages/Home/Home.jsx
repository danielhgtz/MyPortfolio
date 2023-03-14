import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../../Components/Navbar/Navbar";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <NavBar />

      <h1 className="homeMainTitle">Cálculo de Liquidación </h1>
      <div className="placerHome">
        <div className="shapeHome" />
        <div className="shapeHome" />
      </div>
      <div className="homeDiv">
        <h4 className="homeSecondaryTitle">
          Elige una de las siguiente opciones:
        </h4>
        <div className="verticalDiv">
          <Button
            type="primary"
            size="large"
            className="homeBtn"
            onClick={() => {
              navigate("./Register");
            }}
          >
            <span className="align">RENUNCIA</span>
          </Button>

          <Button
            type="primary"
            size="large"
            className="homeBtn"
            onClick={() => {
              navigate("./Register");
            }}
          >
            <span className="align">DESPIDO</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
