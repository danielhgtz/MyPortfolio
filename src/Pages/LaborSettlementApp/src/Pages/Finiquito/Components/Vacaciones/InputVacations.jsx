import React, { useEffect, useState } from "react";
import { InputNumber } from "antd";

import { useVacation } from "../../../../helper/Context";
import "./InputVacations.css";

export const InputVacations = () => {
  //const [diasDeVacaciones, setDiasDeVacaciones] = useState(0);
  const { vacationDays, onChangeDay } = useVacation();

  // const onChangeDay = (e: any) => {
  //   setDiasDeVacaciones(e);
  // };

  // useEffect(() => {
  //   if (diasDeVacaciones) {
  //     handleVacationChange(diasDeVacaciones);
  //   }
  // }, [diasDeVacaciones]);

  return (
    <div className="mainVacationsDiv">
      <div className="boxInputVacations">
        <h4>N° de Días de Vacaciones al Año:</h4>
        <InputNumber
          className="inputNumberVacations"
          type="number"
          min={0}
          max={365}
          placeholder="Ex. 0"
          onChange={onChangeDay}
          value={vacationDays}
        />
      </div>
    </div>
  );
};
