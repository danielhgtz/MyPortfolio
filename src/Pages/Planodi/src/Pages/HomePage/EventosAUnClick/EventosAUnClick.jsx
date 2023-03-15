import React, { useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa/index";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { FaUser } from "react-icons/fa";

import "./EventosAUnClick.css";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ModalEventosAUnClick from "./ModalEventosAUnClick";
import { eventosAUnClickStatic } from "./staticsEventos";

const useStyles = makeStyles(() => ({
  buttonVerMas: {
    borderRadius: "5px",
    width: "100%",
    color: "white",
    backgroundColor: "rgb(13,59,102)",
    outline: "none",
    "&:hover": {
      backgroundColor: "rgba(13,59,102,0.95)",
      opacity: 0.9,
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

export default function EventosAUnClick({ setOpenLoginModal }) {
  const mobile = useMediaQuery("(max-width:960px)");
  const classes = useStyles();
  const ref = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [eventoActive, setEventoActive] = useState(eventosAUnClickStatic[0]);

  const scroll = (scrollOffset) => {
    if (ref && ref.current) {
      ref.current.scrollLeft += scrollOffset;
    }
    if (scrollOffset > 0) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleOpenModal = (id) => {
    setEventoActive(eventosAUnClickStatic.filter((item) => item.id === id)[0]);
    setShowPackageModal(true);
  };

  return (
    <div className="wrapper-even-a-un-click" id="eventos-a-un-click">
      <ModalEventosAUnClick
        handleClose={() => setShowPackageModal(false)}
        open={showPackageModal}
        precioInicial={eventoActive.precio}
        personas={eventoActive.personas}
        nombre={eventoActive.nombre}
        setOpenLoginModal={setOpenLoginModal}
        allImages={eventoActive.allImages}
      />
      <div className="div1-title-container-even-a-un-click">
        <p className="div1-title-even-a-un-click">
          Tu evento <br />
          <span style={{ color: "#8c50ff" }}>a un click</span> de distancia
        </p>
        <p className="div1-text-select-even-a-un-click">Buscando en</p>
        <div className="select-wrapper-even-a-un-click">
          <select className="select-even-a-un-click">
            <option value="value1">Guadalajara</option>
            <option value="value1" disabled>
              Proximamente eventos a un click en más ciudades
            </option>
          </select>
        </div>
      </div>
      <div className="div2-cards-container-even-a-un-click">
        {!mobile && (
          <div className="div2-cards-control-even-a-un-click">
            <FaAngleLeft
              className={
                currentPage === 1
                  ? "carouselV2-control-btn-innactive"
                  : "carouselV2-control-btn"
              }
              onClick={() => scroll(-200)}
            />
            <FaAngleRight
              className={
                currentPage === totalPages
                  ? "carouselV2-control-btn-innactive"
                  : "carouselV2-control-btn"
              }
              onClick={() => scroll(200)}
              style={{ marginLeft: "1rem" }}
            />
          </div>
        )}
        <div className="div2-cards-flex-even-a-un-click" ref={ref}>
          {eventosAUnClickStatic.map((item) => (
            <div
              className="div2-card-even-a-un-click"
              style={
                item.id === 0
                  ? mobile
                    ? { marginRight: "2.7rem" }
                    : { marginRight: "6rem" }
                  : null
              }
              key={item.id}
              onClick={() => handleOpenModal(item.id)}
            >
              <div className="div2-card-content-wrp-even-a-un-click">
                <img
                  src={item.img}
                  alt={item.alt}
                  className="div2-card-img-even-a-un-click"
                />
                <div className="div2-card-info-grid-even-a-un-click">
                  <div className="card-grid1-even-a-un-click">
                    <p>
                      {item.nombre}{" "}
                      <span style={{ color: "#f84f0a" }}>gratis</span>
                    </p>
                  </div>
                  <div className="card-grid2-even-a-un-click">
                    <p>
                      ${" "}
                      {item.precio.toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}{" "}
                      MXN
                    </p>
                    <p>
                      <FaUser style={{ margin: "0 5px 4px 0" }} />
                      {item.personas} personas
                    </p>
                  </div>
                  <div className="card-grid3-even-a-un-click">
                    <Button
                      className={classes.buttonVerMas}
                      onClick={() => handleOpenModal(item.id)}
                    >
                      Ver más
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
