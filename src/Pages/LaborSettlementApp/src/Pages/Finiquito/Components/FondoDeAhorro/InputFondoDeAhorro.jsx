import "./FondoDeAhorro.css";
import { useFondoDeAhorro } from "../../../../helper/Context";
import { Checkbox, InputNumber } from "antd";
import React from "react";

export const InputFondoDeAhorro = () => {
  const {
    booleanFA,
    setBooleanFA,
    value,
    setValue,
    setFondoDeAhorroPorcentaje,
  } = useFondoDeAhorro();

  const onChangeBoolean = (e) => {
    setBooleanFA(e.target.checked);
    setFondoDeAhorroPorcentaje(0);
    setValue(0);
  };

  const onChangeFondo = (e) => {
    setValue(e);
    setFondoDeAhorroPorcentaje(e / 100);
  };

  return (
    <div className="mainFondoDeAhorroDiv">
      <div className="boxInputFondoDeAhorro">
        <h4>
          <Checkbox
            name="checkBox"
            onChange={onChangeBoolean}
            checked={booleanFA}
          />{" "}
          Fondo de Ahorro
        </h4>
        {booleanFA ? (
          <InputNumber
            className="inputNumberFondoDeAhorro"
            onChange={onChangeFondo}
            formatter={(value) => `${value}%`}
            min={0}
            max={100}
            value={value}
          />
        ) : null}
      </div>
    </div>
  );
};
