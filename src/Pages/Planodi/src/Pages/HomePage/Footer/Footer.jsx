import React from "react";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import LogoNegro from "../../../Assets/img/homepage/logoFooterNegro.webp";
import LogoBlanco from "../../../Assets/img/homepage/logoFooterBlanco.webp";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Footer.css";
import ModalRegistro from "../Navbar/ModalRegistro/ModalRegistro";
import ModalLogin from "../Navbar/ModalLogin/ModalLogin";
import { useAuthModals } from "../Navbar/Navbar";
import { AiFillInstagram } from "react-icons/ai/index";

export default function Footer({ color, offSetY }) {
  const mobile = useMediaQuery("(max-width:960px)");
  const stateUser = useSelector((state) => state.user);
  const navigate = useNavigate();
  const {
    openRegistroModal,
    openLoginModal,
    setOpenRegistroModal,
    setOpenLoginModal,
  } = useAuthModals();

  const handleAfiliarmeButton = () => {
    if (stateUser.isAuthenticated) {
      if (stateUser.userInfo?.isVerified) {
        navigate.push("/afiliarme");
      } else {
        toast.dismiss();
        toast.warn(
          "Parece que no has verificado tu cuenta! Por favor revisa tu email, pudo haber llegado a la bandeja de spam.",
          {
            position: "bottom-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    } else {
      setOpenRegistroModal(true);
    }
  };

  const navigateToBuscador = () => {
    navigate("/Planodi/buscador");
  };

  return (
    <div
      className={
        color && !mobile ? "footer-background-color" : "footer-background-solid"
      }
    >
      <ModalRegistro
        handleClose={() => setOpenRegistroModal(false)}
        open={openRegistroModal}
        titleModal={"Paso 1: Primero tienes que registrarte"}
        afterRegister={() => {
          navigate.push("/afiliarme");
        }}
        openLogin={() => setOpenLoginModal(true)}
      />
      <ModalLogin
        handleClose={() => {
          setOpenLoginModal(false);
        }}
        open={openLoginModal}
        openRegister={() => setOpenRegistroModal(true)}
        afterLogin={() => {
          navigate.push("/afiliarme");
        }}
      />
      <div style={{ margin: "2rem 6% 0 6%" }}>
        <h3
          style={{ fontSize: "1.1rem", color: "#3b3b3b", marginBottom: "1rem" }}
        >
          Categorías
        </h3>
        <a onClick={navigateToBuscador} className="footer-categories-a">
          Servicios de comida/ Banquetes
        </a>
        <a onClick={navigateToBuscador} className="footer-categories-a">
          Servicios de bebidas
        </a>
        <a onClick={navigateToBuscador} className="footer-categories-a">
          Salones de eventos/ Terrazas
        </a>
        <a onClick={navigateToBuscador} className="footer-categories-a">
          Música en vivo/ Dj
        </a>
        <a onClick={navigateToBuscador} className="footer-categories-a">
          Fotografía/ Video de eventos
        </a>
        <a onClick={navigateToBuscador} className="footer-categories-a">
          Renta de mobiliario
        </a>
        <a onClick={navigateToBuscador} className="footer-categories-a">
          Animación/ Renta de juegos para eventos
        </a>
        <a onClick={navigateToBuscador} className="footer-categories-a">
          Decoración para eventos
        </a>
        <a onClick={navigateToBuscador} className="footer-categories-a">
          Organizadores de eventos
        </a>
        <a onClick={navigateToBuscador} className="footer-categories-a">
          Meseros para eventos
        </a>
        <a onClick={navigateToBuscador} className="footer-categories-a">
          Invitaciones/ recuerdos de eventos
        </a>
        <a onClick={navigateToBuscador} className="footer-categories-a">
          Mesas de dulces/ Candy Bar
        </a>
        <a onClick={navigateToBuscador} className="footer-categories-a">
          Pasteles y postres
        </a>
        <a onClick={navigateToBuscador} className="footer-categories-a">
          Piñatas y dulces
        </a>
        <a onClick={navigateToBuscador} className="footer-categories-a">
          Maquillaje y peinado
        </a>
      </div>
      <div style={{ margin: "2rem 6% 0 6%" }}>
        <h3
          style={{ fontSize: "1.1rem", color: "#3b3b3b", marginBottom: "1rem" }}
        >
          Eventos
        </h3>
        <a onClick={navigateToBuscador} className="footer-categories-a">
          Cumpleaños
        </a>
        <a onClick={navigateToBuscador} className="footer-categories-a">
          Fiesta infantil
        </a>
        <a onClick={navigateToBuscador} className="footer-categories-a">
          Boda
        </a>
        <a onClick={navigateToBuscador} className="footer-categories-a">
          XV años
        </a>
        <a onClick={navigateToBuscador} className="footer-categories-a">
          Corporativo
        </a>
        <a onClick={navigateToBuscador} className="footer-categories-a">
          Pool party
        </a>
        <a onClick={navigateToBuscador} className="footer-categories-a">
          Baby shower / Gender reveal
        </a>
        <a onClick={navigateToBuscador} className="footer-categories-a">
          Roof top party
        </a>
        <a onClick={navigateToBuscador} className="footer-categories-a">
          Bautizo / Primera comunión
        </a>
      </div>
      <div
        style={{
          position: "relative",
          padding: "0 6% 0 6%",
        }}
      >
        <Grid container style={{ marginTop: "2rem" }}>
          <Grid item xs={12} md={4}>
            <p
              className="footer-titulo"
              style={
                color && !mobile
                  ? { color: "white", width: "100%" }
                  : { width: "100%" }
              }
            >
              Información
            </p>
            <p
              onClick={() => {
                navigate("/Planodi/informacion", { replace: true });
              }}
              style={{ cursor: "pointer" }}
            >
              <a
                className="footer-link"
                style={color && !mobile ? { color: "white" } : null}
              >
                Información para negocios
              </a>
            </p>
            <p onClick={handleAfiliarmeButton} style={{ cursor: "pointer" }}>
              <a
                className="footer-link"
                style={color && !mobile ? { color: "white" } : null}
              >
                Promociónate con nosotros
              </a>
            </p>
            <p>
              <a
                href="https://api.whatsapp.com/send?phone=5213335038387&amp;text=Hola%20Planodi!"
                className="footer-link"
                style={color && !mobile ? { color: "white" } : null}
              >
                Contáctanos
              </a>
            </p>
            {/*<p>*/}
            {/*  <a*/}
            {/*    href="/#"*/}
            {/*    className="footer-link"*/}
            {/*    style={color && !mobile ? { color: "white" } : null}*/}
            {/*  >*/}
            {/*    ¿Quiénes somos?*/}
            {/*  </a>*/}
            {/*</p>*/}
            <p>
              <a
                href="https://drive.google.com/file/d/1A-FcsprQDFsZqgtdS5IuoaiyZb_GGqvl/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                style={color && !mobile ? { color: "white" } : null}
              >
                Políticas de privacidad
              </a>
            </p>
            <p>
              <a
                href="https://drive.google.com/file/d/19B09yY0yezQw9-bDd6yxKE5gVyW-R9Y1/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                style={color && !mobile ? { color: "white" } : null}
              >
                Condiciones legales
              </a>
            </p>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            className="footer-logo-wrp"
            style={color && !mobile ? { height: "400px" } : null}
          >
            <img
              src={color && !mobile ? LogoBlanco : LogoNegro}
              alt="Logo Planodi"
              className="footer-logo"
              style={
                color && !mobile
                  ? {
                      transform: `translateY(${offSetY * -0.1}px)`,
                      margin: "15rem 1rem 1rem 1rem",
                    }
                  : { margin: "5rem" }
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <p
              className="footer-titulo footer-titulo-right"
              style={
                color && !mobile
                  ? { color: "white", width: "100%" }
                  : { width: "100%" }
              }
            >
              Síguenos en
            </p>
            <p style={{ textAlign: "right" }}>
              <AiFillInstagram
                className="footer-redes-s-wrp-icon"
                onClick={() => {
                  window.open("https://www.instagram.com/planodimx/", "_blank");
                }}
              />
            </p>
            <p
              className="footer-titulo footer-titulo-right"
              style={
                color && !mobile
                  ? { color: "white", width: "100%", marginTop: "3rem" }
                  : { width: "100%", marginTop: "3rem" }
              }
            >
              Contáctanos por email
            </p>
            <p style={{ textAlign: "right" }}>
              <a
                href="mailto: planodi.social@gmail.com"
                className="footer-link footer-link-right"
                style={color && !mobile ? { color: "white" } : null}
              >
                hola@planodi.com
              </a>
            </p>
          </Grid>
        </Grid>
      </div>
      <div style={{ margin: "1rem 6% 0 6%", paddingBottom: "1rem" }}>
        <hr />
        <p style={{ color: "#3b3b3b", fontSize: "0.75rem" }}>
          Copyright © {moment().year()} Planodi. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
