import { CalendarTotalTimeResult } from "../../../Calendar/CalendarTotalTimeResult";
import { SCDResult } from "../../../Salario/Results/SCDResult";
import { SalarioProporcionalResult } from "../../../Salario/Results/SalarioProporcionalResult";
import { VacationsResult } from "../../../Vacaciones/VacationsResult";
import { AguinaldoResults } from "../../../Aguinaldo/AguinaldoResults";
import { PrimaDeAntiguedadResults } from "../../../PrimaDeAntiguedad/PrimaDeAntiguedadResults";
import { FondoDeAhorroResults } from "../../../FondoDeAhorro/FondoDeAhorroResults";

import { Total } from "../../../Total/Total";

import "./CompilerResult.css";

//!
// import calendar from "../../../../../../Assets/img/calendar.png";
// import money from "../../../../../../Assets/img/money.png";
// import vacations from "../../../../../../Assets/img/vacaciones.png";
// import aguinaldo from "../../../../../../Assets/img/aguinaldo.png";
// import antiguedad from "../../../../../../Assets/img/antiguedad.png";
// import ahorro from "../../../../../../Assets/img/ahorro.png";

import React from "react";

export const CompilerResults = ({
  años,
  meses,
  dias,
  primerDia,
  primerAño,
  ultimoAño,
  ultimoDia,
  ultimoDiaPorMes,
  primeraFecha,
  segundaFecha,
  diasAlAñoSegundaFecha,
  diasTrabajadosUltimoAño,
}) => {
  return (
    <div>
      {/* <div className="SCDResult">
        <Total />
      </div> */}

      <div className="container">
        <div className="colum">
          <div className="column1">
            <div className="containerInnerDiv">
              <img className="image" src={"null"} />
              <div className="titleDiv">
                <p className="title">Duración de la Relación Laboral</p>

                <div className="results">
                  <CalendarTotalTimeResult
                    años={años}
                    meses={meses}
                    dias={dias}
                  />
                </div>
              </div>
            </div>

            <div className="containerInnerDiv">
              <img className="image" src={"null"} />
              <div className="titleDiv">
                <p className="title">Salario </p>

                <div className="results">
                  <SCDResult />
                  <SalarioProporcionalResult
                    primerDia={primerDia}
                    primerAño={primerAño}
                    ultimoAño={ultimoAño}
                    ultimoDia={ultimoDia}
                    ultimoDiaPorMes={ultimoDiaPorMes}
                    primeraFecha={primeraFecha}
                    segundaFecha={segundaFecha}
                  />
                </div>
              </div>
            </div>

            <div className="containerInnerDiv">
              <img className="image" src={"null"} />
              <div className="titleDiv">
                <p className="title">Vacaciones</p>

                <div className="results">
                  <VacationsResult
                    segundaFecha={segundaFecha}
                    diasAlAñoSegundaFecha={diasAlAñoSegundaFecha}
                    diasTrabajadosUltimoAño={diasTrabajadosUltimoAño}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column2">
            <div className="containerInnerDiv">
              <img className="image" src={"null"} />
              <div className="titleDiv">
                <p className="title">Aguinaldo</p>

                <div className="results">
                  <AguinaldoResults
                    diasTrabajadosUltimoAño={diasTrabajadosUltimoAño}
                    diasAlAñoSegundaFecha={diasAlAñoSegundaFecha}
                  />
                </div>
              </div>
            </div>
            <div className="containerInnerDiv">
              <img className="image" src={"null"} />
              <div className="titleDiv">
                <p className="title">Prima de Antiguedad</p>

                <div className="results">
                  <PrimaDeAntiguedadResults
                    años={años}
                    meses={meses}
                    dias={dias}
                  />
                </div>
              </div>
            </div>

            <div className="containerInnerDiv">
              <img className="image" src={"null"} />
              <div className="titleDiv">
                <p className="title">Fondo de Ahorro</p>

                <div className="results">
                  <FondoDeAhorroResults
                    diasAlAñoSegundaFecha={diasAlAñoSegundaFecha}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
