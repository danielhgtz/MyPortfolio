import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import "./ModalFiltros.css";
import { ThemeProvider } from "@material-ui/styles";
import Slider from "@material-ui/core/Slider";
import { arrayToStringMoney } from "../../../../Utils/MoneyFunctions";
import { createTheme } from "@material-ui/core/styles";
import DotLoading from "../../../../componentes/DotLoading/DotLoading";

const muiTheme = createTheme({
  overrides: {
    MuiSlider: {
      thumb: {
        // color: "#8c50ff",
        color: "#3b3b3b",
      },
      track: {
        // color: "#8c50ff",
        color: "#3b3b3b",
      },
      rail: {
        // color: "#8c50ff",
        color: "#3b3b3b",
      },
    },
  },
});

export default function ModalFiltros({
  loading,
  active,
  setOpenModal,
  precio,
  maxPrecio,
  handleChangePrecioSlider,
  nuevoFiltroPrecio,
  filtroCategorias,
  agregarOQuitarFiltro,
  setFiltroCategorias,
  filtroTipoEventos,
  setFiltroTipoEventos,
}) {
  return (
    <div
      className={
        active ? "modal-filtros-exp-wrp active" : "modal-filtros-exp-wrp"
      }
    >
      <div className="modal-filtros-exp-flex">
        <div className="modal-filtros-exp-flex-close">
          <p>Filtros</p>
          <IoIosClose
            className="modal-filtros-exp-flex-close-btn"
            onClick={() => setOpenModal(false)}
          />
        </div>
        <div className="modal-filtros-exp-flex-filtros">
          <div className="seleccionador-de-filtro-mobile">
            <p>Tipos de eventos</p>
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

          <hr style={{ margin: "0 5%" }} />

          <div className="seleccionador-de-filtro-mobile">
            <p>Categorías</p>
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
        </div>
        <div className="modal-filtros-exp-flex-results">
          <div
            className="modal-filtros-exp-flex-results-btn"
            onClick={() => setOpenModal(false)}
          >
            Ver resultados
          </div>
        </div>
      </div>
    </div>
  );
}
