import React, { useEffect, useState } from "react";
import moment from "moment";
import { IoIosArrowDown } from "react-icons/io";
import { VscCheck, VscChromeClose } from "react-icons/vsc/index";
import pantallas from "../../Assets/img/landing_aliados/pantallas.png";
import circuloBlanco from "../../Assets/img/landing_aliados/circulo_blanco.png";
import circuloMorado from "../../Assets/img/landing_aliados/circulo.png";
import laptop from "../../Assets/img/landing_aliados/catalogo_lap.png";
import dots1 from "../../Assets/img/landing_aliados/04.png";
import dots2 from "../../Assets/img/landing_aliados/03.png";
import logo from "../../Assets/img/LogoBlanco.webp";
import logoGris from "../../Assets/img/PLANODI_PNG_gris.webp";

import "./LandingAliados.css";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useNavigate } from "react-router-dom";

const preguntasInit = [
  {
    id: 1,
    pregunta: "¿Son intermediarios?",
    respuesta:
      "Cuando alguien los encuentre en Planodi podrán contactarlos directamente a ustedes por whatsapp, instagram o facebook ya que permitimos que pongan sus redes y no buscamos ser intermediario.",
    open: true,
  },
  {
    id: 2,
    pregunta: "¿Dónde se promocionan?",
    respuesta: "Por el momento sólo en Google Ads",
    open: false,
  },
  {
    id: 3,
    pregunta: "¿De dónde son?",
    respuesta:
      "Estamos comenzando en Jalisco pero la plataforma está abierta para que se registren personas de todo México",
    open: false,
  },
  {
    id: 4,
    pregunta: "¿Cobran alguna comisión?",
    respuesta:
      "Únicamente si deciden crear paquetes dentro de la plataforma. Los paquetes son opcionales y los clientes los pueden contratar y pagar en Planodi, si esto sucede la comisión es de 9% para usuarios premium. La comisión no aplica si te contactan por whatsapp o alguna otra red social.",
    open: false,
  },
];

export default function LandingAliados() {
  const [preguntas, setPreguntas] = useState(preguntasInit);
  const [changeNav, setChangeNav] = useState(false);
  const [offSetY, setOffsetY] = useState(0);
  const navigate = useNavigate();

  const mobile2 = useMediaQuery("(max-width:560px)");

  const handleScroll = () => {
    if (window.pageYOffset >= 20) {
      setChangeNav(true);
    } else {
      setChangeNav(false);
    }
    setOffsetY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.title =
      "Afiliate a Planodi - Información para proveedores y terrazas";
  }, []);

  return (
    <div className="landing-aliados-wrp-all">
      <div className="landing-aliados-wrp">
        <div className={`landing-aliados-navbar ${changeNav ? "active" : ""}`}>
          <img
            src={changeNav ? logoGris : logo}
            alt="logo"
            className={`landing-aliados-logo ${changeNav ? "active" : ""}`}
            onClick={() => {
              navigate("/Planodi", { replace: true });
            }}
          />
          {/*<div className="landing-aliados-boton">Registrar ahora</div>*/}
          <button
            className={`landing-aliados-boton ${changeNav ? "active" : ""}`}
            onPointerMove={(e) => {
              const x = e.pageX - e.target.offsetLeft;
              const y = e.pageY - e.target.offsetTop;

              e.target.style.setProperty("--x", `${x}px`);
              e.target.style.setProperty("--y", `${y}px`);
            }}
            onClick={() => {
              navigate("/Planodi", { replace: true });
            }}
          >
            Registrarme ahora
          </button>
        </div>
        <div className="landing-aliados-img-fondo" />
        <div className="landing-aliados-img-morado" />
        <img
          src={pantallas}
          alt="pantallas planodi"
          className="landing-aliados-pantallas"
        />
        <div className="landing-aliados-texto">
          <h1 className="landing-aliados-h1">
            El mejor catálogo para la creación de eventos en México
          </h1>
          <h2 className="landing-aliados-h2">
            Obtén visibilidad en internet, estamos creando una plataforma
            dirigida a personas que quieren crear todo tipo de eventos:
            cumpleaños, bodas, eventos corporativos, bautizos, fiestas
            infantiles, etc. Salones y proveedores ¡bienvenidos a su nueva casa!
          </h2>
        </div>
        <img
          src={circuloBlanco}
          alt="circulo"
          className="landing-aliados-circulo-b"
        />
        <img
          src={circuloBlanco}
          alt="circulo2"
          className="landing-aliados-circulo-b2"
        />
        <img src={dots1} alt="dots" className="landing-aliados-dots" />
      </div>
      <div className="landing-aliados-como-f-wrp">
        <p className="landing-aliados-como-f-title">¿Cómo funciona?</p>
        <div className="landing-aliados-como-f-title-line" />
        <div className="landing-aliados-como-f-cards-flex">
          <div className="landing-aliados-como-f-cards landing-aliados-como-f-cards1">
            <p>Crea un perfil para tu negocio en Planodi totalmente gratis</p>
            <div className="landing-aliados-como-f-emoji1">💻</div>
          </div>
          <div className="landing-aliados-como-f-cards landing-aliados-como-f-cards2">
            <p>Planodi se encarga de que tu perfil sea visto en internet</p>
            <div className="landing-aliados-como-f-emoji2">🚀</div>
          </div>
          <div className="landing-aliados-como-f-cards landing-aliados-como-f-cards3">
            <p
              style={mobile2 ? { fontSize: "0.95rem" } : { fontSize: "1.1rem" }}
            >
              Espera a ser contactado directamente, te redirigimos los clientes
              a whatsapp, instagram o facebook
            </p>
            <div className="landing-aliados-como-f-emoji3">📲</div>
          </div>
        </div>
      </div>
      <div
        className="landing-aliados-como-f-wrp"
        style={mobile2 ? { marginTop: "1rem" } : { marginTop: "6rem" }}
      >
        <p className="landing-aliados-como-f-title">Preguntas frecuentes</p>
        <div className="landing-aliados-como-f-title-line" />
        <div className="landing-aliados-faq-box">
          {preguntas.map((item) => (
            <div key={item.id}>
              <div
                className="landing-aliados-faq-pre"
                onClick={() => {
                  setPreguntas((prevState) => {
                    return prevState.map((item2) => {
                      if (item2.id === item.id) {
                        return { ...item2, open: !item.open };
                      } else {
                        return item2;
                      }
                    });
                  });
                }}
              >
                <p>{item.pregunta}</p>
                <IoIosArrowDown
                  className={`landing-aliados-faq-pre-icon ${
                    item.open && "open"
                  }`}
                />
              </div>
              <div
                className={`landing-aliados-faq-res ${!item.open && "close"}`}
              >
                <p>{item.respuesta}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="landing-aliados-como-f-wrp"
        style={mobile2 ? { marginTop: "1rem" } : { marginTop: "6rem" }}
      >
        <p className="landing-aliados-como-f-title">Planes y precios</p>
        <p className="landing-aliados-como-f-subtitle">
          Por tiempo limitado: membresía premium gratis de por vida a los
          primeros 150 negocios que se registren en Planodi
        </p>
        <div
          className="landing-aliados-como-f-title-line"
          style={{ marginBottom: 0 }}
        />
        <div className="landing-aliados-pasos-wrp">
          <div className="landing-aliados-planes-box">
            <div className="landing-aliados-planes-card">
              <div className="landing-aliados-plan-free-selection">
                <p className="landing-aliados-plan-title">Plan Gratuito</p>
                <p style={{ margin: 0 }}>Gratis para siempre</p>
              </div>
              <div className="landing-aliados-plan-info-wrp">
                <div className="landing-aliados-plan-info-content">
                  <p>
                    <span>
                      <VscCheck style={{ marginRight: "10px" }} />
                    </span>{" "}
                    Fotos ilimitadas
                  </p>
                  <p>
                    <VscCheck style={{ marginRight: "10px" }} /> Bloqueo de
                    fechas que ya están disponibles
                  </p>
                  <p>
                    <VscCheck style={{ marginRight: "10px" }} /> Paquetes
                    ilimitados
                  </p>
                  <p style={{ color: "#bcbcbc" }}>
                    <span>
                      <VscChromeClose style={{ marginRight: "10px" }} />
                    </span>{" "}
                    Aparece primero en las búsquedas
                  </p>
                  <p style={{ color: "#bcbcbc" }}>
                    <span>
                      <VscChromeClose style={{ marginRight: "10px" }} />
                    </span>{" "}
                    Redirección de clientes a redes sociales o whatsapp
                  </p>
                  <p style={{ color: "#bcbcbc" }}>
                    <span>
                      <VscChromeClose style={{ marginRight: "10px" }} />
                    </span>{" "}
                    Aparece en destacados
                  </p>
                  <p style={{ color: "#bcbcbc" }}>
                    <span>
                      <VscChromeClose style={{ marginRight: "10px" }} />
                    </span>{" "}
                    Opción de verificación de cuenta
                  </p>
                  <p style={{ color: "#bcbcbc" }}>
                    <VscChromeClose style={{ marginRight: "10px" }} />{" "}
                    Posibilidad de publicidad gratis en nuestras redes sociales
                  </p>
                  <p style={{ color: "#bcbcbc" }}>
                    <span>
                      <VscChromeClose style={{ marginRight: "10px" }} />
                    </span>{" "}
                    Por apertura: tu negocio quedará registrado como VIP para
                    siempre. Esto te brindará beneficios únicos en un futuro.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="landing-aliados-planes-box">
            <div className="landing-aliados-planes-card">
              <div className="landing-aliados-plan-plus-selection">
                <p className="landing-aliados-plan-title">Plan Premium</p>
                <p style={{ margin: 0 }}>
                  <span style={{ textDecoration: "line-through" }}>
                    Solo $1799 al año
                  </span>{" "}
                  <span
                    style={{
                      fontWeight: 500,
                      marginLeft: "0.5rem",
                      fontSize: "1.1rem",
                      background: "red",
                      color: "white",
                      padding: "3px",
                      borderRadius: "5px",
                    }}
                  >
                    GRATIS
                  </span>
                </p>
              </div>
              <div className="landing-aliados-plan-info-wrp">
                <div className="landing-aliados-plan-info-content">
                  <p>
                    <span>
                      <VscCheck style={{ marginRight: "10px" }} />
                    </span>{" "}
                    Fotos ilimitadas
                  </p>
                  <p>
                    <VscCheck style={{ marginRight: "10px" }} /> Bloqueo de
                    fechas que ya están disponibles
                  </p>
                  <p>
                    <VscCheck style={{ marginRight: "10px" }} /> Paquetes
                    ilimitados
                  </p>
                  <p>
                    <span>
                      <VscCheck style={{ marginRight: "10px" }} />
                    </span>{" "}
                    Aparece primero en las búsquedas
                  </p>
                  <p>
                    <span>
                      <VscCheck style={{ marginRight: "10px" }} />
                    </span>{" "}
                    Redirección de clientes a redes sociales o whatsapp
                  </p>
                  <p>
                    <span>
                      <VscCheck style={{ marginRight: "10px" }} />
                    </span>{" "}
                    Aparece en destacados
                  </p>
                  <p>
                    <span>
                      <VscCheck style={{ marginRight: "10px" }} />
                    </span>{" "}
                    Opción de verificación de cuenta
                  </p>
                  <p>
                    <VscCheck style={{ marginRight: "10px" }} /> Posibilidad de
                    publicidad gratis en nuestras redes sociales
                  </p>
                  <p>
                    <span>
                      <VscCheck style={{ marginRight: "10px" }} />
                    </span>{" "}
                    Por apertura: tu negocio quedará registrado como VIP para
                    siempre. Esto te brindará beneficios únicos en un futuro.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="landing-aliados-como-f-wrp"
        style={mobile2 ? { marginTop: "1rem" } : { marginTop: "6rem" }}
      >
        <p className="landing-aliados-como-f-title">¿Cómo registrarse?</p>
        <div
          className="landing-aliados-como-f-title-line"
          style={{ marginBottom: 0 }}
        />
        <div className="landing-aliados-pasos-wrp">
          <div className="landing-aliados-pasos-box">
            <img
              src={laptop}
              alt="laptop planodi"
              className="landing-aliados-pasos-box-img"
            />
            <img
              src={circuloMorado}
              alt="circulo morado"
              className="landing-aliados-pasos-box-circulo"
            />
            <img
              src={dots1}
              alt="dots"
              className="landing-aliados-pasos-box-dots1"
              style={{ transform: `translateX(${offSetY * -0.1}px)` }}
            />
            <img
              src={dots2}
              alt="dots2"
              className="landing-aliados-pasos-box-dots2"
              style={{ transform: `translateY(${offSetY * -0.15}px)` }}
            />
          </div>
          <div className="landing-aliados-pasos-box">
            <div className="landing-aliados-pasos-box-content">
              <p className="landing-aliados-pasos-box-title">
                Los pasos para registrarse son muy fáciles y rápidos:
              </p>
              <p>
                <b>Paso 1:</b> ir a{" "}
                <a
                  href="https://planodi.com/registro"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  planodi.com/registro
                </a>{" "}
                y hacer una cuenta
              </p>
              <p>
                <b>Paso 2:</b> ir a "afilia tu negocio gratis"
              </p>
              <p>
                <b>Paso 3:</b> llenar formulario y subir fotos
              </p>
              <p style={{ marginTop: "2rem" }}>
                Y listo, espera a ser contactado por nuevos clientes!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="landing-aliados-como-f-wrp landing-aliados-footer"
        style={{ marginBottom: "0" }}
      >
        <div className="landing-aliados-footer-block" />
        <p className="landing-aliados-footer-p">
          Tienes alguna duda?{" "}
          <a
            href="https://api.whatsapp.com/send?phone=523319764162&text=Hola%20Planodi!%20tengo%20una%20duda."
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white", textDecoration: "underline" }}
          >
            Da click aquí para contactarnos por whatsapp
          </a>
        </p>
        <p className="landing-aliados-footer-p2">
          Copyright © {moment().year()} Planodi. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
