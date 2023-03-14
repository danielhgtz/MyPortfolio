//?Modularización del div del componente de extritos
import { Button, InputNumber, Input, Select } from "antd";
import React from "react";
import "./Extritos.css";

export const InputsPrestacionAdicional = ({
  handleChange,
  handleChangeSelect,
  handleChangeInputNumber,
  index,
  showMinus,
  remove,
}) => {
  return (
    <div className="mapLine">
      <Input
        className="firstInput"
        type="text"
        name="name"
        maxLength={30}
        placeholder="Ej. Gasolina"
        onChange={(e) => handleChange(e, index)}
      />
      <Select
        className="select"
        placeholder="Escoge forma de prestación"
        onChange={(e) => handleChangeSelect(e, index)}
      >
        <Select.Option value="mes">Al Mes</Select.Option>
        <Select.Option value="quincena">A los 15 Días</Select.Option>
        <Select.Option value="semestre">Al Semestre</Select.Option>
        <Select.Option value="año">Al Año</Select.Option>
      </Select>
      <InputNumber
        className="inputNumber "
        min={0}
        type="number"
        placeholder="$$"
        name="amount"
        onChange={(e) => handleChangeInputNumber(e, index)}
      />
      {showMinus ? (
        <Button
          className="minusButton"
          onClick={() => {
            remove(index);
          }}
        >
          -
        </Button>
      ) : null}
    </div>
  );
};
