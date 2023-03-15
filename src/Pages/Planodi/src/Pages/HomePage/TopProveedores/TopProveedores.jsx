import React from "react";
import "./TopProveedores.css";
import CarouselInfinito from "../../../componentes/CarouselInfinito/CarouselInfinito";

export default function TopProveedores({ cardsTerrazas }) {
  return (
    <div style={{ width: "100%" }} id="top_proveedores">
      <p className="top-titulos">Top proveedores</p>
      <CarouselInfinito infoCards={cardsTerrazas} />
    </div>
  );
}
