import React, { useState, useEffect } from "react";
import { CalendarInput } from "./CalendarInput";
import { usePrimeraFecha, useSegundaFecha } from "../../../../helper/Context";
import "./Calendar.css";

//Parent

const Calendar = () => {
  const [primeraFecha, setPrimeraFecha] = useState("");
  const [segundaFecha, setSegundaFecha] = useState("");
  const {
    primeraFechaContext,
    primeraFechaContextLetra,
    handlePrimeraFechaChange,
  } = usePrimeraFecha();

  const {
    segundaFechaContext,
    segundaFechaContextLetra,
    handleSegundaFechaChange,
  } = useSegundaFecha();

  useEffect(() => {
    if (primeraFecha) {
      handlePrimeraFechaChange(primeraFecha);
    }
  }, [primeraFecha]);

  useEffect(() => {
    if (segundaFecha) {
      handleSegundaFechaChange(segundaFecha);
    }
  }, [segundaFecha]);

  return (
    <div className="mainCalendarDiv">
      <div className="boxFechaDeEntrada">
        <CalendarInput
          titulo="Fecha de Entrada"
          setFecha={setPrimeraFecha}
          msgContext={primeraFechaContextLetra}
          fechaContext={primeraFechaContext}
        />
      </div>

      <div className="boxFechaDeSalida">
        <CalendarInput
          titulo="Fecha de Salida"
          setFecha={setSegundaFecha}
          msgContext={segundaFechaContextLetra}
          fechaContext={segundaFechaContext}
        />
      </div>
    </div>
  );
};
export default Calendar;
