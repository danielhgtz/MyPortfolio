import React, { useEffect, useState } from "react";
import { useFondoDeAhorro, useSCD } from "../../../../../helper/Context";
import { ParseFloatToTwoDecimals } from "../../../../../Utilities/Utilities";

export const SCDResult = () => {
  const { SCD, salarioContext, salarioRestanteFondoDeAhorro } = useSCD();
  const { booleanFA, fondoDeAhorroPorcentaje } = useFondoDeAhorro();

  const [mensajeSalario, setMensajeSalario] = useState("");
  const [cantidadSalario, setCantidadSalario] = useState("");

  const resultadoSCD = "$" + ParseFloatToTwoDecimals(SCD) + ".";

  useEffect(() => {
    if (booleanFA === true && fondoDeAhorroPorcentaje > 0) {
      setMensajeSalario("Salario Mensual Total F.A.*: ");
      setCantidadSalario("$" + salarioRestanteFondoDeAhorro + ".");
    } else {
      setMensajeSalario("Salario Mensual total: ");
      setCantidadSalario("$" + ParseFloatToTwoDecimals(salarioContext) + ".");
    }
  }, [fondoDeAhorroPorcentaje, booleanFA, salarioRestanteFondoDeAhorro]);

  return (
    <div>
      <p>
        {mensajeSalario}

        {cantidadSalario}
      </p>
      <p>Salario Cuota Diaria: {resultadoSCD}</p>
    </div>
  );
};
