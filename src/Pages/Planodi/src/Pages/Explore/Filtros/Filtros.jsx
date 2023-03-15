import React, { useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import FilterListIcon from "@material-ui/icons/FilterList";
import CloseIcon from "@material-ui/icons/Close";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import "./Filtros.css";
import Slider from "@material-ui/core/Slider";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { arrayToStringMoney } from "../../../Utils/MoneyFunctions";
import DotLoading from "../../../componentes/DotLoading/DotLoading";

const muiTheme = createMuiTheme({
  overrides: {
    MuiSlider: {
      thumb: {
        color: "#8c50ff",
        // color: "#3b3b3b",
      },
      track: {
        color: "#8c50ff",
        // color: "#3b3b3b",
      },
      rail: {
        color: "#8c50ff",
        // color: "#3b3b3b",
      },
    },
  },
});

export default function Filtros({
  loading,
  filtrosActivos,
  setOpenModal,
  precio,
  maxPrecio,
  handleChangePrecioSlider,
  nuevoFiltroPrecio,
  agregarOQuitarFiltro,
  updateStateOnDelete,
  filtroCategorias,
  filtroTipoEventos,
  setFiltroTipoEventos,
  setFiltroCategorias,
}) {
  const movil = useMediaQuery("(max-width:960px)");
  const [filtroPrecio, setFiltroPrecio] = useState(false);
  const [filtroCategoria, setFiltroCategoria] = useState(false);
  const [filtroTipoEvento, setFiltroTipoEvento] = useState(true);

  return (
    <>
      {movil ? (
        <div className="filtros-wrapper">
          <div className="filtro-button" onClick={() => setOpenModal(true)}>
            <p>
              <span>
                <FilterListIcon
                  style={{
                    fontSize: "1rem",
                    marginBottom: "1px",
                    marginRight: "5px",
                  }}
                />
              </span>
              Abrir filtros
            </p>
          </div>
          <div className="wrapper-filtros-dissapear">
            <div className="filtro-activos-wrp">
              {filtrosActivos.map((item) => (
                <div
                  className="filtro-activo-box"
                  onClick={() => {
                    agregarOQuitarFiltro(false, item);
                    updateStateOnDelete(item);
                  }}
                >
                  <p>{item.name}</p>
                  <CloseIcon
                    style={{
                      fontSize: "1.2rem",
                      cursor: "pointer",
                      display: "inline",
                      marginLeft: "0.3rem",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="filtros-section-wrapper">
          <div
            className="filtros-section-filtroBox-wrp"
            onClick={() => {
              setFiltroCategoria(!filtroCategoria);
              setFiltroPrecio(false);
              setFiltroTipoEvento(false);
            }}
          >
            <p style={{ margin: "0" }}>Categorías</p>
            <ArrowBackIosIcon
              style={{ margin: "0", color: "#8c50ff" }}
              className={`${
                filtroCategoria ? "active" : "inactive"
              } filtros-section-filtroBox-cerrado`}
            />
          </div>
          <div
            className={`${
              filtroCategoria ? null : "innactive"
            } seleccionador-de-filtro`}
          >
            <div className="seleccionador-de-filtro-categoria">
              {loading ? (
                <DotLoading />
              ) : (
                filtroCategorias.map((item, idx) => (
                  <div
                    className={`${
                      item.status ? "active" : null
                    } seleccionador-filtro-box`}
                    onClick={() => {
                      let newStateCategorias = filtroCategorias;
                      newStateCategorias[idx].status = !item.status;
                      setFiltroCategorias(newStateCategorias);
                      agregarOQuitarFiltro(item.status, item);
                    }}
                    key={item.id}
                  >
                    <p>{item.name}</p>
                  </div>
                ))
              )}
            </div>
          </div>
          <hr style={{ margin: "0" }} />

          <div
            className="filtros-section-filtroBox-wrp"
            onClick={() => {
              setFiltroTipoEvento(!filtroTipoEvento);
              setFiltroCategoria(false);
              setFiltroPrecio(false);
            }}
          >
            <p style={{ margin: "0" }}>Tipos de eventos</p>
            <ArrowBackIosIcon
              style={{ margin: "0", color: "#8c50ff" }}
              className={`${
                filtroTipoEvento ? "active" : "inactive"
              } filtros-section-filtroBox-cerrado`}
            />
          </div>
          <div
            className={`${
              filtroTipoEvento ? null : "innactive"
            } seleccionador-de-filtro`}
            style={{ overflow: "auto" }}
          >
            <div className="seleccionador-de-filtro-categoria">
              {loading ? (
                <DotLoading />
              ) : (
                filtroTipoEventos.map((item, idx) => (
                  <div
                    className={`${
                      item.status ? "active" : null
                    } seleccionador-filtro-box`}
                    onClick={() => {
                      let newStateTipoEventos = filtroTipoEventos;
                      newStateTipoEventos[idx].status = !item.status;
                      setFiltroTipoEventos(newStateTipoEventos);
                      agregarOQuitarFiltro(item.status, item);
                    }}
                    key={item.id}
                  >
                    <p>{item.name}</p>
                  </div>
                ))
              )}
            </div>
          </div>
          <hr style={{ margin: "0" }} />
        </div>
      )}
    </>
  );
}
