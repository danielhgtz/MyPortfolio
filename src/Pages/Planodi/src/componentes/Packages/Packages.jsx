import "./Packages.css";

import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import PropTypes from "prop-types";

export const StaticKindOfPrice = {
  precioTotal: 4,
  precioPorArticulo: 3,
  precioPorPersona: 1,
  precioPorHora: 2,
};

/**
 * @param {{title: string, price: string, img: string}[]} cardInfo
 * @param  onClickFunction
 * @param  width
 * @param  border
 * */
export default function Packages({
  onClickFunction,
  cardInfo,
  width,
  label,
  border,
  onClickVerMas,
  kindOfPrice,
}) {
  const { name, price, mainImage, id } = cardInfo;
  return (
    <div
      className="packages-wrapper"
      onClick={onClickFunction}
      key={id}
      style={border ? { width, border: "solid #0D3B66 2px" } : { width }}
    >
      <div className="package-div-content">
        <p className="package-div-content-title">{name}</p>
        <div
          className="package-div-content-price-button"
          style={price ? {} : { justifyContent: "flex-end" }}
        >
          {price ? (
            <p className="package-div-content-price">
              {`$${price.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}`}{" "}
              <span style={{ fontSize: "0.7rem" }}>
                {(() => {
                  switch (kindOfPrice) {
                    case StaticKindOfPrice.precioTotal:
                      return "Total";
                    case StaticKindOfPrice.precioPorArticulo:
                      return "Por artículo";
                    case StaticKindOfPrice.precioPorHora:
                      return "Por hora";
                    case StaticKindOfPrice.precioPorPersona:
                      return "Por persona";
                  }
                })()}
              </span>
            </p>
          ) : null}
          <p className="package-div-content-button" onClick={onClickVerMas}>
            {label}
          </p>
        </div>
      </div>
      <img src={mainImage} alt="foto" className="packages-img-bg" />
    </div>
  );
}

Packages.propTypes = {
  width: PropTypes.string,
  label: PropTypes.node,
  cardInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    mainImage: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  border: PropTypes.bool,
  onClickFunction: PropTypes.func.isRequired,
  onClickVerMas: PropTypes.func.isRequired,
  kindOfPrice: PropTypes.number,
};

Packages.defaultProps = {
  width: "300px",
  border: false,
  label: (
    <span>
      VER MÁS <IoIosArrowForward />
    </span>
  ),
  kindOfPrice: StaticKindOfPrice.precioTotal,
};
