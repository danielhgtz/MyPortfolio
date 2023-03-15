import React, { useEffect, useRef, useState } from "react";
import { MdVerifiedUser } from "react-icons/md";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "@material-ui/core/Button";
import moment from "moment";

import "./PaquetesPage.css";
import Navbar, { useAuthModals } from "../HomePage/Navbar/Navbar";
import Footer from "../HomePage/Footer/Footer";
import DatePicker from "../../componentes/DatePicker/DatePicker";
import { botonesMoradoNegroRojo } from "../../componentes/Packages/ModalPackage/CreatePagesInPackages";
import GalleryTemplate2 from "../RootTemplates/Template2/GalleryTemplate2/GalleryTemplate2";
import { userHeaders } from "../../Utils/headerSetter";
import DotLoading from "../../componentes/DotLoading/DotLoading";
import PageOpciones from "./PageOpciones";
import StepperPaquete from "./StepperPaquete";
import ResumenPaquete from "./ResumenPaquete";
import PageExtras from "./PageExtras";
import { IoIosArrowBack } from "react-icons/io/index";
import ErrorMsg from "../../componentes/ErrorMsg";
import ModalRegistro from "../HomePage/Navbar/ModalRegistro/ModalRegistro";
import ModalLogin from "../HomePage/Navbar/ModalLogin/ModalLogin";
import { useSelector } from "react-redux";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const kindOfPrices = {
  1: "Por persona",
  2: "Por hora",
  3: "Por artículo",
  4: "Total",
};

const kindOfPrices2 = {
  1: "personas",
  2: "horas",
  3: "artículos",
  4: "",
};

export const toMomentDaysOfWeek = {
  do: 0,
  lu: 1,
  ma: 2,
  mi: 3,
  ju: 4,
  vi: 5,
  sa: 6,
};

const BoxPaquetePage = (
  precio,
  precioConRango,
  rango,
  activeNumSelect,
  setActiveNumSelect,
  opcionesIntervalo,
  precioTotal,
  setPrecioTotal,
  dateSelected,
  setDateSelected,
  classes,
  pagesExtras,
  pagesOpciones,
  setStep,
  busyDates,
  errorDate,
  setErrorDate,
  kindOfPrice,
  setShowExtraPages,
  setEspecificaciones,
  diasValidos
) => (
  <div className="paquetes-page-info-control">
    <div className="paquetes-page-info-control-price-div">
      <p className="paquetes-page-info-control-price">
        $
        {precio.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })}
      </p>
      <p className="paquetes-page-info-control-price-2">
        MXN {kindOfPrices[kindOfPrice]}{" "}
        <span style={{ fontSize: "0.8rem" }}>(Incluye IVA)</span>
      </p>
    </div>
    {precioConRango && (
      <>
        <p
          className="paquetes-page-info-control-date-p"
          style={{ margin: "10px 0 10px 0" }}
        >
          Puedes escoger de {rango[0]} a {rango[1]} {kindOfPrices2[kindOfPrice]}
        </p>
        <div className="paquetes-page-info-control-select-wrp-flex">
          <div className="paquetes-page-info-control-select-wrp">
            <select
              className="paquetes-page-info-control-select"
              value={activeNumSelect}
              onChange={(e) => {
                setPrecioTotal(precio * e.target.value);
                setActiveNumSelect(e.target.value);
                setEspecificaciones(
                  `${e.target.value} ${kindOfPrices2[kindOfPrice]}`
                );
              }}
            >
              {opcionesIntervalo.map((item) => (
                <option value={item} key={item}>
                  {item} {kindOfPrices2[kindOfPrice]}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="paquetes-page-info-control-total">
          Total: $
          {precioTotal.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}{" "}
          MXN
        </p>
      </>
    )}
    <p
      className="paquetes-page-info-control-date-p"
      style={errorDate ? { color: "#f15454" } : null}
    >
      Ingresa día del evento:
    </p>
    <DatePicker
      value={dateSelected}
      onChange={(value) => {
        setErrorDate(false);
        setDateSelected(value);
      }}
      tileDisabled={({ date }) => {
        let isDisbale = !diasValidos.includes(moment(date).day());
        busyDates.forEach(({ fechaReserva }) => {
          const completeDate = new Date(fechaReserva);
          if (completeDate.getTime() === date.getTime()) isDisbale = true;
        });

        return isDisbale;
      }}
      error={errorDate}
    />
    <Button
      className={classes.buttonPurp}
      style={{ width: "100%", marginTop: "1rem" }}
      onClick={() => {
        if (!dateSelected) {
          return setErrorDate(true);
        }
        if (pagesOpciones.length) {
          return setStep(1);
        }
        if (pagesExtras.length) {
          setShowExtraPages(true);
          return setStep(1);
        }
        setStep(2);
      }}
    >
      Continuar con reserva
    </Button>
  </div>
);

export default function PaquetesPage() {
  const stateUser = useSelector((state) => state.user);
  const { paqueteId } = useParams();
  const mobile = useMediaQuery("(max-width:580px)");
  const mobile2 = useMediaQuery("(max-width:960px)");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(
    "Error desconocido, inténtalo más tarde"
  );
  const [activeImage, setActiveImage] = useState(0);
  const [step, setStep] = useState(0);
  const [activeScrollImage, setActiveScrollImage] = useState(1);
  const [dateSelected, setDateSelected] = useState(null);
  const [errorDate, setErrorDate] = useState(false);
  const [rango, setRango] = useState([50, 200]);
  const [intervalo, setIntervalo] = useState(20);
  const [opcionesIntervalo, setOpcionesIntervalo] = useState([]);
  const [pagesExtras, setPagesExtras] = useState([]);
  const [pagesOpciones, setPagesOpciones] = useState([]);
  const [images, setImages] = useState([]);
  const [activeNumSelect, setActiveNumSelect] = useState(1);
  const [precioTotal, setPrecioTotal] = useState(200);
  const [precio, setPrecio] = useState(200);
  const [showGallery, setShowGallery] = useState(false);
  const [precioConRango, setPrecioConRango] = useState(false);
  const [infoAliado, setInfoAliado] = useState(null);
  const [infoPaquete, setInfoPaquete] = useState(null);
  const [currentOpcionesPage, setCurrentOpcionesPage] = useState(0);
  const [currentExtraPage, setCurrentExtraPage] = useState(0);
  const [showExtraPages, setShowExtraPages] = useState(false);
  const [opciones, setOpciones] = useState({});
  const [extrasResumenOpciones, setExtrasResumenOpciones] = useState([]); //{id:number; precio:number; nombre:string; status:{[nombre]: bool;}; free: bool; cantidad: number; kindOfPrice: number;}[]
  const [extrasResumenArticulos, setExtrasResumenArticulos] = useState([]); //{id:number; precio:number; nombre:string; cantidad:number; isArticulo: bool; kindOfPrice: number;}[]
  const [busyDates, setBusyDates] = useState([]);
  const [kindOfPrice, setKindOfPrice] = useState(4);
  const [numeroDeReferencia, setNumeroDeReferencia] = useState(0);
  const [idAliado, setIdAliado] = useState(null);
  const [diasValidos, setDiasValidos] = useState([0, 1, 2, 3, 4, 5, 6]);
  const [especificaciones, setEspecificaciones] = useState(
    `${activeNumSelect} ${kindOfPrices2[kindOfPrice]}`
  );

  const refFLexImages = useRef(null);
  const classes = botonesMoradoNegroRojo();
  const navigate = useNavigate();
  const {
    openRegistroModal,
    openLoginModal,
    setOpenRegistroModal,
    setOpenLoginModal,
  } = useAuthModals();

  const handleScrollImage = () => {
    if (refFLexImages && refFLexImages.current) {
      setActiveScrollImage(
        Math.ceil(
          refFLexImages.current.scrollLeft / refFLexImages.current.clientWidth
        ) + 1
      );
    }
  };

  useEffect(() => {
    const arr = [];
    let currentOption = rango[0];
    while (currentOption < rango[1]) {
      arr.push(currentOption);
      currentOption = currentOption + intervalo;
      if (currentOption >= rango[1]) {
        arr.push(rango[1]);
      }
    }
    setOpcionesIntervalo(arr);
  }, [rango, intervalo]);

  const changeImage = (direccion) => {
    if (direccion > 0) {
      activeImage === images.length - 1
        ? setActiveImage(0)
        : setActiveImage(activeImage + 1);
    }
    if (direccion < 0) {
      activeImage === 0
        ? setActiveImage(images.length - 1)
        : setActiveImage(activeImage - 1);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }aliado/paqueteById?id=${paqueteId}`,
        userHeaders(false)
      )
      .then((res) => {
        const { infoPaquete, infoAliado, precioConRango, busyDates } = res.data;
        setIdAliado(infoAliado.id);
        document.title = infoPaquete.name;
        setKindOfPrice(infoPaquete.kindOfPrice);
        setPagesExtras(infoPaquete.pagesExtras);
        setPagesOpciones(infoPaquete.pagesOpciones);
        setInfoAliado(infoAliado);
        setEspecificaciones(
          `${infoPaquete.capacidad} ${kindOfPrices2[infoPaquete.kindOfPrice]}`
        );
        setInfoPaquete(infoPaquete);
        setPrecioConRango(precioConRango);
        setPrecioTotal(
          precioConRango
            ? infoPaquete.price * infoPaquete.capacidad
            : infoPaquete.price
        );
        setImages(infoPaquete.allImages.map((item) => item.url));
        setPrecio(infoPaquete.price);
        setActiveNumSelect(infoPaquete.capacidad);
        setRango([infoPaquete.capacidad, infoPaquete.capacidad2]);
        setIntervalo(infoPaquete.intervalo);
        const today = new Date().getUTCDate();
        setBusyDates(
          busyDates.filter(
            (reserva) => new Date(reserva.fechaReserva).getUTCDate() >= today
          )
        );
        if (infoPaquete.isWeekdayDependant === 1) {
          const diasValidos = [];
          if (infoPaquete.lu) {
            diasValidos.push(toMomentDaysOfWeek.lu);
          }
          if (infoPaquete.ma) {
            diasValidos.push(toMomentDaysOfWeek.ma);
          }
          if (infoPaquete.mi) {
            diasValidos.push(toMomentDaysOfWeek.mi);
          }
          if (infoPaquete.ju) {
            diasValidos.push(toMomentDaysOfWeek.ju);
          }
          if (infoPaquete.vi) {
            diasValidos.push(toMomentDaysOfWeek.vi);
          }
          if (infoPaquete.sa) {
            diasValidos.push(toMomentDaysOfWeek.sa);
          }
          if (infoPaquete.do) {
            diasValidos.push(toMomentDaysOfWeek.do);
          }
          setDiasValidos(diasValidos);
        }
        const initialStateResumenOpciones = [];
        infoPaquete.pagesOpciones.forEach((item) => {
          const newOpcionesObj = {};
          item.opciones.split("_").forEach((item2) => {
            newOpcionesObj[item2] = false;
          });
          initialStateResumenOpciones.push({
            id: item.id,
            precio: item.agregarPrecio === 0 ? 0 : item.precioExtra,
            nombre: item.nombre,
            free: item.agregarPrecio === 0,
            status: newOpcionesObj,
            cantidad: item.agregarPrecio === 0 ? 1 : 0,
            kindOfPrice: item.kindOfPrice,
          });
        });
        setExtrasResumenOpciones(initialStateResumenOpciones);

        setLoading(false);
      })
      .catch(() => {
        navigate.push("/buscador");
      });
  }, []);

  const handleChangePage = () => {
    if (currentOpcionesPage < pagesOpciones.length - 1) {
      return setCurrentOpcionesPage(currentOpcionesPage + 1);
    }
    if (pagesExtras.length && !showExtraPages) {
      return setShowExtraPages(true);
    }
    if (pagesExtras.length && currentExtraPage < pagesExtras.length - 1) {
      return setCurrentExtraPage(currentExtraPage + 1);
    }
    setStep(2);
  };

  const handleBack = () => {
    if (step === 2) {
      if (!pagesOpciones.length && !pagesExtras.length) {
        return setStep(0);
      } else {
        return setStep(1);
      }
    }
    if (showExtraPages) {
      if (currentExtraPage > 0) {
        return setCurrentExtraPage(currentExtraPage - 1);
      } else {
        setShowExtraPages(false);
        if (!pagesOpciones.length) {
          return setStep(0);
        }
        return;
      }
    }
    if (currentOpcionesPage > 0) {
      return setCurrentOpcionesPage(currentOpcionesPage - 1);
    }
    setStep(0);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [step]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentOpcionesPage, showExtraPages, currentExtraPage]);

  return (
    <div className="paquetes-page-wrp-all">
      <ModalRegistro
        handleClose={() => setOpenRegistroModal(false)}
        open={openRegistroModal}
        titleModal={"Regístrate para contratar paquetes"}
        openLogin={() => setOpenLoginModal(true)}
      />
      <ModalLogin
        handleClose={() => setOpenLoginModal(false)}
        open={openLoginModal}
        openRegister={() => setOpenRegistroModal(true)}
      />
      {loading ? null : mobile2 && document.referrer !== "" ? (
        <>
          <div className="paquetes-page-top-nav-mobile">
            <div className="paquetes-page-mobile-button">
              <p
                className="paquetes-page-mobile-button-p"
                onClick={() => {
                  navigate.goBack();
                }}
              >
                <span>
                  <IoIosArrowBack
                    style={{ fontSize: "1rem", marginBottom: "3px" }}
                  />
                </span>
                Regresar
              </p>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              zIndex: -100,
              opacity: 0,
              pointerEvents: "none",
            }}
          >
            <Navbar type="black" />
          </div>
        </>
      ) : (
        <Navbar type="black" />
      )}
      {loading || step === 0 || step === 3 ? null : (
        <StepperPaquete progress={step === 1 ? "50%" : "100%"} />
      )}
      {loading ? (
        <DotLoading />
      ) : (
        (() => {
          switch (step) {
            case 0:
              return (
                <>
                  <GalleryTemplate2
                    showGallery={showGallery}
                    setShowGallery={setShowGallery}
                    imagenActualGal={activeImage}
                    imagenes={images}
                    changeImage={changeImage}
                  />
                  <div className="paquetes-page-wrp">
                    <div className="paquetes-page-content">
                      {mobile ? (
                        <div style={{ position: "relative", width: "100%" }}>
                          <div className="paquetes-page-gall-mobile-counter-img">
                            <p>
                              {activeScrollImage} / {images.length}
                            </p>
                          </div>

                          <div
                            className="paquetes-page-gall-mobile-wrp"
                            ref={refFLexImages}
                            onScroll={handleScrollImage}
                          >
                            <div
                              className="paquetes-page-gall-mobile-flex"
                              style={{ width: `${100 * images.length}%` }}
                            >
                              {images.map((item, idx) => (
                                <img
                                  className="paquetes-page-gall-mobile-img"
                                  style={{ background: `url(${images[idx]})` }}
                                  key={idx}
                                  onClick={() => setShowGallery(true)}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="paquetes-page-images-wrp">
                          {images
                            .filter((item, idx) => idx < 6)
                            .map((img, idx) => (
                              <div
                                className={`paquetes-page-image ${
                                  idx === activeImage
                                    ? "paquete-page-main-image"
                                    : null
                                }`}
                                style={{ background: `url(${img}) #d0d0d0` }}
                                key={img}
                                onMouseEnter={() => {
                                  setActiveImage(idx);
                                }}
                                onMouseLeave={() => {
                                  setActiveImage(0);
                                }}
                                onClick={() => setShowGallery(true)}
                              >
                                <div
                                  className={`paquetes-page-image-gall-btn ${
                                    idx === activeImage && activeImage !== 0
                                      ? "active"
                                      : null
                                  }`}
                                >
                                  Ver galería
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                      <div className="paquetes-page-info">
                        <div className="paquetes-page-info-text">
                          <div>
                            <p className="paquetes-page-info-text-titl">
                              {infoPaquete.name}
                            </p>
                            <p className="paquetes-page-info-text-subtitl">
                              Paquete de{" "}
                              {mobile2 ? (
                                <a href={`/negocios/${infoAliado.pathUrl}`}>
                                  {infoAliado.nombre}
                                </a>
                              ) : (
                                <a
                                  href={`/negocios/${infoAliado.pathUrl}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {infoAliado.nombre}
                                </a>
                              )}
                            </p>
                            {infoAliado.verificado === 1 && (
                              <p
                                className="paquetes-page-info-text-subtitl"
                                style={{ fontSize: "14px" }}
                              >
                                <MdVerifiedUser
                                  style={{
                                    color: "#8c50ff",
                                    fontSize: "1rem",
                                    margin: "0 6px 2px 0",
                                  }}
                                />
                                Proveedor verificado
                              </p>
                            )}
                            <p
                              className="paquetes-page-info-text-subtitl"
                              style={{ fontSize: "14px" }}
                            >
                              {infoAliado.estado}
                            </p>
                          </div>
                          {infoPaquete.isWeekdayDependant === 1 && (
                            <div style={{ paddingTop: "2rem" }}>
                              <p
                                className="paquetes-page-info-text-subtitl"
                                style={{ fontWeight: 400 }}
                              >
                                Precio válido para los días:
                              </p>
                              <div className="paquetes-page-info-text-dias-flex">
                                <p
                                  className={`paquetes-page-info-text-dias-dia ${
                                    infoPaquete.lu ? "active" : null
                                  }`}
                                >
                                  Lu
                                </p>
                                <p
                                  className={`paquetes-page-info-text-dias-dia ${
                                    infoPaquete.ma ? "active" : null
                                  }`}
                                >
                                  Ma
                                </p>
                                <p
                                  className={`paquetes-page-info-text-dias-dia ${
                                    infoPaquete.mi ? "active" : null
                                  }`}
                                >
                                  Mi
                                </p>
                                <p
                                  className={`paquetes-page-info-text-dias-dia ${
                                    infoPaquete.ju ? "active" : null
                                  }`}
                                >
                                  Ju
                                </p>
                                <p
                                  className={`paquetes-page-info-text-dias-dia ${
                                    infoPaquete.vi ? "active" : null
                                  }`}
                                >
                                  Vi
                                </p>
                                <p
                                  className={`paquetes-page-info-text-dias-dia ${
                                    infoPaquete.sa ? "active" : null
                                  }`}
                                >
                                  Sa
                                </p>
                                <p
                                  className={`paquetes-page-info-text-dias-dia ${
                                    infoPaquete.do ? "active" : null
                                  }`}
                                >
                                  Do
                                </p>
                              </div>
                            </div>
                          )}
                          {mobile2 &&
                            BoxPaquetePage(
                              precio,
                              precioConRango,
                              rango,
                              activeNumSelect,
                              setActiveNumSelect,
                              opcionesIntervalo,
                              precioTotal,
                              setPrecioTotal,
                              dateSelected,
                              setDateSelected,
                              classes,
                              pagesExtras,
                              pagesOpciones,
                              setStep,
                              busyDates,
                              errorDate,
                              setErrorDate,
                              kindOfPrice,
                              setShowExtraPages,
                              setEspecificaciones,
                              diasValidos
                            )}
                          <div style={{ paddingTop: "1.8rem" }}>
                            <p className="paquetes-page-info-text-descripcion">
                              {infoPaquete.description}
                            </p>
                          </div>
                        </div>
                        {!mobile2 &&
                          BoxPaquetePage(
                            precio,
                            precioConRango,
                            rango,
                            activeNumSelect,
                            setActiveNumSelect,
                            opcionesIntervalo,
                            precioTotal,
                            setPrecioTotal,
                            dateSelected,
                            setDateSelected,
                            classes,
                            pagesExtras,
                            pagesOpciones,
                            setStep,
                            busyDates,
                            errorDate,
                            setErrorDate,
                            kindOfPrice,
                            setShowExtraPages,
                            setEspecificaciones,
                            diasValidos
                          )}
                      </div>
                    </div>
                  </div>
                </>
              );
            case 1:
              return (
                <div className="paquetes-page-wrp">
                  {showExtraPages ? (
                    <PageExtras
                      pageExtras={pagesExtras[currentExtraPage]}
                      numberPage={currentExtraPage + 1}
                      extrasResumenArticulos={extrasResumenArticulos}
                      setExtrasResumenArticulos={setExtrasResumenArticulos}
                    />
                  ) : (
                    <PageOpciones
                      pagesOpciones={pagesOpciones[currentOpcionesPage]}
                      opciones={opciones}
                      setOpciones={setOpciones}
                      extrasResumenOpciones={extrasResumenOpciones}
                      setExtrasResumenOpciones={setExtrasResumenOpciones}
                      numeroDePersonas={activeNumSelect}
                    />
                  )}
                  <ResumenPaquete
                    finalPage={false}
                    extrasResumenOpciones={extrasResumenOpciones}
                    setExtrasResumenOpciones={setExtrasResumenOpciones}
                    precioTotal={precioTotal}
                    extrasResumenArticulos={extrasResumenArticulos}
                    setExtrasResumenArticulos={setExtrasResumenArticulos}
                    numeroDePersonas={activeNumSelect}
                  />
                  <div className="paquetes-page-botones">
                    <Button
                      className={classes.buttonBlue}
                      style={
                        mobile2
                          ? { width: "100%", marginTop: "0.8rem" }
                          : { width: "calc(50% - 8px)", marginRight: "8px" }
                      }
                      onClick={handleBack}
                    >
                      Regresar
                    </Button>
                    <Button
                      className={classes.buttonBlueFilled}
                      style={
                        mobile2
                          ? { width: "100%" }
                          : { width: "calc(50% - 8px)", marginLeft: "8px" }
                      }
                      onClick={handleChangePage}
                    >
                      Continuar
                    </Button>
                  </div>
                </div>
              );
            case 2:
              return (
                <div className="paquetes-page-wrp">
                  {error ? (
                    <ErrorMsg setError={setError} errorMsg={errorMsg} />
                  ) : null}
                  <ResumenPaquete
                    finalPage
                    extrasResumenOpciones={extrasResumenOpciones}
                    setExtrasResumenOpciones={setExtrasResumenOpciones}
                    precioTotal={precioTotal}
                    extrasResumenArticulos={extrasResumenArticulos}
                    setExtrasResumenArticulos={setExtrasResumenArticulos}
                    nombreAliado={infoAliado.nombre}
                    nombrePaquete={infoPaquete.name}
                    date={dateSelected}
                    handleBack={handleBack}
                    idAliado={idAliado}
                    infoPaquete={infoPaquete}
                    especificaciones={especificaciones}
                    setOpenLoginModal={setOpenLoginModal}
                    stateUser={stateUser}
                    reservaSuccess={() => {
                      setStep(3);
                    }}
                    setNumeroDeReferencia={setNumeroDeReferencia}
                    pathUrl={infoAliado.pathUrl}
                    aliadoNombre={infoAliado.nombre}
                    numeroDePersonas={activeNumSelect}
                  />
                </div>
              );
            case 3:
              return (
                <div className="paquetes-page-reserv-final-step">
                  <h1 className="paquetes-page-reserv-final-step-p1">
                    ¡Tu reservación se envió con éxito!{" "}
                    <span>
                      <CheckCircleIcon style={{ color: "#8fd72a" }} />
                    </span>
                  </h1>
                  <p className="paquetes-page-reserv-final-step-p2">
                    Número de orden: <b>#{numeroDeReferencia}</b>
                  </p>
                  <p className="paquetes-page-reserv-final-step-p2">
                    ¿Qué sigue?
                  </p>
                  <p className="paquetes-page-reserv-final-step-p3">
                    <span style={{ fontWeight: 400 }}>{infoAliado.nombre}</span>{" "}
                    confirmará tu reservación en las siguientes 24 horas y te
                    enviaremos un correo de confirmación. Por ahora puedes
                    revisar tu pedido en el correo que te acabamos de enviar, si
                    tienes alguna pregunta{" "}
                    <a
                      href={`https://api.whatsapp.com/send?phone=5213335038387&text=%C2%A1Hola!%20Acabo%20de%20reservar%20un%20paquete%20con%20el%20n%C3%BAmero%20de%20orden%20${numeroDeReferencia}%20y%20tengo%20una%20duda.`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      no dudes en contactarnos.
                    </a>
                  </p>
                </div>
              );
          }
        })()
      )}
      {loading ? null : <Footer />}
    </div>
  );
}
