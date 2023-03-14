import { usePrimeraFecha, useSegundaFecha } from "../../../../helper/Context";
import { countBetweenDates } from "../../../../Utilities/Utilities";

export const PrimeraFechaFunction = () => {
  const { primeraFechaContext } = usePrimeraFecha();
  let fecha;
  return (fecha = new Date(primeraFechaContext));
};

export const SegundaFechaFunction = () => {
  const { segundaFechaContext } = useSegundaFecha();
  let fecha;
  return (fecha = new Date(segundaFechaContext));
};

export const TotalDiasTrabajadosFuncion = () => {
  const primeraFecha = PrimeraFechaFunction();
  const segundaFecha = SegundaFechaFunction();
  const { primeraFechaContext } = usePrimeraFecha();
  const { segundaFechaContext } = useSegundaFecha();

  let totalDiasTrabajados;
  if (primeraFechaContext && segundaFechaContext) {
    return (totalDiasTrabajados = countBetweenDates(
      segundaFecha,
      primeraFecha
    ));
  } else {
    return (totalDiasTrabajados = 0);
  }
};

export const PrimerDiaFunction = () => {
  return PrimeraFechaFunction() && PrimeraFechaFunction().getDate();
};

export const PrimerAñoFunction = () => {
  return PrimeraFechaFunction() && PrimeraFechaFunction().getFullYear();
};
export const UltimoAñoFuncion = () => {
  return SegundaFechaFunction() && SegundaFechaFunction().getFullYear();
};

export const UltimoDiaFunction = () => {
  return SegundaFechaFunction() && SegundaFechaFunction().getDate();
};

export const UltimoMesFunction = () => {
  return SegundaFechaFunction() && SegundaFechaFunction().getMonth() + 1;
};
//!
export const PrimerDiaDelMesFunction = () => {
  return (
    SegundaFechaFunction() &&
    new Date(UltimoAñoFuncion(), UltimoMesFunction(), 1).getDate()
  );
};

export const UltimoDiaPorMesFunction = () => {
  return (
    SegundaFechaFunction() &&
    new Date(UltimoAñoFuncion(), UltimoMesFunction(), 0).getDate()
  );
};

export const PrimerDiaUltimoAñoFuncion = () => {
  return SegundaFechaFunction() && new Date(UltimoAñoFuncion(), 0, 1);
};

export const UltimoDiaUltimoAñoFuncion = () => {
  return SegundaFechaFunction() && new Date(UltimoAñoFuncion(), 12, 0);
};

export const DiasAcumuladosUltimoAñoFuncion = () => {
  return (
    SegundaFechaFunction() &&
    countBetweenDates(SegundaFechaFunction(), PrimerDiaUltimoAñoFuncion())
  );
};

export const DiasAlAñoSegundaFechaFunction = () => {
  return (
    SegundaFechaFunction() &&
    countBetweenDates(UltimoDiaUltimoAñoFuncion(), PrimerDiaUltimoAñoFuncion())
  );
};

export const DiasTrabajadosUltimoAñoFuncion = () => {
  let diasTrabajadosUltimoAño;
  if (TotalDiasTrabajadosFuncion() < DiasAcumuladosUltimoAñoFuncion()) {
    return (diasTrabajadosUltimoAño = TotalDiasTrabajadosFuncion());
  } else {
    return (diasTrabajadosUltimoAño = DiasAcumuladosUltimoAñoFuncion());
  }
};
