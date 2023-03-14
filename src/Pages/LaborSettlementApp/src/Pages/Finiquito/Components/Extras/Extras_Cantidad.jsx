import { useState } from "react";
// import { useSegundaFecha } from "../../../../helper/Context";
// import {
//   countBetweenDates,
//   diasTrabajadosDeQuincena,
//   PrimeraFecha,
//   SegundaFecha,
//   UltimoDia,
//   UltimoAno,
//   UltimoDiaPorMes,
//   PrimerDiaUltimoAño,
//   DiasAlAñoSegundaFecha,
//   DiasAcumuladosUltimoAño,
//   DiasTrabajadosUltimoAño,
// } from "../../../../Utilities/Utilities";

// export const ExtrasCantidad = () => {
//   const [formValues, setFormValues] = useState<any>([]);
//   const [resultados, setResultados] = useState<any>([]);
//   const { segundaFechaContext } = useSegundaFecha();

//   let nuevaFormValues: any = [...formValues];
//   let ShowMinus: boolean = true;
//   let ShowPlus: boolean = true;
//   let diasTrabajados: number = 0;

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
//     nuevaFormValues[i][e.target.name] = e.target.value;
//     setFormValues(nuevaFormValues);
//   };

//   const handleChangeSelect = (
//     e: React.ChangeEvent<HTMLSelectElement>,
//     index: number
//   ) => {
//     const inputData = [...resultados];
//     inputData[index] = e.target.value;
//     setResultados(inputData);
//   };

//   if (formValues.length === 0) {
//     ShowMinus = false;
//   } else if (formValues.length >= 3) {
//     ShowPlus = false;
//   }

//   const add = () => {
//     setFormValues([...formValues, { name: "", amount: 0 }]);
//     const nuevosResultados: any = [...resultados, []];
//     setResultados(nuevosResultados);
//   };

//   const remove = (index: number) => {
//     const deleteForm = [...formValues];
//     deleteForm.splice(index, 1);
//     setFormValues(deleteForm);
//   };

//   const diasDePago = diasTrabajadosDeQuincena(UltimoDia(), diasTrabajados);
//   const mitadDeAño = DiasAlAñoSegundaFecha() / 2;

//   let diasAlSemestre: number;

//   const mitadFecha: Date = new Date(UltimoAno(), 6, 2);

//   const mitadFechaNumero = countBetweenDates(mitadFecha, PrimerDiaUltimoAño());

//   if (DiasAcumuladosUltimoAño() >= mitadDeAño) {
//     if (
//       DiasTrabajadosUltimoAño() <= mitadDeAño &&
//       PrimeraFecha() > mitadFecha
//     ) {
//       diasAlSemestre = countBetweenDates(SegundaFecha(), PrimeraFecha());
//     } else {
//       diasAlSemestre = countBetweenDates(SegundaFecha(), mitadFecha);
//     }
//   } else if (DiasAcumuladosUltimoAño() < mitadFechaNumero) {
//     diasAlSemestre = DiasTrabajadosUltimoAño();
//   }

//   const palabra = (index: number) => {
//     return formValues[index].name;
//   };

//   const cantidad = (index: number) => {
//     if (segundaFechaContext && formValues[index].amount && resultados[index]) {
//       if (resultados[index] === "mes") {
//         let mes = formValues[index].amount / UltimoDiaPorMes();
//         mes = parseFloat(mes.toFixed(2));

//         let acumuladoMes = mes * diasDePago;
//         acumuladoMes = parseFloat(acumuladoMes.toFixed(2));
//         const mensaje = `$ ${mes} por Día. $${acumuladoMes} Acumulado.`;

//         return mensaje;
//       } else if (resultados[index] === "quincena") {
//         let quincena = formValues[index].amount / 15;
//         quincena = parseFloat(quincena.toFixed(2));

//         let acumuladoQuincena = quincena * diasDePago;
//         acumuladoQuincena = parseFloat(acumuladoQuincena.toFixed(2));
//         const mensaje = `$ ${quincena} por Día. $ ${acumuladoQuincena} Acumulado.`;

//         return mensaje;
//       } else if (resultados[index] === "semestre") {
//         let semestre = formValues[index].amount / mitadDeAño;
//         semestre = parseFloat(semestre.toFixed(2));

//         let acumuladoSemestre = semestre * diasAlSemestre;
//         acumuladoSemestre = parseFloat(acumuladoSemestre.toFixed(2));
//         const mensaje = `$ ${semestre} por Día. $ ${acumuladoSemestre} Acumulado.`;

//         return mensaje;
//       } else if (resultados[index] === "año") {
//         let ano = formValues[index].amount / DiasAlAñoSegundaFecha();
//         ano = parseFloat(ano.toFixed(2));

//         let acumuladoAno = ano * DiasTrabajadosUltimoAño();
//         acumuladoAno = parseFloat(acumuladoAno.toFixed(2));
//         const mensaje = `$ ${ano} por Día. $  ${acumuladoAno} Acumulado.`;
//         return mensaje;
//       }
//     }
//   };

//   return (
//     <div>
//       Prestación Adicional:
//       {formValues.map((e: any, index: number) => {
//         return (
//           <div key={index}>
//             <input
//               type="text"
//               name="name"
//               value={e.name}
//               placeholder="Nombre de la Prestación"
//               onChange={(e) => handleChange(e, index)}
//             />
//             <select
//               defaultValue={"DEFAULT"}
//               onChange={(e) => handleChangeSelect(e, index)}
//             >
//               <option value="DEFAULT" disabled>
//                 Escoge un tipo de pago
//               </option>
//               <option value="mes">Al Mes</option>
//               <option value="quincena">A los 15 Días</option>
//               <option value="semestre">Al Semestre</option>
//               <option value="año">Al Año</option>
//             </select>
//             <input
//               className="containerDiv "
//               min="0"
//               type="number"
//               placeholder="$$"
//               prefix="$"
//               name="amount"
//               onChange={(e) => handleChange(e, index)}
//             />
//             {ShowMinus ? (
//               <button
//                 onClick={() => {
//                   remove(index);
//                 }}
//               >
//                 -
//               </button>
//             ) : null}
//             {palabra(index)} {cantidad(index)}
//           </div>
//         );
//       })}
//       {ShowPlus ? <button onClick={add}>+</button> : null}
//     </div>
//   );
// };
