import React from "react";
import Tilt from "react-parallax-tilt";

import "./TiltComponent.css";

export const TiltComponent = ({ className, paramImg }) => {
  return (
    <Tilt
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      perspective={300}
      glareEnable={false}
    >
      <div className={className}>
        <img className="imgScale" src={paramImg} />
      </div>
    </Tilt>
  );
};
