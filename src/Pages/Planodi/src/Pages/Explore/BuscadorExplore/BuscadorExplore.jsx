import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import "./BuscadorExplore.css";
import FilterListIcon from "@material-ui/icons/FilterList";
import CloseIcon from "@material-ui/icons/Close";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export default function BuscadorExplore({
  filtrosActivos,
  showFiltros,
  setShowFiltros,
  filterType,
  agregarOQuitarFiltro,
  updateStateOnDelete,
  setShowLocationSelect,
  showLocationSelect,
  estadoFilter,
  municipiosFilter,
}) {
  const movil = useMediaQuery("(max-width:960px)");
  const [input, setInput] = useState("");
  return (
    <div className="buscador-explore-wrapper">
      <div className="buscador-explore-input-1">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input !== "") {
              agregarOQuitarFiltro(true, {
                name: input,
                type: filterType.other,
              });
              setInput("");
            }
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <input
            type="text"
            name="filtro-exp"
            autoComplete="off"
            placeholder="Buscar por nombre, categoría, servicio, lugar, etc."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="filtro-exp-icon">
            <SearchIcon style={{ color: "#3b3b3b", fontSize: "2rem" }} />
          </button>
        </form>
      </div>

      <div className="buscador-explore-input-2">
        <p
          className="buscador-explore-input-2-p"
          style={showLocationSelect ? { pointerEvents: "none" } : null}
          onClick={() => setShowLocationSelect(true)}
        >
          <span>
            <LocationOnIcon />
          </span>{" "}
          {estadoFilter !== "" && municipiosFilter !== []
            ? `${estadoFilter}${
                municipiosFilter !== "" ? ` - ${municipiosFilter}` : ""
              }`
            : "Agregar ubicación"}
        </p>
      </div>

      {movil ? null : (
        <div className="filtros-wrapper">
          <div
            className="filtro-button"
            onClick={() => setShowFiltros(!showFiltros)}
          >
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
              {showFiltros ? "Cerrar filtros" : "Mostrar filtros"}
            </p>
          </div>
          <div className="wrapper-filtros-dissapear">
            <div className="filtro-activos-wrp">
              {filtrosActivos.map((item, idx) => (
                <div
                  className="filtro-activo-box"
                  onClick={() => {
                    agregarOQuitarFiltro(false, item);
                    updateStateOnDelete(item);
                  }}
                  key={idx}
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
      )}
    </div>
  );
}
