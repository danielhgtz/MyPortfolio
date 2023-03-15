/**
 * Convierte array de 2 numeros a un string
 * @param range - Array[int]
 *
 * return
 * $2,000 - $4,000
 * */

export const arrayToStringMoney = (range) => {
  const firstAmount = range[0];
  const secondAmount = range[1];

  return `$${firstAmount.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })} - $${secondAmount.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};
