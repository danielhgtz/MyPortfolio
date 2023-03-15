import React from "react";
import { InputSalario } from "./InputSalario";
import { ModalidadDePagoComponent } from "./ModalidadDePagoSalario";
import "./Salario.css";

export const InputSalarioFinalComponent = ({ ultimoDiaPorMes }) => {
  return (
    <div>
      <div className="salarioFinalDiv">
        <div className="firstBoxModalidadDePago">
          <p className="firstdBoxTitle">Forma de Pago: </p>
          <ModalidadDePagoComponent ultimoDiaPorMes={ultimoDiaPorMes} />
          <p className="firstBoxText">
            *Ingresa la forma en la que te pagan tu salario
          </p>
        </div>
        <div className="secondBoxModalidadDePago">
          <p className="secondBoxTitle">Salario Mensual: </p>
          <InputSalario ultimoDiaPorMes={ultimoDiaPorMes} />
          <p className="secondBoxText">
            *Ingresa cuánto ganas al Mes antes de Impuestos y Fondo de Ahorro.
          </p>
        </div>
      </div>
    </div>
  );
};
