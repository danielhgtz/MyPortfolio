import React, { useEffect } from "react";
import ParentFiniquito from "./Components/Parent/Parent";
import {
  PrimeraFechaContextProvider,
  SegundaFechaContextProvider,
  SCDContextProvider,
  VacationContextProvider,
  AguinaldoContextProvider,
  PrimaDeAntiguedadContextProvider,
  FondoDeAhorroContextProvider,
  ExtrasProvider,
  StepperContextProvider,
  useIsLogged,
} from "../../helper/Context";

import "./LaborSettlementCalculator.css";
import { NavBar } from "../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const LaborSettlementCalculator = () => {
  // const { isLogged } = useIsLogged();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (isLogged === false) {
  //     navigate("../", { replace: true });
  //   } else {
  //     console.log("loggeado");
  //   }
  // }, [isLogged]);

  return (
    <div>
      <NavBar />
      <StepperContextProvider>
        <PrimeraFechaContextProvider>
          <SegundaFechaContextProvider>
            <SCDContextProvider>
              <VacationContextProvider>
                <AguinaldoContextProvider>
                  <PrimaDeAntiguedadContextProvider>
                    <FondoDeAhorroContextProvider>
                      <ExtrasProvider>
                        <ParentFiniquito />
                      </ExtrasProvider>
                    </FondoDeAhorroContextProvider>
                  </PrimaDeAntiguedadContextProvider>
                </AguinaldoContextProvider>
              </VacationContextProvider>
            </SCDContextProvider>
          </SegundaFechaContextProvider>
        </PrimeraFechaContextProvider>
      </StepperContextProvider>
    </div>
  );
};

export default LaborSettlementCalculator;
