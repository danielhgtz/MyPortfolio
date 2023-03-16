import React from "react";
import "./AfiliarSection.css";
import { makeStyles } from "@material-ui/core/styles";
import { alpha } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthModals } from "../Navbar/Navbar";
import ModalRegistro from "../Navbar/ModalRegistro/ModalRegistro";
import ModalLogin from "../Navbar/ModalLogin/ModalLogin";

const useStyles = makeStyles(() => ({
  buttonAfil: {
    borderRadius: "10px",
    padding: "12px 24px",
    backgroundColor: alpha("#FFFFFF", 0.95),
    color: "#3b3b3b",
    "&:hover": {
      backgroundColor: alpha("#FFFFFF", 0.85),
      color: "#3b3b3b",
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

export default function AfiliarSection({ offSetY, stateUser }) {
  const classes = useStyles();
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

  return (
    <div className="afiliar-section-wrp">
      <ModalRegistro
        handleClose={() => setOpenRegistroModal(false)}
        open={openRegistroModal}
        titleModal={"Paso 1: Primero tienes que registrarte"}
        openLogin={() => setOpenLoginModal(true)}
        afterRegister={() => {
          navigate.push("/afiliarme");
        }}
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
      <div className="afiliar-section-wrp-div">
        {/*<img*/}
        {/*  src={background}*/}
        {/*  alt="personas festejando"*/}
        {/*  className="afiliar-section-bg-img"*/}
        {/*/>*/}
        <p className="afiliar-section-title">Registra tu negocio</p>
        <p className="afiliar-section-subtitle">
          Obten visibilidad en internet registrando tu negocio. ¡Puedes comenzar
          totalmente gratis!
        </p>
        <Button
          className={`afiliar-section-btn ${classes.buttonAfil}`}
          onClick={handleAfiliarmeButton}
        >
          Registrate Aquí
        </Button>
      </div>
    </div>
  );
}
