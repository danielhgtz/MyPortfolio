import React, { useEffect, useState } from "react";

import "./PageExtras.css";
import AgregarArticulo from "../../componentes/AgregarArticulo/AgregarArticulo";
import { kindOfPricesDiccionario } from "../../componentes/pasos/PasoPaquetes/ModalCreatePackage";

export default function PageExtras({
  pageExtras,
  numberPage,
  extrasResumenArticulos,
  setExtrasResumenArticulos,
}) {
  const [extras, setExtras] = useState([]);

  useEffect(() => {
    setExtras(pageExtras.extras);
  }, [pageExtras]);

  const addArticulo = (id, precio, nombre, isArticulo, kindOfPrice) => {
    setExtrasResumenArticulos((prevState) => {
      const prevStateObj = prevState.filter(
        (prevArtStatus) => prevArtStatus.id === id
      );
      if (prevStateObj.length) {
        return [
          ...prevState.filter((prevArtStatus) => prevArtStatus.id !== id),
          {
            ...prevStateObj[0],
            cantidad: prevStateObj[0].cantidad + 1,
          },
        ];
      } else {
        return [
          ...prevState,
          {
            id,
            precio,
            nombre,
            cantidad: 1,
            isArticulo: isArticulo === 1,
            kindOfPrice,
          },
        ];
      }
    });
  };

  const removeArticulo = (id) => {
    setExtrasResumenArticulos((prevState) => {
      const prevStateObj = prevState.filter((item) => item.id === id);
      if (prevStateObj.length) {
        if (prevStateObj[0].cantidad === 1) {
          return [...prevState.filter((item) => item.id !== id)];
        } else {
          return [
            ...prevState.filter((item) => item.id !== id),
            {
              ...prevStateObj[0],
              cantidad: prevStateObj[0].cantidad - 1,
            },
          ];
        }
      }
      return prevState;
    });
  };

  return (
    <div className="page-extras-wrp">
      <p className="page-extras-title">
        Extras {numberPage > 1 ? numberPage : null}
      </p>
      <div className="page-extras-articulos-flexbox">
        {extras.map((item) => (
          <AgregarArticulo
            name={item.nombre}
            image={item.img}
            precio={item.precioExtra}
            cantidad={
              extrasResumenArticulos.filter(
                (prevArtStatus) => prevArtStatus.id === item.id
              ).length
                ? extrasResumenArticulos.filter(
                    (prevArtStatus) => prevArtStatus.id === item.id
                  )[0].cantidad
                : 0
            }
            maxCantidad={item.cantidadExtra}
            description={item.descripcion}
            addFunction={() =>
              addArticulo(
                item.id,
                item.precioExtra,
                item.nombre,
                item.isArticulo,
                item.kindOfPrice
              )
            }
            removeFunction={() => removeArticulo(item.id)}
            key={item.id}
            isArticulo={item.isArticulo === 1}
            precioPorPersona={
              item.kindOfPrice ===
              parseInt(kindOfPricesDiccionario.porPersona, 10)
            }
          />
        ))}
      </div>
    </div>
  );
}
