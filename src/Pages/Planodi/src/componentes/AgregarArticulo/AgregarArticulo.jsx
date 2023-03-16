import React from "react";

import "./AgregarArticulo.css";
import PropTypes from "prop-types";
import { HiOutlinePencil } from "react-icons/hi/index";
import { MdAddShoppingCart, MdRemoveShoppingCart } from "react-icons/md";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { alpha } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  buttonAdd: {
    marginTop: "0.9rem",
    fontSize: "0.8rem",
    // borderRadius: "6px",
    // padding: "16px 26px",
    backgroundColor: "white",
    color: "#3b3b3b",
    "&:hover": {
      backgroundColor: alpha("#fcfcfc", 0.9),
    },
    "&:focus": {
      outline: "none",
    },
  },
  buttonRemove: {
    backgroundColor: alpha("#de3636", 1),
    marginTop: "0.9rem",
    fontSize: "0.8rem",
    color: "white",
    "&:hover": {
      backgroundColor: alpha("#de3636", 0.9),
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

export default function AgregarArticulo({
  name,
  image,
  precio,
  cantidad,
  maxCantidad,
  addFunction,
  removeFunction,
  description,
  edit,
  editArticulo,
  isArticulo,
  precioPorPersona,
}) {
  const classes = useStyles();
  return (
    <div
      className="wrp-articulo"
      style={edit ? { cursor: "pointer" } : null}
      onClick={edit ? editArticulo : null}
    >
      {edit && (
        <div className="articulo-edit-pencil">
          <HiOutlinePencil />
        </div>
      )}
      <div
        className="articulo-foto"
        style={{ background: `url(${image}) #FBDAC9` }}
      />
      <p className="articulo-titulo">
        {name} -{" "}
        <span style={{ fontWeight: 500 }}>
          $
          {precio.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}{" "}
          MXN {precioPorPersona && "por persona"}
        </span>
      </p>
      {isArticulo ? (
        <div
          className="articulo-controlador-wrp"
          style={edit ? { pointerEvents: "none" } : null}
        >
          <div
            className="articulo-controlador-wrp-btn"
            onClick={removeFunction}
          >
            -
          </div>
          <div style={{ width: "33.4%", textAlign: "center" }}>{cantidad}</div>
          <div
            className="articulo-controlador-wrp-btn"
            onClick={addFunction}
            style={maxCantidad === cantidad ? { pointerEvents: "none" } : null}
          >
            +
          </div>
        </div>
      ) : (
        <>
          {cantidad === 0 ? (
            <Button
              className={`${classes.buttonAdd} articulo-controlador-servicio-wrp`}
              style={edit ? { pointerEvents: "none" } : null}
              onClick={() => {
                addFunction();
              }}
            >
              Agregar Servicio{" "}
              <MdAddShoppingCart
                style={{ marginLeft: "7px", fontSize: "1.1rem" }}
              />
            </Button>
          ) : (
            <Button
              className={`${classes.buttonRemove} articulo-controlador-servicio-wrp`}
              style={edit ? { pointerEvents: "none" } : null}
              onClick={() => {
                removeFunction();
              }}
            >
              Quitar Servicio{" "}
              <MdRemoveShoppingCart
                style={{ marginLeft: "7px", fontSize: "1.1rem" }}
              />
            </Button>
          )}
        </>
      )}
      {description ? (
        <p className="articulo-texto-desc">{description}</p>
      ) : null}
    </div>
  );
}

AgregarArticulo.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  precio: PropTypes.number.isRequired,
  cantidad: PropTypes.number.isRequired,
  maxCantidad: PropTypes.number.isRequired,
  addFunction: PropTypes.func,
  removeFunction: PropTypes.func,
  description: PropTypes.string,
  edit: PropTypes.bool,
  isArticulo: PropTypes.bool,
  precioPorPersona: PropTypes.bool,
  editArticulo: PropTypes.func,
};

AgregarArticulo.defaultProps = {
  addFunction: () => null,
  removeFunction: () => null,
  editArticulo: () => null,
  description: null,
  edit: false,
  isArticulo: false,
  precioPorPersona: false,
};
