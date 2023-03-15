import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  useSCD,
  usePrimeraFecha,
  useSegundaFecha,
  usePrimaDeAntiguedad,
} from "../../../../helper/Context";
import { ParseFloatToTwoDecimals } from "../../../../Utilities/Utilities";

export const PrimaDeAntiguedadResults = ({ años, meses, dias }) => {
  const { primeraFechaContext } = usePrimeraFecha();
  const { segundaFechaContext } = useSegundaFecha();
  const { SCD } = useSCD();
  const { totalDineroPrima, setTotalDineroPrima } = usePrimaDeAntiguedad();
  const [primaDeAntiguedadBoolean, setPrimaDeAntiguedadBoolean] =
    useState(false);

  let SCDTopado;
  const totalDiasPrima = años * 12 + meses * 1 + dias * 0.033;
  const resultadoTotalDineroPrima = ParseFloatToTwoDecimals(totalDineroPrima);

  if (SCD <= 125) {
    SCDTopado = 125;
  } else if (SCD >= 250) {
    SCDTopado = 250;
  } else {
    SCDTopado = SCD;
  }

  useEffect(() => {
    if (años >= 15) {
      setTotalDineroPrima(totalDiasPrima * SCDTopado);
    }

    if (años >= 15) {
      setPrimaDeAntiguedadBoolean(true);
    }
  }, [primeraFechaContext, segundaFechaContext, SCD, años]);

  // const primeraFechaResult = primeraFechaMoment.format("MMMM Do YYYY");
  // const segundaFechaResult = segundaFechaMoment.format("MMMM Do YYYY");

  return (
    <div>
      {primaDeAntiguedadBoolean ? (
        <p>
          La relación laboral duró más de 15 años y equivale a {totalDiasPrima}{" "}
          Días y correponde a <strong>${resultadoTotalDineroPrima}</strong> de
          pago de Prima de Antiguedad.
        </p>
      ) : (
        <p>Prima de Antiguedad no aplicable (Menos de 15 años).</p>
      )}
    </div>
  );
};
