import React, { useState, useEffect } from "react";
import { useSCD, useSegundaFecha } from "../../../../../helper/Context";
import { Radio } from "antd";

export const ModalidadDePagoComponent = ({ ultimoDiaPorMes }) => {
  // const [seleccion, setSeleccion] = useState<any>();
  const { seleccion, setSeleccion, modalidadDePago, setModalidadDePago } =
    useSCD();
  const { segundaFechaContext } = useSegundaFecha();

  const handleModalidadDePago = (e) => {
    setSeleccion(e.target.value);

    if (e.target.value === "semana") {
      setModalidadDePago(7);
    } else if (e.target.value === "quincena") {
      setModalidadDePago(15);
    } else if (e.target.value === "mes") {
      setModalidadDePago(30);
    }
  };

  return (
    <div>
      <Radio.Group
        defaultValue="quincena"
        buttonStyle="solid"
        value={seleccion}
      >
        <Radio.Button
          value="quincena"
          id="quincena"
          onChange={(e) => handleModalidadDePago(e)}
        >
          Quincena
        </Radio.Button>
        <Radio.Button
          value="mes"
          id="mes"
          onChange={(e) => handleModalidadDePago(e)}
        >
          Mes
        </Radio.Button>
        <Radio.Button
          value="semana"
          id="semana"
          onChange={(e) => handleModalidadDePago(e)}
        >
          Semana
        </Radio.Button>
      </Radio.Group>
    </div>
  );
};
