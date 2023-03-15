import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { RiBillFill } from "react-icons/ri";

import "./StepperPaquete.css";

export default function StepperPaquete({ progress }) {
  return (
    <div className="stepper-paquete-wrp">
      <div className="stepper-paquete-wrp2">
        <div className="stepper-paquete-progress" style={{ width: progress }} />
        <div className="stepper-paquete-progress-bg" />
        <div className="stepper-paquete-icon-wrp active">
          <FaBoxOpen />
          <p className="stepper-paquete-progress-p active">Paquete</p>
        </div>
        <div className="stepper-paquete-icon-wrp active">
          <FaCartPlus />
          <p className="stepper-paquete-progress-p active">Extras</p>
        </div>
        <div
          className={`stepper-paquete-icon-wrp ${
            progress === "100%" ? "active" : null
          }`}
        >
          <RiBillFill />
          <p
            className={`stepper-paquete-progress-p ${
              progress === "100%" ? "active" : null
            }`}
          >
            Enviar orden
          </p>
        </div>
      </div>
    </div>
  );
}
