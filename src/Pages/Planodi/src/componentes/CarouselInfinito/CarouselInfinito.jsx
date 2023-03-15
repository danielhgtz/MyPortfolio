import React, { useState } from "react";
import "./CarouselInfinito.css";
import PropTypes from "prop-types";
import CardGeneral from "../CardGeneral/CardGeneral";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import useWindowDimensions from "../Hooks/Dimensions";

export default function CarouselInfinito({ infoCards }) {
  const { width } = useWindowDimensions();
  const cardWidth = 270;
  const numeroDeCardsPantalla = Math.floor(width / cardWidth);
  const widthCarousel = infoCards.length * cardWidth;
  const numeroPantallas = Math.ceil(
    widthCarousel / (numeroDeCardsPantalla * cardWidth)
  );
  const deltaX = (widthCarousel - width) / (numeroPantallas - 1);
  const [x, setX] = useState(0);
  const [pantallaActiva, setPantallaActiva] = useState(1);
  const goLeft = () => {
    setPantallaActiva(pantallaActiva - 1);
    setX(x + deltaX);
  };
  const goRight = () => {
    setPantallaActiva(pantallaActiva + 1);
    setX(x - deltaX);
  };
  const clickDot = (numDot) => {
    setPantallaActiva(numDot + 1);
    setX(-deltaX * numDot);
  };

  return (
    <div>
      <div className="wrapper-carousel">
        <div
          className="seccion-carousel"
          id="section1"
          style={{
            width: `${widthCarousel}px`,
            transform: `translateX(${x}px)`,
          }}
        >
          {infoCards.map((item, idx) => {
            return (
              <div className="item" key={idx}>
                <CardGeneral info={item} />
              </div>
            );
          })}
        </div>
        {x === 0 ? null : (
          <div className="slider-flechas slider-goLeft" onClick={goLeft}>
            &#10094;
          </div>
        )}
        {x === deltaX * -(numeroPantallas - 1) ? null : (
          <div className="slider-flechas slider-goRight" onClick={goRight}>
            &#10095;
          </div>
        )}
      </div>
      <div className="slider-dots">
        <div className="slider-dots-box">
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: `${numeroPantallas * 1.25}rem`,
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              {[...Array(numeroPantallas)].map((x, i) => (
                <FiberManualRecordIcon
                  className={`${
                    i + 1 === pantallaActiva ? "active" : ""
                  } slider-dot`}
                  onClick={() => clickDot(i)}
                  key={i}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

CarouselInfinito.propTypes = {
  infoCards: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
};
