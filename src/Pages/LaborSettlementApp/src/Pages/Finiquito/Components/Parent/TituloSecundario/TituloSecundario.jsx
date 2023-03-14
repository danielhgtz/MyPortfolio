import React, { useEffect, useState } from "react";
import { useStepper } from "../../../../../helper/Context";
import { StepperItems } from "../../Stepper/Stepper/StepperItems";
import { MaxNumberFX } from "../../Stepper/Stepper/Utilities";
import { Total } from "../../Total/Total";
import "./TituloSecundario.css";

export const TituloSecundario = () => {
  const { number, maxNumber } = useStepper();
  const [titulo, setTitulo] = useState(StepperItems()[0].title);
  const [showResults, setShowResults] = useState(false);

  const titleDeclaration = StepperItems()[number].title;

  useEffect(() => {
    if (number >= 0) {
      setTitulo(titleDeclaration);
    } else {
      setTitulo("error");
    }
    if (number === MaxNumberFX()) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [number]);

  return (
    <div>
      <h1 className="tituloSecundario">
        {titulo} {showResults ? <Total /> : null}
      </h1>
    </div>
  );
};
