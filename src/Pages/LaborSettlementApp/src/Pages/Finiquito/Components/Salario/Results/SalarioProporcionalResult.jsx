import React, { useEffect, useState } from "react";
import {
  DiasTrabajadosDeQuincena,
  ParseFloatToTwoDecimals,
} from "../../../../../Utilities/Utilities";
import {
  PrimeraFechaContext,
  useSCD,
  useSegundaFecha,
} from "../../../../../helper/Context";
import {
  DiasFunction,
  DiasTrabajadosMesFunction,
  DiasTrabajadosSemanalesFunction,
} from "../Utilities";
import "./SalarioResults.css";

export const SalarioProporcionalResult = ({
  primerDia,
  primerAño,
  ultimoAño,
  ultimoDia,
  ultimoDiaPorMes,
  primeraFecha,
  segundaFecha,
}) => {
  const {
    salarioContext,
    modalidadDePago,
    SCD,
    salarioPropContext,
    setSalarioPropContext,
  } = useSCD();
  const { segundaFechaContext } = useSegundaFecha();
  const [mensaje, setMensaje] = useState();

  let segundaFechaDiasTrabajados;
  const diasTrabajadosMensuales = segundaFecha.getDate();
  const primerMes = primeraFecha.getMonth();
  const segundoMes = segundaFecha.getMonth();
  const diasTrabajadosSemanales = segundaFecha.getDay();
  const difAños = ultimoAño - primerAño;
  const difMeses = segundoMes - primerMes;
  const diferenciaDiasUltimoPrimerDia = ultimoDia - primerDia;

  const diasTrabajadosQuincena = DiasTrabajadosDeQuincena(
    ultimoDia,
    segundaFechaDiasTrabajados,
    primerDia,
    diferenciaDiasUltimoPrimerDia,
    difAños,
    difMeses
  );

  const totalDiasTrabajadosPorMes = DiasTrabajadosMesFunction({
    //!
    primerDia,
    ultimoDia,
    primerMes,
    segundoMes,
    difAños,
    diferenciaDiasUltimoPrimerDia,
    diasTrabajadosMensuales,
  });

  const totalDiasTrabajadosPorSemana = DiasTrabajadosSemanalesFunction({
    primeraFecha,
    segundaFecha,
    diferenciaDiasUltimoPrimerDia,
    diasTrabajadosSemanales,
    primerMes,
    segundoMes,
    difAños,
  });

  const diasMessage = DiasFunction({
    diasTrabajadosQuincena,
    diasTrabajadosSemanales,
    diasTrabajadosMensuales,
  });

  console.log(diasTrabajadosMensuales);

  ///primerDia = 31
  ///ultimoDia = 2 //?

  // difAños === 0 &&
  // primerMes === 0 &&
  // segundoMes === 0 &&
  // ultimoDia >= primerDia

  useEffect(() => {
    if (segundaFechaContext && salarioContext) {
      if (modalidadDePago === 15) {
        console.log("a");
        setSalarioPropContext(diasTrabajadosQuincena * SCD);
        setMensaje(`${diasTrabajadosQuincena} ${diasMessage} de la Quincena.`);
      } else if (modalidadDePago === 7) {
        console.log("b");
        setSalarioPropContext(totalDiasTrabajadosPorSemana * SCD);
        setMensaje(
          `${totalDiasTrabajadosPorSemana} ${diasMessage} de la Semana.`
        );
      } else if (modalidadDePago === 30) {
        //!
        console.log("c");
        setSalarioPropContext(totalDiasTrabajadosPorMes * SCD);
        setMensaje(`${totalDiasTrabajadosPorMes} ${diasMessage} del Mes.`);
      }
    }
  }, [
    primerDia,
    primeraFecha,
    PrimeraFechaContext,
    segundaFechaContext,
    salarioContext,
    modalidadDePago,
  ]);

  const salarioPropResultado =
    "$" + ParseFloatToTwoDecimals(salarioPropContext);

  return (
    <div>
      <p>{mensaje}</p>

      <p>
        Salario Proporcional: <strong>{salarioPropResultado}</strong>.
      </p>
    </div>
  );
};
