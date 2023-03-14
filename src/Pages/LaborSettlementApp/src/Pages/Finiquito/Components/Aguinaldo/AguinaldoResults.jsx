import React, { useEffect } from "react";
import {
  useAguinaldo,
  useSCD,
  usePrimeraFecha,
  useSegundaFecha,
} from "../../../../helper/Context";
import {
  ParseFloatToTwoDecimals,
  ParseFloatTwoDecimalsNumber,
} from "../../../../Utilities/Utilities";

export const AguinaldoResults = ({
  diasTrabajadosUltimoAño,
  diasAlAñoSegundaFecha,
}) => {
  const {
    aguinaldoContext,
    diasAguinaldoProporcional,
    setDiasAguinaldoProporcional,
    aguinaldoProporcional,
    setAguinaldoProporcional,
  } = useAguinaldo();
  const { SCD } = useSCD();
  const { primeraFechaContext } = usePrimeraFecha();
  const { segundaFechaContext } = useSegundaFecha();
  let diasAguinaldoMensaje = " Días.";

  useEffect(() => {
    if (primeraFechaContext && segundaFechaContext && SCD && aguinaldoContext) {
      setDiasAguinaldoProporcional(
        ParseFloatTwoDecimalsNumber(
          (aguinaldoContext / diasAlAñoSegundaFecha) * diasTrabajadosUltimoAño
        )
      );
    }
    setAguinaldoProporcional(diasAguinaldoProporcional * SCD);
  }, [
    primeraFechaContext,
    segundaFechaContext,
    SCD,
    aguinaldoContext,
    diasAguinaldoProporcional,
  ]);

  const resultadoDiasAguinaldoProporcional = ParseFloatToTwoDecimals(
    diasAguinaldoProporcional
  );
  const resultadoAguinaldoProporcional = ParseFloatToTwoDecimals(
    aguinaldoProporcional
  );

  if (aguinaldoContext === 1) {
    diasAguinaldoMensaje = " Día.";
  }

  return (
    <div>
      <p>
        Días de Aguinaldo: {aguinaldoContext} {diasAguinaldoMensaje}
      </p>
      <p>
        Días de Aguinaldo Proporcional: {resultadoDiasAguinaldoProporcional}.
      </p>
      <p>
        Monto de Aguinaldo Proporcional:{" "}
        <strong>${resultadoAguinaldoProporcional}</strong>.
      </p>
    </div>
  );
};

//aguinaldo se paga hasta noviembre arreglar.
