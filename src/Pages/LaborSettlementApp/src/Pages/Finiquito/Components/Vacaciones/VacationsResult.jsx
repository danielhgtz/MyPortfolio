import React, { useEffect, useState } from "react";
import {
  useVacation,
  useSCD,
  usePrimeraFecha,
  useSegundaFecha,
} from "../../../../helper/Context";
import {
  ParseFloatTwoDecimalsNumber,
  ParseFloatToTwoDecimals,
} from "../../../../Utilities/Utilities";
import "./InputVacations.css";

export const VacationsResult = ({
  diasAlAñoSegundaFecha,
  diasTrabajadosUltimoAño,
}) => {
  const {
    vacationDays,
    proportionalVacationResult,
    setProportionalVacationResult,
    primaVacacional,
    setPrimaVacacional,
  } = useVacation();
  const { SCD } = useSCD();
  const { primeraFechaContext } = usePrimeraFecha();
  const { segundaFechaContext } = useSegundaFecha();

  let vacacionesProporcionales = 0;
  let diasVacacionesMensaje = "Dias";

  if (primeraFechaContext && segundaFechaContext && SCD && vacationDays) {
    vacacionesProporcionales = ParseFloatTwoDecimalsNumber(
      (vacationDays / diasAlAñoSegundaFecha) * diasTrabajadosUltimoAño
    );
  }

  useEffect(() => {
    setProportionalVacationResult(vacacionesProporcionales * SCD);
    setPrimaVacacional(proportionalVacationResult * 0.25);
  }, [vacacionesProporcionales, proportionalVacationResult, vacationDays]);

  const diasDeVacacionesProporcionales = ParseFloatToTwoDecimals(
    vacacionesProporcionales
  );

  const resultadoVacacionesProporcionales = ParseFloatToTwoDecimals(
    proportionalVacationResult
  );

  const resultadoPrimaVacacional = ParseFloatToTwoDecimals(primaVacacional);

  if (vacationDays === 1) {
    diasVacacionesMensaje = "Día";
  } else {
    diasVacacionesMensaje = "Días";
  }

  return (
    <div>
      <p>
        Vacaciones al año: {vacationDays} {diasVacacionesMensaje}.
      </p>
      <p>
        Días de Vacaciones Proporcionales: {diasDeVacacionesProporcionales}.
      </p>
      <p>
        Monto de Vacaciones Proporcionales:
        <strong> ${resultadoVacacionesProporcionales}</strong>.
      </p>

      <p>
        Prima Vacacional: <strong>${resultadoPrimaVacacional}</strong>.
      </p>
    </div>
  );
};
