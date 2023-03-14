import React, { useEffect, useState } from "react";
import {
  usePrimeraFecha,
  useSCD,
  useSegundaFecha,
  useStepper,
} from "../../../../../helper/Context";

export const FirstStepCheck = () => {
  const { number, setNumber, maxNumber } = useStepper();
  const { salarioContext } = useSCD();

  //const [leftButtonBoolean, setLeftButtonBoolean] = useState<boolean>(false);
  const [rightButtonBoolean, setRightButtonBoolean] = useState(false);

  useEffect(() => {
    if (salarioContext) {
      setRightButtonBoolean(true);
    } else {
      setRightButtonBoolean(false);
    }
  }, [number, salarioContext]);

  return rightButtonBoolean;
};

export const SecondStepCheck = () => {
  const { number, setNumber, maxNumber } = useStepper();
  const { salarioContext } = useSCD();

  const [leftButtonBoolean, setLeftButtonBoolean] = useState(false);
  const [rightButtonBoolean, setRightButtonBoolean] = useState(false);

  const { primeraFechaContext } = usePrimeraFecha();
  const { segundaFechaContext } = useSegundaFecha();

  useEffect(() => {
    if (number === 1 && primeraFechaContext && segundaFechaContext) {
      setRightButtonBoolean(true);
    } else {
      setRightButtonBoolean(false);
    }
  }, [number, primeraFechaContext, segundaFechaContext]);
};
//?! EN STAND BY A MODULARIZARSE
