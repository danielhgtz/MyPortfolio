import React, { useEffect, useRef, useState } from "react";
// import img1 from "../../../Assets/img/Imagenes_Evento_Iluminacion/Boda_2.webp";
// import img2 from "../../../Assets/img/Imagenes_Evento_Iluminacion/Fiesta_Cumple_2.webp";
// import img3 from "../../../Assets/img/Imagenes_Evento_Iluminacion/Evento_Coorporativo_2.webp";
// import img4 from "../../../Assets/img/Imagenes_Evento_Iluminacion/Fiesta_Infantil_2.webp";
import img1 from "../../../Assets/img/homepage/eventos/boda_planodi.jpg";
import img2 from "../../../Assets/img/homepage/eventos/fiesta_planodi.jpg";
import img3 from "../../../Assets/img/homepage/eventos/corporativo_planodi.jpg";
import img4 from "../../../Assets/img/homepage/eventos/cumpleanos_planodi.jpg";
import { RiArrowRightSLine } from "react-icons/ri";

import "./TipoEventosBlur.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa/index";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export default function TipoEventosBlur() {
  const mobile = useMediaQuery("(max-width:960px)");

  const [totalPages, setTotalPages] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  const navigate = useNavigate();

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

  const getListSize = () => {
    if (ref && ref.current && ref.current.clientWidth) {
      setWidth(ref.current.clientWidth);
    }
  };

  useEffect(() => {
    getListSize();
    window.addEventListener("resize", getListSize);
  }, []);

  const setPagination = () => {
    if (width && width < 920) {
      setTotalPages(5 - Math.floor(width / 230) + 1); // 5 = total amout of cards. 230 = min-width of the cards.
      setCurrentPage(Math.ceil(ref.current.scrollLeft / 230) + 1);
    } else {
      setTotalPages(2);
      setCurrentPage(Math.floor(ref.current.scrollLeft / 230) + 1);
    }
  };

  useEffect(() => {
    setPagination();
  }, [width]);

  return (
    <div className="tipo-eventos-blur-wrp">
      <div className="tipo-ev-blur-wrp-cont">
        {/*<p className="tipo-ev-blur-wrp-title">¿Qué evento estás planeando?</p>*/}
        {/*{!mobile && (*/}
        {/*  <div style={{ display: "inline" }}>*/}
        {/*    <FaAngleLeft*/}
        {/*      className={*/}
        {/*        currentPage === 1*/}
        {/*          ? "carouselV2-control-btn-innactive"*/}
        {/*          : "carouselV2-control-btn"*/}
        {/*      }*/}
        {/*      onClick={() => scroll(-200)}*/}
        {/*    />*/}
        {/*    <FaAngleRight*/}
        {/*      className={*/}
        {/*        currentPage === totalPages*/}
        {/*          ? "carouselV2-control-btn-innactive"*/}
        {/*          : "carouselV2-control-btn"*/}
        {/*      }*/}
        {/*      onClick={() => scroll(200)}*/}
        {/*      style={{ marginLeft: "1rem" }}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*)}*/}
        <div className="tipo-ev-blur-wrp-cont-flex" ref={ref}>
          <div className="tipo-ev-blur-wrp-cont-flex-div">
            <div
              className="tipo-ev-blur-wrp-cont-flex-div2"
              style={{ margin: "0 0.5rem" }}
              onClick={() => {
                navigate.push("/buscador?event=1");
              }}
            >
              <div
                style={{ background: `url(${img2}) #FBECB8` }}
                className="tipo-ev-blur-wrp-cont-flex-div2-img2"
              />
              <p className="tipo-ev-blur-wrp-cont-flex-p">Cumpleaños</p>
            </div>
          </div>
          <div className="tipo-ev-blur-wrp-cont-flex-div">
            <div
              className="tipo-ev-blur-wrp-cont-flex-div2"
              style={{ margin: "0 0.5rem" }}
              onClick={() => {
                navigate.push("/buscador?event=4");
              }}
            >
              <div
                style={{ background: `url(${img1}) #FBDAC9` }}
                className="tipo-ev-blur-wrp-cont-flex-div2-img2"
              />
              <p className="tipo-ev-blur-wrp-cont-flex-p">Boda</p>
            </div>
          </div>
          <div className="tipo-ev-blur-wrp-cont-flex-div">
            <div
              className="tipo-ev-blur-wrp-cont-flex-div2"
              style={{ margin: "0 0.5rem" }}
              onClick={() => {
                navigate.push("/buscador?event=5");
              }}
            >
              <div
                style={{ background: `url(${img3}) #C9DFBF` }}
                className="tipo-ev-blur-wrp-cont-flex-div2-img2"
              />
              <p className="tipo-ev-blur-wrp-cont-flex-p">Corporativo</p>
            </div>
          </div>
          <div className="tipo-ev-blur-wrp-cont-flex-div">
            <div
              className="tipo-ev-blur-wrp-cont-flex-div2"
              style={{ margin: "0 0.5rem" }}
              onClick={() => {
                navigate.push("/buscador?event=3");
              }}
            >
              <div
                style={{ background: `url(${img4}) #D3B9E8` }}
                className="tipo-ev-blur-wrp-cont-flex-div2-img2"
              />
              <p className="tipo-ev-blur-wrp-cont-flex-p">Fiesta Infantil</p>
            </div>
          </div>
          <div className="tipo-ev-blur-wrp-cont-flex-div">
            <div
              className="tipo-ev-blur-wrp-cont-flex-div2 tipo-ev-blur-wrp-cont-flex-explore"
              style={{
                margin: "0 0.5rem",
                height: "100px",
              }}
              onClick={() => {
                navigate.push("/buscador");
              }}
            >
              <p
                className="tipo-ev-blur-wrp-cont-flex-p-vermas"
                id="ver-mas-home"
              >
                Explora catálogo <RiArrowRightSLine />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
