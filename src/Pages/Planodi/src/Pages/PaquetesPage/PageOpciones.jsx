import React, { useEffect, useState } from "react";

import "./PageOpciones.css";
import Checkbox from "@material-ui/core/Checkbox";
import { kindOfPricesDiccionario } from "../../componentes/pasos/PasoPaquetes/ModalCreatePackage";

export default function PageOpciones({
  pagesOpciones,
  opciones,
  setOpciones,
  extrasResumenOpciones,
  setExtrasResumenOpciones,
  numeroDePersonas,
}) {
  const [idPage, setIdPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorValidacion, setErrorValidacion] = useState(false);
  const [agregarPrecio, setAgregarPrecio] = useState(false);
  const [precioExtra, setPrecioExtra] = useState(false);
  const [precioPorPersona, setPrecioPorPersona] = useState(null);

  useEffect(() => {
    setLoading(true);
    setAgregarPrecio(
      extrasResumenOpciones.filter((item) => item.id === pagesOpciones.id)[0]
        .cantidad === 0
    );
    const isPrecioPorPersona =
      pagesOpciones.kindOfPrice ===
      parseInt(kindOfPricesDiccionario.porPersona, 10);
    setPrecioPorPersona(pagesOpciones.precioExtra);
    const precioOpciones = isPrecioPorPersona
      ? pagesOpciones.precioExtra * numeroDePersonas
      : pagesOpciones.precioExtra;
    setPrecioExtra(pagesOpciones.agregarPrecio === 1 ? precioOpciones : 0);
    setIdPage(pagesOpciones.id);
    setOpciones(
      extrasResumenOpciones.filter((item) => item.id === pagesOpciones.id)[0]
        .status
    );
    setLoading(false);
  }, [pagesOpciones]);

  useEffect(() => {
    setOpciones(
      extrasResumenOpciones.filter((item) => item.id === pagesOpciones.id)[0]
        .status
    );
    setAgregarPrecio(
      extrasResumenOpciones.filter((item) => item.id === pagesOpciones.id)[0]
        .cantidad === 0
    );
  }, [extrasResumenOpciones]);

  return loading ? null : (
    <div className="page-opciones-wrp">
      <p className="page-opciones-title">{pagesOpciones.nombre}</p>
      <p className="page-opciones-desc">{pagesOpciones.descripcion}</p>
      <p style={{ fontSize: "0.8rem", marginTop: "1rem", fontWeight: 300 }}>
        Debes seleccionar {pagesOpciones.optionsToSelect} opcion
        {pagesOpciones.optionsToSelect > 1 && "es"} -
        <span
          style={
            errorValidacion
              ? {
                  color: "#e90f0f",
                  marginLeft: "10px",
                  fontWeight: 300,
                }
              : { marginLeft: "10px", fontWeight: 300 }
          }
        >
          {Object.keys(opciones).filter((key) => opciones[key]).length} de{" "}
          {pagesOpciones.optionsToSelect} seleccionados
        </span>
      </p>
      <div className="page-opciones-agregar-opciones-wrp">
        {agregarPrecio && (
          <div
            className="page-opciones-agregar-opciones-costo-extra"
            onClick={() => {
              setExtrasResumenOpciones((prevState) => {
                const prevStateObj = prevState.filter(
                  (prevOpStatus) => prevOpStatus.id === idPage
                )[0];
                return [
                  ...prevState.filter(
                    (prevOpStatus) => prevOpStatus.id !== idPage
                  ),
                  {
                    ...prevStateObj,
                    cantidad: 1,
                  },
                ];
              });
            }}
          >
            <p>Da click para agregar opciones con un costo extra de:</p>
            <p style={{ fontSize: "1rem", fontWeight: 500 }}>
              $
              {precioExtra.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}{" "}
              MXN{" "}
              {precioPorPersona ? (
                <span style={{ fontSize: "0.8rem", fontWeight: 300 }}>
                  ($
                  {precioPorPersona.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })}{" "}
                  MXN por persona)
                </span>
              ) : null}
            </p>
          </div>
        )}
        <div className="page-opciones-box-flex">
          {Object.keys(opciones).map((key, idx) => (
            <div className="page-opciones-checkboxes" key={idx}>
              <Checkbox
                size="small"
                checked={opciones[key]}
                id={key}
                onChange={() => {
                  setExtrasResumenOpciones((prevState) => {
                    const prevStateObj = prevState.filter(
                      (prevOpStatus) => prevOpStatus.id === idPage
                    )[0];
                    return [
                      ...prevState.filter(
                        (prevOpStatus) => prevOpStatus.id !== idPage
                      ),
                      {
                        ...prevStateObj,
                        status: { ...opciones, [key]: !opciones[key] },
                      },
                    ];
                  });
                }}
                style={opciones[key] ? { color: "#0D3B66" } : null}
                disabled={
                  Object.keys(opciones).filter((key) => opciones[key])
                    .length === pagesOpciones.optionsToSelect && !opciones[key]
                }
              />
              <label htmlFor={key} className="page-opciones-checkboxes-label">
                {key}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
