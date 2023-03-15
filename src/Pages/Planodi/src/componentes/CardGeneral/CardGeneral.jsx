/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { GoVerified } from "react-icons/go/index";

import "./CardGeneral.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa/index";
import { BsDot } from "react-icons/bs/index";
import useMediaQuery from "@material-ui/core/useMediaQuery";

/**
 * Componente de slider con cards
 * @param {{nombre: string, precio: string, descripcion: string, pathUrl: string}[]}  info
 * */

export default function CardGeneral({ width, info }) {
  const mobile = useMediaQuery("(max-width:960px)");

  const [imagenActual, setImagenActual] = useState(0);
  const {
    id,
    nombre,
    verificado,
    usuario,
    tipo,
    pathUrl,
    description,
    ciudad,
    estado,
    category,
    images,
    logoUrl,
    precio,
  } = info;
  const nextImage = (direccion) => {
    if (direccion > 0) {
      imagenActual === images.length - 1
        ? setImagenActual(imagenActual)
        : setImagenActual(imagenActual + 1);
    }
    if (direccion < 0) {
      imagenActual === 0
        ? setImagenActual(images.length - 1)
        : setImagenActual(imagenActual - 1);
    }
  };

  return (
    <a
      href={`/negocios/${pathUrl}`}
      target={mobile ? null : "_blank"}
      rel={mobile ? null : "noopener noreferrer"}
      className="cardGen-links"
    >
      <div className="card-wrapper" style={{ width }}>
        <div
          className="card-media"
          style={{
            backgroundImage: `url('${images[imagenActual].url}')`,
          }}
        >
          {imagenActual === images.length - 1 ? (
            <div className="ver-mas-card-general">
              <p style={{ margin: "0" }}>VER MÁS</p>
            </div>
          ) : null}
          {logoUrl ? (
            <div
              style={{ background: `url(${logoUrl})` }}
              className="card-logo"
            />
          ) : null}
          <FaAngleLeft
            className="imgs-card-gen-izq"
            onClick={(e) => {
              e.preventDefault();
              nextImage(-1);
            }}
            style={mobile && { opacity: 1 }}
          />
          <FaAngleRight
            className="imgs-card-gen-der"
            onClick={(e) => {
              e.preventDefault();
              nextImage(1);
            }}
            style={mobile && { opacity: 1 }}
          />
        </div>
        <div className="card-info">
          <p className="card-titulo">
            {nombre.length >= 45 ? `${nombre.substring(0, 45)}...` : nombre}
            {verificado ? (
              <span
                style={{
                  color: "#8c50ff",
                  marginLeft: "0.3rem",
                }}
              >
                <GoVerified
                  style={{
                    marginBottom: "0.2rem",
                  }}
                />
              </span>
            ) : null}
          </p>
          <p className="card-descripcion">
            {estado}
            {ciudad ? (
              <>
                <BsDot />
                {ciudad}
              </>
            ) : null}
            <BsDot /> {precio ? precio : "$$$"} <BsDot /> {category}
          </p>
          {/*<p className="card-exp-content-2">{description}</p>*/}
        </div>
      </div>
    </a>
  );
}

CardGeneral.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.number,
    nombre: PropTypes.string,
    precio: PropTypes.string,
    descripcion: PropTypes.string,
    pathUrl: PropTypes.string,
    alcohol: PropTypes.number,
    capacidad: PropTypes.string,
    horarioDia: PropTypes.number,
    horarioNoche: PropTypes.number,
    estacionamiento: PropTypes.number,
  }),
};
