import React from "react";
import Tilt from "react-parallax-tilt";

import "./TiltComponent.css";

export const HomeMainTiltComponent = ({ className, paramImg }) => {
  return (
    <Tilt
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      perspective={300}
      glareEnable={false}
    >
      <div className={className}>
        <img className="imgScaleHomeMain" src={paramImg} />
      </div>
    </Tilt>
  );
};

export const HomeIntroductionTiltComponent = ({ className, paramImg }) => {
  return (
    <Tilt
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      perspective={300}
      glareEnable={false}
    >
      <div className={className}>
        <img className="imgScaleHomeIntroduction" src={paramImg} />
      </div>
    </Tilt>
  );
};
