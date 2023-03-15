import React, { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa/index";

import Packages from "../Packages/Packages";
import "./CarouselV2.css";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CardGeneral from "../CardGeneral/CardGeneral";
import PropTypes from "prop-types";
import DotLoading from "../DotLoading/DotLoading";
import { IoIosAddCircleOutline } from "react-icons/io/index";
import { useNavigate } from "react-router-dom";

/*
 * Constant ditance between cards in this carousel
 * */
const distanceBetweenCards = 10;

/**
 * @param {{title: string, price: string, mainImg: string, id: number}[] || {nombre: string, precio: string, descripcion: string, pathUrl: string}[]} infoCards
 * @param  setActivePackage - function
 * @param  onClickPackage - function
 * @param  activePackage - number
 * @param  widthCard - number
 * @param  cardPackages - bool
 * @param  blurLastOne - bool
 * @param  loading - bool
 * @param  totalResults - bool
 * @param  pagiantionAtEnd - bool
 * @param  title - string
 * */

export default function CarouselV2({
  infoCards,
  setActivePackage,
  activePackage,
  widthCard,
  cardPackages,
  blurLastOne,
  loading,
  title,
  totalResults,
  pagiantionAtEnd,
  onClickPackage,
  verMasButton,
}) {
  const navigate = useNavigate();
  const [width, setWidth] = useState(1000);
  const [widthBlur, setWidthBlur] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const mobile = useMediaQuery("(max-width:960px)");
  const ref = useRef(null);
  const widthCrouselContent = cardPackages
    ? (widthCard + distanceBetweenCards * 2) * infoCards.length -
      distanceBetweenCards * 2
    : (widthCard + distanceBetweenCards * 2) * (infoCards.length + 1) -
      distanceBetweenCards * 2;
  const firstAndLasrCard = widthCard + distanceBetweenCards;
  const middleCards = widthCard + distanceBetweenCards * 2;

  const getListSize = () => {
    if (ref && ref.current && ref.current.clientWidth) {
      setWidth(ref.current.clientWidth);
    }
  };

  useEffect(() => {
    window.addEventListener("load", getListSize);
    window.addEventListener("resize", getListSize);
    return () => {
      window.removeEventListener("load", getListSize);
      window.removeEventListener("resize", getListSize);
    };
  }, []);

  useEffect(() => {
    getListSize();
  }, [loading, infoCards]);

  useEffect(() => {
    setTranslateX(0);
    setCurrentPage(1);
    //    Calcular número de cards por páginas
    //    Calcular número de páginas
    const newCardsPerPage = Math.floor(width / firstAndLasrCard);
    setCardsPerPage(newCardsPerPage);
    setTotalPages(Math.ceil(infoCards.length / newCardsPerPage));
    // se define ancho de blur
    if (width - middleCards * newCardsPerPage > 0) {
      setWidthBlur(width - middleCards * newCardsPerPage);
    } else {
      setWidthBlur(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, infoCards]);

  const onClickRight = () => {
    //    Se define desplazamiento en X a la izquierda
    setCurrentPage(currentPage + 1);
    setTranslateX(middleCards * cardsPerPage * -1 + translateX);
  };

  const onClickLeft = () => {
    //    Se define desplazamiento en X a la izquierda
    setCurrentPage(currentPage - 1);
    setTranslateX(middleCards * cardsPerPage + translateX);
  };

  return (
    <>
      <div
        className="carouselV2-title-wrp"
        style={
          pagiantionAtEnd
            ? { justifyContent: "space-between" }
            : { justifyContent: "flex-start" }
        }
      >
        <p className="carouselV2-title">
          {title}{" "}
          {mobile || !totalResults ? null : (
            <span style={{ fontSize: "1rem", color: "#6e6e6e" }}>
              ({infoCards.length})
            </span>
          )}
        </p>
        {!mobile && (
          <div className="carouselV2-control-wrp">
            <div>
              <FaAngleLeft
                className={
                  currentPage === 1
                    ? "carouselV2-control-btn-innactive"
                    : "carouselV2-control-btn"
                }
                onClick={onClickLeft}
              />
              <p className="carouselV2-control-pagination">
                {currentPage} / {totalPages}
              </p>
              <FaAngleRight
                className={
                  currentPage === totalPages
                    ? "carouselV2-control-btn-innactive"
                    : "carouselV2-control-btn"
                }
                onClick={onClickRight}
              />
            </div>
          </div>
        )}
      </div>
      <div className="carouselV2-wrp" ref={ref}>
        {loading ? (
          <DotLoading style={{ marginLeft: "-1rem" }} />
        ) : (
          <>
            {blurLastOne && !mobile ? (
              <div
                className="carouselV2-content-blur"
                style={{
                  width: `${widthBlur}px`,
                }}
              />
            ) : null}
            <div
              className="carouselV2-content"
              style={
                blurLastOne
                  ? {
                      width: `${widthCrouselContent}px`,
                      transform: `translateX(${translateX}px)`,
                      marginBottom: "1rem",
                    }
                  : {
                      width: `${widthCrouselContent}px`,
                      transform: `translateX(${translateX}px)`,
                      marginBottom: "1rem",
                      transition: "0.3s",
                    }
              }
            >
              {infoCards.map((item) => (
                <div
                  key={item.id}
                  className={
                    activePackage === item.id
                      ? "carouselV2-content-active-element"
                      : null
                  }
                >
                  {cardPackages ? (
                    <Packages
                      onClickFunction={() => {
                        onClickPackage(item.id);
                      }}
                      cardInfo={item}
                      width={`${widthCard}px`}
                      onClickVerMas={() => {
                        onClickPackage(item.id);
                      }}
                      kindOfPrice={item.kindOfPrice}
                    />
                  ) : (
                    <CardGeneral info={item} width={`${widthCard}px`} />
                  )}
                </div>
              ))}
              {verMasButton && (
                <div
                  className="carouselV2-ver-mas-btn"
                  onClick={() => {
                    navigate.push("/buscador");
                  }}
                >
                  <IoIosAddCircleOutline
                    style={{
                      fontSize: "4rem",
                      color: "rgba(59,59,59,0.8)",
                      marginTop: "0.1rem",
                    }}
                    id="ver-mas-home"
                  />
                  <p>VER MÁS</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

CarouselV2.propTypes = {
  infoCards: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        mainImage: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      }),
      PropTypes.shape({
        category: PropTypes.string,
        description: PropTypes.string,
        estado: PropTypes.string,
        id: PropTypes.number,
        images: PropTypes.arrayOf(
          PropTypes.shape({
            aliado: PropTypes.number,
            id: PropTypes.number,
            imagen: PropTypes.number,
            isActive: PropTypes.number,
            main: PropTypes.number,
            url: PropTypes.string,
          })
        ),
        minPrice: PropTypes.number,
        nombre: PropTypes.string,
        pathUrl: PropTypes.string,
        verificado: PropTypes.number,
      }),
    ])
  ).isRequired,
  cardPackages: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  blurLastOne: PropTypes.bool,
  totalResults: PropTypes.bool,
  pagiantionAtEnd: PropTypes.bool,
  activePackage: PropTypes.number,
  widthCard: PropTypes.number.isRequired,
  setActivePackage: PropTypes.func,
  onClickPackage: PropTypes.func,
};

CarouselV2.defaultProps = {
  activePackage: 1,
  setActivePackage: () => {},
  onClickPackage: () => {},
  blurLastOne: false,
  totalResults: true,
  pagiantionAtEnd: false,
};
