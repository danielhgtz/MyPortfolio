import React, { useEffect, useState } from "react";
import {
  useSCD,
  useVacation,
  useAguinaldo,
  usePrimaDeAntiguedad,
  useFondoDeAhorro,
} from "../../../../helper/Context";
import { ParseFloatToTwoDecimals } from "../../../../Utilities/Utilities";
import "./Total.css";

export const Total = () => {
  const [totalAddition, setTotalAddition] = useState();
  const {
    salarioContext,
    SCD,
    seleccion,
    modalidadDePago,
    salarioPropContext,
  } = useSCD();
  const { proportionalVacationResult, primaVacacional } = useVacation();
  const { aguinaldoProporcional } = useAguinaldo();
  const { totalDineroPrima } = usePrimaDeAntiguedad();
  const { fondoDeAhorroProporcional } = useFondoDeAhorro();

  useEffect(() => {
    if (salarioPropContext) {
      setTotalAddition(
        salarioPropContext +
          proportionalVacationResult +
          primaVacacional +
          aguinaldoProporcional +
          totalDineroPrima +
          fondoDeAhorroProporcional
      );
    } else {
      setTotalAddition(0);
    }
  }, [
    salarioPropContext,
    proportionalVacationResult,
    primaVacacional,
    aguinaldoProporcional,
    totalDineroPrima,
    fondoDeAhorroProporcional,
  ]);

  const resultadoTotal = ParseFloatToTwoDecimals(totalAddition);

  return (
    <div>
      <h1 className="totalAmount"> ${resultadoTotal}</h1>
    </div>
  );
};
