import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./Navbar.css";
import ModalRegistro from "./ModalRegistro/ModalRegistro";
import ModalLogin from "./ModalLogin/ModalLogin";
import { useDispatch, useSelector } from "react-redux";
import {
  userAuthError,
  userGetUserSuccess,
  userLogoutSuccess,
} from "../../../actions/userActions";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import { userHeaders } from "../../../Utils/headerSetter";
import logo from "../../../Assets/img/LogoBlanco.webp";
import logoMorado from "../../../Assets/img/Logo.webp";
import logoGris from "../../../Assets/img/PLANODI_PNG_gris.webp";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

export function useAuthModals() {
  const [openRegistroModal, setOpenRegistroModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  return {
    openRegistroModal,
    openLoginModal,
    setOpenRegistroModal,
    setOpenLoginModal,
  };
}

/**
 * @param type: "purple" || "black" || "white"
 * @param fix: bool
 */
export default function Navbar({ shadow, type, fix }) {
  const location = useLocation();
  const pathName = location.pathname;
  const {
    openRegistroModal,
    openLoginModal,
    setOpenRegistroModal,
    setOpenLoginModal,
  } = useAuthModals();
  const stateUser = useSelector((state) => state.user);
  const [mostrarMenu, setMostrarMenu] = useState(
    pathName === "/" || pathName === "/registro" || pathName === "/login"
  ); //menu central
  const [open, setOpen] = useState(false);
  const [openAcciones, setOpenAcciones] = useState(false);
  const [fixNavbarTop, setFixNavbarTop] = useState(false);
  const [logoColor, setLogoColor] = useState(logo);
  const wrapperRef = useRef(null);
  const botonRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setOriginalColor = useCallback(() => {
    switch (type) {
      case "pruple":
        setLogoColor(logoMorado);
        break;
      case "black":
        setLogoColor(logoGris);
        break;
      case "white":
        setLogoColor(logo);
        break;
      default:
        setLogoColor(logoGris);
    }
  }, [type]);

  useEffect(() => {
    setOriginalColor();
    axios
      .get(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }user/get`,
        userHeaders(false)
      )
      .then((res) => {
        const { token, user } = res.data;
        if (!user.isVerified) {
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
        dispatch(userGetUserSuccess(token, user));
      })
      .catch(() => {
        dispatch(userAuthError());
        setOpenRegistroModal(pathName === "/registro");
        setOpenLoginModal(pathName === "/login");
      });
  }, [
    dispatch,
    pathName,
    setOriginalColor,
    setOpenRegistroModal,
    setOpenLoginModal,
  ]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target) &&
        botonRef.current &&
        !botonRef.current.contains(event.target) &&
        openAcciones
      ) {
        setOpenAcciones(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, openAcciones, botonRef]);

  useEffect(() => {
    setMostrarMenu(
      pathName === "/" || pathName === "/registro" || pathName === "/login"
    );
  }, [pathName]);

  useEffect(() => {
    const fixNavbar = () => {
      if (window.scrollY >= 20) {
        setFixNavbarTop(true);
        setLogoColor(logoGris);
      } else {
        setFixNavbarTop(false);
        setOriginalColor();
      }
    };

    window.addEventListener("scroll", fixNavbar);

    return () => window.removeEventListener("scroll", fixNavbar);
  }, [setOriginalColor]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleAcciones = () => {
    setOpenAcciones(!openAcciones);
  };

  const handleOpenRegistroModal = () => {
    setOpenRegistroModal(true);
    setOpenAcciones(false);
  };
  const handleCloseRegistroModal = () => {
    setOpenRegistroModal(false);
  };
  const handleOpenLoginModal = () => {
    setOpenLoginModal(true);
    setOpenAcciones(false);
  };
  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
  };

  const handleCerrarSesion = () => {
    dispatch(userLogoutSuccess());
    setOpenAcciones(false);
  };

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
      navigate.push("/registro");
    }
  };

  return (
    <>
      <div
        className={`${shadow ? "style-solid-navbar" : ""} ${
          fixNavbarTop ? "active" : ""
        } ${fix ? "navbar-fixed" : "navbar-relative"}`}
      >
        <ModalRegistro
          handleClose={handleCloseRegistroModal}
          open={openRegistroModal}
          openLogin={() => setOpenLoginModal(true)}
        />
        <ModalLogin
          handleClose={handleCloseLoginModal}
          open={openLoginModal}
          openRegister={() => setOpenRegistroModal(true)}
        />

        <div
          style={{
            height: "100%",
            width: "100%",
            position: "relative",
            margin: "0",
          }}
        >
          <div className="img-logo-nav">
            <Link to="/">
              <img
                src={logoColor}
                style={{
                  maxWidth: "9rem",
                }}
                alt="Logo"
              />
            </Link>
          </div>
          <div className="navbar-centro">
            {mostrarMenu ? (
              <>
                <a
                  href="#eventos-a-un-click"
                  className={
                    fixNavbarTop
                      ? "navbar-opciones-centro active"
                      : "navbar-opciones-centro"
                  }
                >
                  Eventos a un click
                </a>
                <a
                  href="/buscador"
                  className={
                    fixNavbarTop
                      ? "navbar-opciones-centro active"
                      : "navbar-opciones-centro"
                  }
                >
                  Explorar catálogo
                </a>
                <p
                  className={
                    fixNavbarTop
                      ? "navbar-opciones-centro active"
                      : "navbar-opciones-centro"
                  }
                  onClick={handleAfiliarmeButton}
                  style={{ fontWeight: 500 }}
                >
                  Afilia tu negocio gratis
                </p>
                {stateUser.isAuthenticated && !!stateUser.userInfo?.isAlly && (
                  <a
                    href="/mis-negocios"
                    className={
                      fixNavbarTop
                        ? "navbar-opciones-centro active"
                        : "navbar-opciones-centro"
                    }
                  >
                    Mis negocios
                  </a>
                )}
              </>
            ) : null}
          </div>
          <div className="botones-desktop">
            <div
              className="boton-acciones"
              onClick={handleAcciones}
              ref={botonRef}
            >
              <MenuIcon
                style={{
                  fontSize: "1.2rem",
                  marginRight: "0.5rem",
                  marginLeft: "0.2rem",
                }}
              />
              {stateUser.isAuthenticated ? (
                <Avatar
                  style={{
                    width: "1.9rem",
                    height: "1.9rem",
                    backgroundColor: "#8c50ff",
                  }}
                >
                  {stateUser.userInfo.nombre.charAt(0).toUpperCase()}
                </Avatar>
              ) : (
                <AccountCircleIcon style={{ fontSize: "2rem" }} />
              )}
            </div>
          </div>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div
            style={{ padding: "0.2rem 0.5rem" }}
            className="menuIcon"
            onClick={handleClick}
          >
            <MenuIcon
              style={
                open
                  ? { fontSize: "2rem", color: "black" }
                  : { fontSize: "2rem" }
              }
            />
          </div>
        </div>

        <div
          ref={wrapperRef}
          className={openAcciones ? "menu-acciones active" : "menu-acciones"}
        >
          <p
            className="acciones"
            onClick={handleAfiliarmeButton}
            style={{ fontWeight: 500 }}
          >
            Afilia tu negocio gratis
          </p>
          <hr style={{ margin: "0" }} />
          <p className="acciones" onClick={() => navigate.push("/buscador")}>
            Explorar catálogo
          </p>
          {stateUser.isAuthenticated && !!stateUser.userInfo?.isAlly && (
            <>
              <hr style={{ margin: "0" }} />
              <p
                className="acciones"
                onClick={() => navigate.push("/mis-negocios")}
              >
                Mis negocios
              </p>
            </>
          )}
          {!!stateUser.userInfo?.isAdmin && (
            <>
              <hr style={{ margin: "0" }} />
              <p className="acciones" onClick={() => navigate.push("/admin")}>
                Admin
              </p>
            </>
          )}
          <hr style={{ margin: "0" }} />
          {stateUser.isAuthenticated ? (
            <p className="acciones" onClick={handleCerrarSesion}>
              Cerrar sesión
            </p>
          ) : (
            <>
              <p className="acciones bold" onClick={handleOpenRegistroModal}>
                Regístrate
              </p>
              <p className="acciones" onClick={handleOpenLoginModal}>
                Inicia sesión
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

Navbar.propTypes = {
  shadow: PropTypes.bool,
  fix: PropTypes.bool,
  purpleLogo: PropTypes.bool,
  greyLogo: PropTypes.bool,
  openRegister: PropTypes.bool,
  openLogin: PropTypes.bool,
};

Navbar.defaultProps = {
  shadow: false,
  fix: false,
  purpleLogo: false,
  greyLogo: false,
  openRegister: false,
  openLogin: false,
};
