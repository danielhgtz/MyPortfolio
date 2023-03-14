import { Steps } from "antd";
import React, { useEffect, useState } from "react";
import { useStepper } from "../../../../../helper/Context";
import "./Stepper.css";
import { StepperItems } from "./StepperItems";

export const Stepper = () => {
  const { number } = useStepper();

  return (
    <div>
      <div className="stepperSteps">
        <Steps current={number} items={StepperItems()} />
      </div>
    </div>
  );
};
