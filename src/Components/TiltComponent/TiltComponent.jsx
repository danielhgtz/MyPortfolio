import React from "react";
import Tilt from "react-parallax-tilt";
import { imgVector } from "../../Assets/Vectors";
import "./TiltComponent.css";

export const TiltComponent = ({ param }) => {
  return (
    <Tilt
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      perspective={300}
      glareEnable={false}
    >
      <div className="tiltComponent">{param}</div>
    </Tilt>
  );
};
