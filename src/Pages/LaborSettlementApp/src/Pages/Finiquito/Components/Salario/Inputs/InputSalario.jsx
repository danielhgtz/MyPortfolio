import React, { useEffect } from "react";
import { useSCD } from "../../../../../helper/Context";
import { InputNumber } from "antd";

export const InputSalario = ({ ultimoDiaPorMes }) => {
  const { handleSCDChange, salarioContext, setSalarioContext } = useSCD();

  const onChangeSalary = (e) => {
    setSalarioContext(parseInt(e));
  };

  useEffect(() => {
    handleSCDChange(ultimoDiaPorMes);
    if (!salarioContext) {
      setSalarioContext(0);
    }
  }, [salarioContext, ultimoDiaPorMes]);

  return (
    <div>
      <InputNumber
        prefix="$"
        style={{ width: "100%" }}
        min={0}
        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        onChange={onChangeSalary}
        value={salarioContext}
      />
    </div>
  );
};
