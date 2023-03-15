import React, { useEffect, useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { GoVerified } from "react-icons/go/index";
import DotsImages from "./DotsImages";

import "./CardExplore.css";
import { BsDot } from "react-icons/bs/index";
import { useNavigate } from "react-router-dom";

export default function CardExplore({ showFiltros, cardInfo }) {
  const [imagenActual, setImagenActual] = useState(0);
  const [imagenes, setImagenes] = useState(0);
  const mobile = useMediaQuery("(max-width:1200px)");
  const navigate = useNavigate();

  useEffect(() => {
    if (cardInfo.images.length) {
      setImagenes(cardInfo.images.length);
    }
  }, [cardInfo]);

  const nextImage = (direccion) => {
    if (direccion > 0) {
      if (imagenActual === imagenes - 1) {
        setImagenActual(0);
        return;
      }
      setImagenActual(imagenActual + 1);
      return;
    }
    if (imagenActual === 0) {
      setImagenActual(imagenes - 1);
      return;
    }
    return setImagenActual(imagenActual - 1);
  };

  return (
    <div
      className={`card-exp-wrapper ${
        !showFiltros && !mobile ? "double-column-exp" : null
      }`}
      onClick={() => {
        if (mobile) {
          navigate.push(`/negocios/${cardInfo.pathUrl}`);
        } else {
          window.open(
            `${window.location.origin}/negocios/${cardInfo.pathUrl}`,
            "_blank"
          );
        }
      }}
    >
      <div
        className="imagenes-card-exp"
        style={{
          backgroundImage: `url('${
            cardInfo.images.length ? cardInfo.images[imagenActual].url : null
          }')`,
        }}
      >
        <div className="imgs-card-exp-hoverDiv">
          <FaAngleLeft
            className="imgs-card-exp-izq"
            onClick={(e) => {
              e.stopPropagation();
              nextImage(-1);
            }}
          />
          <FaAngleRight
            className="imgs-card-exp-der"
            onClick={(e) => {
              e.stopPropagation();
              nextImage(1);
            }}
          />
        </div>
        <DotsImages
          numDots={imagenes > 5 ? Array(5).fill(0) : Array(imagenes).fill(0)}
          imagenActual={imagenActual}
        />
      </div>
      <div className="info-wrp-card-exp">
        <div className="card-exp-titulo-wrp">
          {cardInfo?.logoUrl ? (
            <div
              className="card-exp-logo"
              style={{ background: `url(${cardInfo.logoUrl})` }}
            />
          ) : null}
          <p className="card-exp-titulo">{cardInfo.nombre}</p>
          {cardInfo.verificado ? (
            <GoVerified
              style={{
                color: "#8c50ff",
                width: "100px",
                fontSize: "1.3rem",
              }}
            />
          ) : null}
        </div>
        {/*<p className="card-exp-descripcion">*/}
        {/*  {cardInfo.description.length >= 40*/}
        {/*    ? `${cardInfo.description.substring(0, 40)}...`*/}
        {/*    : cardInfo.description}*/}
        {/*</p>*/}
        <p className="card-exp-content">
          {cardInfo.estado}
          {cardInfo.ciudad ? (
            <>
              <BsDot />
              {cardInfo.ciudad}
            </>
          ) : null}
          <BsDot /> {cardInfo.category} <BsDot />{" "}
          {cardInfo.precio ? cardInfo.precio : "$$$"}
        </p>
        <p className="card-exp-content-2">{cardInfo.description}</p>
        <div
          className={
            !showFiltros && !mobile
              ? "wrp-card-exp-estrellas-precio-double-column"
              : "wrp-card-exp-estrellas-precio"
          }
        >
          <p
            className={
              !showFiltros && !mobile
                ? "card-exp-resena-estrella-double-column"
                : "card-exp-resena-estrella"
            }
          >
            <span>
              <AiFillStar style={{ marginTop: "-3px", color: "#8c50ff" }} />
            </span>{" "}
            {cardInfo.avarageScore.toFixed(1)}{" "}
            <span className="card-exp-reviews">
              ({cardInfo.totalReviews} reseñas)
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
