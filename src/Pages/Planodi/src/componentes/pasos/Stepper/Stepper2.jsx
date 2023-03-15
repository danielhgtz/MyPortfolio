import React from "react";
import "./Stepper2.css";

export default function Stepper2({ numSteps, currentStep }) {
  return (
    <div className="div-wrp-stepper-afil">
      <p className="afil-stepper-text-progress">{`Paso ${currentStep} de ${numSteps}`}</p>
      <div className="afil-stepper-wrp">
        {[...Array(numSteps).keys()].map((item) => (
          <div
            key={item}
            className={`${
              currentStep === item + 1 ? "afil-active-step" : null
            } afil-generic-step`}
          />
        ))}
      </div>
    </div>
  );
}
