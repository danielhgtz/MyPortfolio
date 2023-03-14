import React, { useEffect, useState } from "react";
import {
  useAguinaldo,
  useFondoDeAhorro,
  usePrimeraFecha,
  useSCD,
  useSegundaFecha,
  useStepper,
  useVacation,
} from "../../../../../helper/Context";
import { LeftCircleTwoTone, RightCircleTwoTone } from "@ant-design/icons";
import { Button } from "antd";
import "./StepperControl.css";
import { FirstStepCheck } from "./Utilities";
import { MaxNumberFX } from "../Stepper/Utilities";

export const StepperControl = () => {
  const { number, setNumber } = useStepper();
  const [leftButtonBoolean, setLeftButtonBoolean] = useState(false);
  const [rightButtonBoolean, setRightButtonBoolean] = useState(false);
  const { salarioContext } = useSCD();
  const { primeraFechaContext } = usePrimeraFecha();
  const { segundaFechaContext } = useSegundaFecha();
  const { vacationDays } = useVacation();
  const { aguinaldoContext } = useAguinaldo();

  const onclickMinus = () => {
    if (number !== 0) {
      setNumber(number - 1);
      return number;
    } else {
      setNumber(0);
      return number;
    }
  };

  const onclickSum = () => {
    if (number !== MaxNumberFX()) {
      setNumber(number + 1);

      return number;
    } else {
      return MaxNumberFX();
    }
  };

  useEffect(() => {
    if (number === 0) {
      if (salarioContext) {
        setRightButtonBoolean(true);
      } else {
        setLeftButtonBoolean(false);
        setRightButtonBoolean(false);
      }
    } else if (number === 1) {
      if (primeraFechaContext < segundaFechaContext) {
        setRightButtonBoolean(true);
      } else {
        setRightButtonBoolean(false);
        setLeftButtonBoolean(true);
      }
    } else if (number === 2) {
      if (vacationDays >= 0) {
        setRightButtonBoolean(true);
      } else {
        setRightButtonBoolean(false);
        setLeftButtonBoolean(true);
      }
    } else if (number === 3) {
      if (aguinaldoContext >= 0) {
        setRightButtonBoolean(true);
      } else {
        setRightButtonBoolean(false);
        setLeftButtonBoolean(true);
      }
    } else if (number === 4 || number === 5) {
      setRightButtonBoolean(true);
      setLeftButtonBoolean(true);
    } else if (number === MaxNumberFX()) {
      setRightButtonBoolean(false);
      setLeftButtonBoolean(true);
    }
  }, [
    number,
    salarioContext,
    primeraFechaContext,
    segundaFechaContext,
    vacationDays,
    aguinaldoContext,
  ]);

  return (
    <div className="allignCenter">
      {leftButtonBoolean ? (
        <Button
          className="leftButtonParentStepper"
          onClick={onclickMinus}
          type="primary"
          shape="circle"
          icon={<LeftCircleTwoTone />}
          size={"middle"}
        />
      ) : null}
      {rightButtonBoolean ? (
        <Button
          className="rigthButtonParentStepper"
          onClick={onclickSum}
          type="primary"
          shape="circle"
          icon={<RightCircleTwoTone />}
          size={"middle"}
        />
      ) : null}
    </div>
  );
};
