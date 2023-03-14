//UTILIZO PARAM PARA MANDAR FUNCIONES ÚNICAMENTE Y DECLARAR LOS PARAM EN LOS
//COMPONENTES A UTILIZAR. POR ESO DICE PARAM O PARAM2 PARA QUE TU LO DECLARES
//EN EL COMPONENTE.SIN EMBARGO, YA HAY ALGUNAS FUNCIONES CON UN NOMBRE POR
//DEFAULT COMO ULTIMODIA PERO NO TE DEJES ENGAÑAR, SIGUE SIENDO UN PARAM.

import {
  SegundaFechaContext,
  usePrimeraFecha,
  useSegundaFecha,
} from "../helper/Context";

export const countBetweenDates = (secondDate, firstDate) => {
  const time = Math.abs(secondDate - firstDate + 1);
  const days = Math.ceil(time / (1000 * 60 * 60 * 24));
  return days;
};

export const DiasTrabajadosDeQuincena = (
  ultimoDia,
  segundaFechaDiasTrabajados,
  primerDia,
  diferenciaDiasUltimoPrimerDia,
  difAños,
  difMeses
) => {
  const { primeraFechaContext } = usePrimeraFecha();
  const { segundaFechaContext } = useSegundaFecha();

  if (primeraFechaContext > segundaFechaContext) {
    return 0;
  } else if (primerDia === ultimoDia && difAños === 0) {
    return 1;
  } else if (ultimoDia >= 16) {
    if (primerDia >= 16 && difAños === 0) {
      return diferenciaDiasUltimoPrimerDia + 1;
    } else {
      segundaFechaDiasTrabajados = ultimoDia - 15;
      return segundaFechaDiasTrabajados;
    }
  } else if (
    ultimoDia <= 15 &&
    primerDia <= 15 &&
    difAños === 0 &&
    difMeses === 0
  ) {
    return diferenciaDiasUltimoPrimerDia + 1;
  } else {
    segundaFechaDiasTrabajados = ultimoDia;
    return segundaFechaDiasTrabajados;
  }
};

export const diasRestantesQuincena = (ultimoDia, param, param2) => {
  if (ultimoDia <= 15) {
    param = 15 - ultimoDia;
    return param;
  } else if (ultimoDia >= 16) {
    param = param2 - ultimoDia;
    return param;
  }
};

export const diasTrabajadosSemestre = (ultimoDia, diasTrabajados) => {
  if (ultimoDia >= 16) {
    diasTrabajados = ultimoDia - 15;
    return diasTrabajados;
  } else {
    diasTrabajados = ultimoDia;
    return diasTrabajados;
  }
};

//////////////////////////////////////////////////////////////////////

export const PrimeraFecha = () => {
  const { primeraFechaContext } = usePrimeraFecha();
  const primeraFecha = new Date(primeraFechaContext);
  return primeraFecha;
};

export const SegundaFecha = () => {
  const { segundaFechaContext } = useSegundaFecha();
  const segundaFecha = new Date(segundaFechaContext);
  return segundaFecha;
};

export const UltimoDia = () => {
  const ultimoDia = SegundaFecha() && SegundaFecha().getDate();
  return ultimoDia;
};

export const UltimoMes = () => {
  const ultimoMes = SegundaFecha() && SegundaFecha().getMonth() + 1;
  return ultimoMes;
};

export const UltimoAno = () => {
  const ultimoAno = SegundaFecha() && SegundaFecha().getFullYear();
  return ultimoAno;
};

export const UltimoDiaPorMes = () => {
  const ultimoDiaPorMes =
    SegundaFecha() && new Date(UltimoAno(), UltimoMes(), 0).getDate();
  return ultimoDiaPorMes;
};

const UltimoDiaUltimoAño = () => {
  return SegundaFecha() && new Date(UltimoAno(), 12, 0);
};

export const PrimerDiaUltimoAño = () => {
  return SegundaFecha() && new Date(UltimoAno(), 0, 1);
};

export const DiasAlAñoSegundaFecha = () => {
  const diasAlAñoSegundaFecha = //365 / 364 / 366
    SegundaFecha() &&
    countBetweenDates(UltimoDiaUltimoAño(), PrimerDiaUltimoAño());
  return diasAlAñoSegundaFecha;
};

export const TotalDiasTrabajados = () => {
  const { primeraFechaContext } = usePrimeraFecha();
  const { segundaFechaContext } = useSegundaFecha();

  return (
    primeraFechaContext &&
    segundaFechaContext &&
    countBetweenDates(SegundaFecha(), PrimeraFecha())
  );
};

export const DiasAcumuladosUltimoAño = () => {
  return (
    SegundaFecha() && countBetweenDates(SegundaFecha(), PrimerDiaUltimoAño())
  );
};

export const DiasTrabajadosUltimoAño = () => {
  let diasTrabajadosUltimoAño;

  if (TotalDiasTrabajados() < DiasAcumuladosUltimoAño()) {
    diasTrabajadosUltimoAño = TotalDiasTrabajados();
  } else {
    diasTrabajadosUltimoAño = DiasAcumuladosUltimoAño();
  }
  return diasTrabajadosUltimoAño;
};

export const ParseFloatTwoDecimalsNumber = (x) => {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const num = formatter.format(x);
  return parseFloat(num);
};

export const ParseFloatToTwoDecimals = (x) => {
  let number = Number.parseFloat(x).toFixed(2);
  return Number(number).toLocaleString("es-MX");
};
