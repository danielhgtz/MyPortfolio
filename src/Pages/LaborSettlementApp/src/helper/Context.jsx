import moment from "moment";
import React, { createContext, useContext, useState } from "react";

/////////////////////////////////////////////////////////

export const PrimeraFechaContext = createContext({
  primeraFechaContext: "",
  handlePrimeraFechaChange: (e) => {},
  primeraFechaContextLetra: "",
});
// hook
export const usePrimeraFecha = () => useContext(PrimeraFechaContext);

// provider
export const PrimeraFechaContextProvider = ({ children }) => {
  const [primeraFechaContext, setPrimeraFechaContext] = useState("");
  const [primeraFechaContextLetra, setPrimeraFechaContextLetra] = useState("");

  const handlePrimeraFechaChange = (e) => {
    setPrimeraFechaContext(e);
    setPrimeraFechaContextLetra(moment(e).format("LL") + ".");
  };

  return (
    <PrimeraFechaContext.Provider
      value={{
        primeraFechaContext,
        handlePrimeraFechaChange,
        primeraFechaContextLetra,
      }}
    >
      {children}
    </PrimeraFechaContext.Provider>
  );
};

/////////////////////////////////////////////////////////

export const SegundaFechaContext = createContext({
  segundaFechaContext: "",
  handleSegundaFechaChange: (e) => {},
  segundaFechaContextLetra: "",
});
// hook
export const useSegundaFecha = () => useContext(SegundaFechaContext);

// provider
export const SegundaFechaContextProvider = ({ children }) => {
  const [segundaFechaContext, setSegundaFechaContext] = useState("");
  const [segundaFechaContextLetra, setSegundaFechaContextLetra] = useState("");

  const handleSegundaFechaChange = (e) => {
    setSegundaFechaContext(e);
    setSegundaFechaContextLetra(moment(e).format("LL") + ".");
  };

  return (
    <SegundaFechaContext.Provider
      value={{
        segundaFechaContext,
        handleSegundaFechaChange,
        segundaFechaContextLetra,
      }}
    >
      {children}
    </SegundaFechaContext.Provider>
  );
};

/////////////////////////////////////////////////////////

// context
export const SCDContext = createContext({
  salarioContext: 0,
  setSalarioContext: (e) => {},
  SCD: 0,
  handleSCDChange: (ultimoDiaPorMes) => {},
  setSeleccion: (e) => {},
  seleccion: "",
  modalidadDePago: 0,
  setModalidadDePago: (e) => {},
  salarioPropContext: 0,
  setSalarioPropContext: (e) => {},
  salarioRestanteFondoDeAhorro: "",
  setSalarioRestanteFondoDeAhorro: (e) => {},
});

// hook
export const useSCD = () => useContext(SCDContext);

// provider
export const SCDContextProvider = ({ children }) => {
  const [salarioContext, setSalarioContext] = useState(0);
  const [SCD, setSCD] = useState(0);
  const [seleccion, setSeleccion] = useState("quincena");
  const [modalidadDePago, setModalidadDePago] = useState(15);
  const [salarioPropContext, setSalarioPropContext] = useState(0);
  const [salarioRestanteFondoDeAhorro, setSalarioRestanteFondoDeAhorro] =
    useState("");

  const handleSCDChange = (ultimoDiaPorMes) => {
    if (ultimoDiaPorMes) {
      setSCD(salarioContext / ultimoDiaPorMes);
    } else {
      setSCD(salarioContext / 30);
    }
  };

  // const handleModalidadDePago = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelección(e.target.value);
  //   if (e.target.value === "mes") {
  //     setModalidadDePago(30);
  //   } else if (e.target.value === "semana") {
  //     setModalidadDePago(7);
  //   } else if (e.target.value === "quincena") {
  //     setModalidadDePago(15);
  //   }
  // };

  return (
    <SCDContext.Provider
      value={{
        salarioContext,
        setSalarioContext,
        SCD,
        handleSCDChange,
        setSeleccion,
        seleccion,
        modalidadDePago,
        setModalidadDePago,
        salarioPropContext,
        setSalarioPropContext,
        salarioRestanteFondoDeAhorro,
        setSalarioRestanteFondoDeAhorro,
      }}
    >
      {children}
    </SCDContext.Provider>
  );
};

//////////////////////////////////////////////////////////

//Context
export const AguinaldoContext = createContext({
  aguinaldoContext: 0,
  onChangeAguinaldo: (e) => {},
  diasAguinaldoProporcional: 0,
  setDiasAguinaldoProporcional: (e) => {},
  aguinaldoProporcional: 0,
  setAguinaldoProporcional: (e) => {},
});
// hook
export const useAguinaldo = () => useContext(AguinaldoContext);

// provider
export const AguinaldoContextProvider = ({ children }) => {
  const [aguinaldoContext, setAguinaldoContext] = useState();
  const [diasAguinaldoProporcional, setDiasAguinaldoProporcional] = useState(0);
  const [aguinaldoProporcional, setAguinaldoProporcional] = useState(0);

  const onChangeAguinaldo = (e) => {
    setAguinaldoContext(e);
  };

  return (
    <AguinaldoContext.Provider
      value={{
        aguinaldoContext,
        onChangeAguinaldo,
        diasAguinaldoProporcional,
        setDiasAguinaldoProporcional,
        aguinaldoProporcional,
        setAguinaldoProporcional,
      }}
    >
      {children}
    </AguinaldoContext.Provider>
  );
};

/////////////////////////////////////////////////////

//Context
export const VacationContext = createContext({
  vacationDays: 0,
  proportionalVacationResult: 0,
  onChangeDay: (e) => {},
  setProportionalVacationResult: (e) => {},
  primaVacacional: 0,
  setPrimaVacacional: (e) => {},
});

// hook
export const useVacation = () => useContext(VacationContext);

// provider
export const VacationContextProvider = ({ children }) => {
  const [vacationDays, setVacationDays] = useState();
  const [proportionalVacationResult, setProportionalVacationResult] =
    useState(0);
  const [primaVacacional, setPrimaVacacional] = useState(0);

  const onChangeDay = (e) => setVacationDays(e);

  return (
    <VacationContext.Provider
      value={{
        vacationDays,
        proportionalVacationResult,
        onChangeDay,
        setProportionalVacationResult,
        primaVacacional,
        setPrimaVacacional,
      }}
    >
      {children}
    </VacationContext.Provider>
  );
};
//////////////////////////////////////////////////////

//Context
export const PrimaDeAntiguedadContext = createContext({
  totalDineroPrima: 0,
  setTotalDineroPrima: (e) => {},
});
// hook
export const usePrimaDeAntiguedad = () => useContext(PrimaDeAntiguedadContext);

// provider
export const PrimaDeAntiguedadContextProvider = ({ children }) => {
  const [totalDineroPrima, setTotalDineroPrima] = useState(0);

  return (
    <PrimaDeAntiguedadContext.Provider
      value={{
        totalDineroPrima,
        setTotalDineroPrima,
      }}
    >
      {children}
    </PrimaDeAntiguedadContext.Provider>
  );
};
/////////////////////////////////////////////////////////////////////

export const FondoDeAhorroContext = createContext({
  booleanFA: false,
  setBooleanFA: (e) => {},
  value: 0,
  setValue: (e) => {},
  fondoDeAhorroProporcional: 0,
  setFondoDeAhorroProporcional: (e) => {},
  fondoDeAhorroPorcentaje: 0,
  setFondoDeAhorroPorcentaje: (e) => {},
});

export const useFondoDeAhorro = () => useContext(FondoDeAhorroContext);

export const FondoDeAhorroContextProvider = ({ children }) => {
  const [booleanFA, setBooleanFA] = useState(false);
  const [value, setValue] = useState(0);
  const [fondoDeAhorroProporcional, setFondoDeAhorroProporcional] = useState(0);
  const [fondoDeAhorroPorcentaje, setFondoDeAhorroPorcentaje] = useState();

  return (
    <FondoDeAhorroContext.Provider
      value={{
        booleanFA,
        setBooleanFA,
        value,
        setValue,
        fondoDeAhorroProporcional,
        setFondoDeAhorroProporcional,
        fondoDeAhorroPorcentaje,
        setFondoDeAhorroPorcentaje,
      }}
    >
      {children}
    </FondoDeAhorroContext.Provider>
  );
};

///////////////////////////////////////////////
export const ExtrasContext = createContext({
  globalIndex: 0,
  setGlobalIndex: (e) => {},
  formValuesTotal: [{ "": "" }],
  setFormValuesTotal: (param1, param2) => {},
});

export const useExtras = () => useContext(ExtrasContext);

export const ExtrasProvider = ({ children }) => {
  const [globalIndex, setGlobalIndex] = useState(0);
  const [formValuesTotal, setFormValuesTotal] = useState({});

  return (
    <ExtrasContext.Provider
      value={{
        globalIndex,
        setGlobalIndex,
        formValuesTotal,
        setFormValuesTotal,
      }}
    >
      {children}
    </ExtrasContext.Provider>
  );
};

/////////////////////////////////////////////////
export const StepperContext = createContext({
  number: 0,
  setNumber: (e) => {},
  maxNumber: 0,
});
// hook
export const useStepper = () => useContext(StepperContext);

// provider
export const StepperContextProvider = ({ children }) => {
  const [number, setNumber] = useState(0);
  const [maxNumber] = useState(0);

  return (
    <StepperContext.Provider value={{ number, setNumber, maxNumber }}>
      {children}
    </StepperContext.Provider>
  );
};

//////////////////////////////////////////////////

export const IsLoggedContext = createContext({
  isLogged: false,
  setIsLogged: (e) => {},
});
// hook
export const useIsLogged = () => useContext(IsLoggedContext);

// provider
export const IsLoggedContextProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <IsLoggedContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </IsLoggedContext.Provider>
  );
};
