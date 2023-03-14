import React, { useState, useEffect } from "react";
import { useStepper } from "../../../../../helper/Context";
import "./InstructionsMessage.css";

export const InstructionsMessage = () => {
  const { number } = useStepper();
  const [intructionMessage, setInstructionMessage] = useState();
  const [optionalAsterisk, setOptionalAsterisk] = useState("");
  const [showInstructionMessage, setShowInstructionMessage] = useState(true);

  useEffect(() => {
    if (number === 0) {
      setInstructionMessage("Llena los siguientes datos");
    } else if (number === 1) {
      setInstructionMessage("Ingresa tu fecha de Ingreso y de Salida:");
    } else if (number === 2) {
      setInstructionMessage(
        "Ingresa los días de Vacaciones que tienes al Año:"
      );
    } else if (number === 3) {
      setInstructionMessage(
        "Ingresa la cantidad de días de Aguinaldo que te corresponden al Año:"
      );
    } else if (number === 4) {
      setInstructionMessage("Ingresa tu porcentaje de Fondo de Ahorro:");
    } else if (number === 5) {
      setInstructionMessage(
        "Ingresa alguna Prestación Adicional con la que cuentes:"
      );
    } else {
      setInstructionMessage("");
    }

    if (number === 4 || number === 5) {
      setOptionalAsterisk("*");
    } else {
      setOptionalAsterisk("");
    }

    if (number === 6) {
      setShowInstructionMessage(false);
    } else {
      setShowInstructionMessage(true);
    }
  }, [number]);

  return (
    <div>
      {showInstructionMessage ? (
        <div className="instructionMessageBox">
          <span>
            <p className="optionalAsterisk">{optionalAsterisk}</p>
            <p>{intructionMessage}</p>
          </span>
        </div>
      ) : null}
    </div>
  );
};
