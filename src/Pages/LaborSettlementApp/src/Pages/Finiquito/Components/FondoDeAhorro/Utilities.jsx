import {
  usePrimeraFecha,
  useSCD,
  useSegundaFecha,
} from "../../../../helper/Context";
import { countBetweenDates } from "../../../../Utilities/Utilities";

export const DecToDec = () => {
  const { primeraFechaContext } = usePrimeraFecha();
  const { segundaFechaContext } = useSegundaFecha();

  const primeraFecha = new Date(primeraFechaContext);
  const segundaFecha = new Date(segundaFechaContext);

  const diciembreAnoAnterior = new Date(segundaFecha.getFullYear() - 1, 11, 1); //dic 01
  const diciembreAnoActual = new Date(segundaFecha.getFullYear(), 11, 1); // año actual

  let totalDiasFondoDeAhorro;

  if (segundaFecha > diciembreAnoActual && primeraFecha < diciembreAnoActual) {
    totalDiasFondoDeAhorro = countBetweenDates(
      segundaFecha,
      diciembreAnoActual
    );
  } else if (primeraFecha < diciembreAnoAnterior) {
    totalDiasFondoDeAhorro = countBetweenDates(
      segundaFecha,
      diciembreAnoAnterior
    );
  } else if (primeraFecha > diciembreAnoActual) {
    totalDiasFondoDeAhorro = countBetweenDates(segundaFecha, primeraFecha);
  } else {
    totalDiasFondoDeAhorro = countBetweenDates(segundaFecha, primeraFecha);
  }
  return totalDiasFondoDeAhorro;
};

export const FondoDeAhorroMensualFx = (fondoDeAhorroPorcentaje) => {
  const { salarioContext } = useSCD();
  return salarioContext * fondoDeAhorroPorcentaje * 2;
};

export const DiasMessage = () => {
  let diaMessage = "Días";
  if (DecToDec() === 1) {
    diaMessage = "Día";
  }
  return diaMessage;
};
