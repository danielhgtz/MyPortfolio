import React from "react";
import moment from "moment";
import { Stepper } from "../Stepper/Stepper/Stepper";
import { StepperControl } from "../Stepper/StepperControl/StepperControl";
import { usePrimeraFecha, useSegundaFecha } from "../../../../helper/Context";

import {
  DiasAcumuladosUltimoAñoFuncion,
  DiasAlAñoSegundaFechaFunction,
  DiasTrabajadosUltimoAñoFuncion,
  PrimeraFechaFunction,
  PrimerAñoFunction,
  PrimerDiaFunction,
  SegundaFechaFunction,
  UltimoAñoFuncion,
  UltimoDiaFunction,
  UltimoDiaPorMesFunction,
} from "./Utilities";
import "./Parent.css";

import { TituloSecundario } from "./TituloSecundario/TituloSecundario";

import { CompilerStepsAndResults } from "./CompilerStepsAndResults/CompilerSteps/CompilerSteps";
import { InstructionsMessage } from "./InstructionsMessage/InstructionsMessage";

const ParentFiniquito = () => {
  const { primeraFechaContext } = usePrimeraFecha();
  const { segundaFechaContext } = useSegundaFecha();

  const primeraFecha = PrimeraFechaFunction();
  const segundaFecha = SegundaFechaFunction();

  //Moment
  const primeraFechaMoment = moment(primeraFechaContext, "DD-MM-YYYY");
  const segundaFechaMoment = moment(segundaFechaContext, "DD-MM-YYYY");

  const años = segundaFechaMoment.diff(primeraFechaMoment, "year");
  primeraFechaMoment.add(años, "years");

  const meses = segundaFechaMoment.diff(primeraFechaMoment, "months");
  primeraFechaMoment.add(meses, "months");

  const dias = segundaFechaMoment
    .add(1, "days")
    .diff(primeraFechaMoment, "days");

  //Primer Año
  const primerDia = PrimerDiaFunction();

  // const primerMes = primeraFecha && primeraFecha.getMonth() + 1;

  //Segundo Año
  const primerAño = PrimerAñoFunction();
  const ultimoAño = UltimoAñoFuncion();
  const ultimoDia = UltimoDiaFunction();
  const ultimoDiaPorMes = UltimoDiaPorMesFunction();
  const diasAcumuladosUltimoAño = DiasAcumuladosUltimoAñoFuncion();
  const diasAlAñoSegundaFecha = DiasAlAñoSegundaFechaFunction();
  const diasTrabajadosUltimoAño = DiasTrabajadosUltimoAñoFuncion();

  return (
    <div className="black">
      <h1 className="mainTitle">Cálculo de Liquidación </h1>
      <div className="StepperBox">
        <Stepper />
      </div>
      <div className="inputsForm ">
        <TituloSecundario />

        <InstructionsMessage />

        <CompilerStepsAndResults
          ultimoDiaPorMes={ultimoDiaPorMes}
          ultimoDia={ultimoDia}
          diasAlAñoSegundaFecha={diasAlAñoSegundaFecha}
          diasTrabajadosUltimoAño={diasTrabajadosUltimoAño}
          diasAcumuladosUltimoAño={diasAcumuladosUltimoAño}
          primeraFecha={primeraFecha}
          segundaFecha={segundaFecha}
          ultimoAño={ultimoAño}
          años={años}
          meses={meses}
          dias={dias}
          primerDia={primerDia}
          primerAño={primerAño}
        />
        <div className="inputStepsForm">
          <StepperControl />
        </div>
      </div>
    </div>
  );
};

export default ParentFiniquito;
