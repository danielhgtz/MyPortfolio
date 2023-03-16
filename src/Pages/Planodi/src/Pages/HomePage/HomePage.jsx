import React, { useEffect, useState, Suspense, lazy } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { alpha, Grid } from "@material-ui/core";

import Navbar, { useAuthModals } from "./Navbar/Navbar";
import BuscadorInicio from "./BuscadorInicio/BuscadorInicio";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { userHeaders } from "../../Utils/headerSetter";
import DotLoading from "../../componentes/DotLoading/DotLoading";
import "./HomePage.css";

const ModalRegistro = lazy(() =>
  import("./Navbar/ModalRegistro/ModalRegistro")
);
const ModalLogin = lazy(() => import("./Navbar/ModalLogin/ModalLogin"));
const TipoEventosBlur = lazy(() => import("./TipoEventos/TipoEventosBlur"));
const AfiliarSection = lazy(() => import("./AfiliarSection/AfiliarSection"));
const CarouselV2 = lazy(() =>
  import("../../componentes/CarouselV2/CarouselV2")
);
const Button = lazy(() => import("@material-ui/core/Button"));
const Footer = lazy(() => import("./Footer/Footer"));
const EventosAUnClick = lazy(() => import("./EventosAUnClick/EventosAUnClick"));

const useStyles = makeStyles(() => ({
  buttonAfil: {
    width: "30%",
    borderRadius: "5px",
    padding: "8px",
    backgroundColor: alpha("#3b3b3b", 0.95),
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: alpha("#3b3b3b", 0.8),
      color: "#FFFFFF",
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const stateUser = useSelector((state) => state.user);
  const [cardsTerrazas, setCardsTerrazas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [estados, setEstados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [offSetY, setOffsetY] = useState(0);
  const {
    openRegistroModal,
    openLoginModal,
    setOpenRegistroModal,
    setOpenLoginModal,
  } = useAuthModals();

  const classes = useStyles();
  const mobile = useMediaQuery("(max-width:960px)");

  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.title =
      "Planodi: Encuentra los mejores proveedores de eventos, salones y terrazas.";
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token)
      axios
        .post(
          `${
            process.env.REACT_APP_ENV === "development"
              ? process.env.REACT_APP_API_LOCAL
              : process.env.REACT_APP_API_PROD
          }user/verifyEmail`,
          {},
          userHeaders(true, token)
        )
        .then(() => {
          setLoading(false);
          toast.dismiss();
          toast.success("Tu cuenta ha sido verificada!", {
            position: "bottom-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch(() => {
          setLoading(false);
          toast.error("Parece que hubo un error verificando tu cuenta!", {
            position: "bottom-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .finally(() => navigate.push("/"));
  }, [navigate, location]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }aliado/getInfoHomePage`
      )
      .then((res) => {
        const { cards, estados, categorias } = res.data;
        if (cards.length) setCardsTerrazas(cards);
        setEstados(estados);
        setCategorias(categorias);
        setLoading(false);
      })
      .catch(() => {
        // TODO: Handler del error
      });
  }, []);

  return (
    <div className="wrp-all-home-page">
      {/*<div className="browser-blur-bg" />*/}
      <div className="wrp-home-page">
        <div
          // className="fondo-gradiente"
          style={{ paddingTop: "10px" }}
        >
          <Grid item>
            <Navbar fix type="black" />
          </Grid>
          {/*<Grid item style={{ width: "100%" }}>*/}
          {/*  <Buscador />*/}
          {/*</Grid>*/}
          <BuscadorInicio
            estados={estados}
            categorias={categorias}
            loading={loading}
          />
        </div>
        <Suspense
          fallback={
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "3rem",
                marginTop: "3rem",
              }}
            >
              <DotLoading />
            </div>
          }
        >
          <ModalRegistro
            handleClose={() => setOpenRegistroModal(false)}
            open={openRegistroModal}
            titleModal={"Paso 1: Primero tienes que registrarte"}
            openLogin={() => setOpenLoginModal(true)}
          />
          <ModalLogin
            handleClose={() => {
              setOpenLoginModal(false);
            }}
            open={openLoginModal}
            openRegister={() => setOpenRegistroModal(true)}
          />
          <TipoEventosBlur />
          <div
            style={{
              marginLeft: "5%",
              marginTop: "3.3rem",
              // transform: `translateY(${offSetY * -0.1}px)`,
            }}
          >
            <CarouselV2
              infoCards={cardsTerrazas}
              cardPackages={false}
              widthCard={240}
              loading={loading}
              title="Top proveedores y terrazas"
              totalResults={false}
              verMasButton
            />
          </div>
          <EventosAUnClick setOpenLoginModal={setOpenLoginModal} />
          <AfiliarSection offSetY={offSetY} stateUser={stateUser} />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "4rem",
              marginBottom: "12rem",
            }}
          >
            <Button
              className={`afiliar-section-color-box-btn ${classes.buttonAfil}`}
              href={"/Planodi/buscador"}
              style={mobile ? { width: "80%" } : { width: "30%" }}
            >
              Ver catálogo completo
            </Button>
          </div>
          <Footer offSetY={offSetY} />
        </Suspense>
      </div>
    </div>
  );
}
