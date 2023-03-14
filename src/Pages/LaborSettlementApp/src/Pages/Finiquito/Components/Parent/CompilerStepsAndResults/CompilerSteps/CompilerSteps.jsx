import React from "react";
import { useStepper } from "../../../../../../helper/Context";
import { InputAguinaldo } from "../../../Aguinaldo/AguinaldoInput";
import Calendar from "../../../Calendar/Calendar";
import { Extrito } from "../../../Extras/Extrito";
import { InputFondoDeAhorro } from "../../../FondoDeAhorro/InputFondoDeAhorro";
import { InputSalarioFinalComponent } from "../../../Salario/Inputs/InputSalarioFinalComponent";
import { InputVacations } from "../../../Vacaciones/InputVacations";
import { CompilerResults } from "../CompilerResult/CompilerResult";

export const CompilerStepsAndResults = ({
  ultimoDiaPorMes,
  ultimoDia,
  diasAlAñoSegundaFecha,
  diasTrabajadosUltimoAño,
  diasAcumuladosUltimoAño,
  primeraFecha,
  segundaFecha,
  ultimoAño,
  años,
  meses,
  dias,
  primerDia,
  primerAño,
}) => {
  const { number } = useStepper();

  const CompilerStepsFx = () => {
    if (number === 0) {
      return <InputSalarioFinalComponent ultimoDiaPorMes={ultimoDiaPorMes} />;
    } else if (number === 1) {
      return <Calendar />;
    } else if (number === 2) {
      return <InputVacations />;
    } else if (number === 3) {
      return <InputAguinaldo />;
    } else if (number === 4) {
      return <InputFondoDeAhorro />;
    } else if (number === 5) {
      return (
        <Extrito
          ultimoDia={ultimoDia}
          ultimoDiaPorMes={ultimoDiaPorMes}
          diasAlAñoSegundaFecha={diasAlAñoSegundaFecha}
          diasTrabajadosUltimoAño={diasTrabajadosUltimoAño}
          diasAcumuladosUltimoAño={diasAcumuladosUltimoAño}
          primeraFecha={primeraFecha}
          segundaFecha={segundaFecha}
          ultimoAño={ultimoAño}
        />
      );
    } else if (number === 6) {
      return (
        <CompilerResults
          años={años}
          meses={meses}
          dias={dias}
          primerDia={primerDia}
          primerAño={primerAño}
          ultimoAño={ultimoAño}
          ultimoDia={ultimoDia}
          ultimoDiaPorMes={ultimoDiaPorMes}
          primeraFecha={primeraFecha}
          segundaFecha={segundaFecha}
          diasAlAñoSegundaFecha={diasAlAñoSegundaFecha}
          diasTrabajadosUltimoAño={diasTrabajadosUltimoAño}
        />
      );
    }
  };

  const compiler = CompilerStepsFx();

  return <div>{compiler}</div>;
};
