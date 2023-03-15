import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import "moment/locale/es";
import Button from "@material-ui/core/Button";

import "./ModalEventosAUnClick.css";
import CustomDateSelector from "../../../componentes/inputs/CustomDateSelector/CustomDateSelector";
import Loading from "../../../componentes/Loading/Loading";
import Checkbox from "@material-ui/core/Checkbox";
import AgregarArticulo from "../../../componentes/AgregarArticulo/AgregarArticulo";
import { FaAngleLeft, FaAngleRight, FaUser } from "react-icons/fa/index";
import { botanasStatic, extrasStatic, taquizaStatic } from "./staticsEventos";
import { userHeaders } from "../../../Utils/headerSetter";
import { useSelector } from "react-redux";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorMsg from "../../../componentes/ErrorMsg";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

const buttonBox = makeStyles(() => ({
  button: {
    backgroundColor: "#8c50ff",
    color: "white",
    padding: "12px 24px",
    "&:hover": {
      backgroundColor: "#0D3B66",
      color: "white",
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

export default function ModalEventosAUnClick({
  handleClose,
  open,
  precioInicial,
  personas,
  nombre,
  setOpenLoginModal,
  allImages,
}) {
  const incluirIva = true;
  const classes = buttonBox();
  const user = useSelector((state) => state.user);
  const fullModal = useMediaQuery("(max-width:400px)");
  const mobile = useMediaQuery("(max-width:960px)");

  const [dateSelected, setDateSelected] = useState(
    moment().add(7, "days").format("YYYY-MM-DD")
  );
  const [loading, setLoading] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [showBotanas, setShowBotanas] = useState(false);
  const [errorValidacionMenu, setErrorValidacionMenu] = useState(false);
  const [errorValidacionBotanas, setErrorValidacionBotanas] = useState(false);
  const [precio, setPrecio] = useState(precioInicial);
  const [precioBotanas, setPrecioBotanas] = useState(20 * personas);
  const [precioExtras, setPrecioExtras] = useState([]);
  const [menu, setMenu] = useState(taquizaStatic);
  const [botanas, setBotanas] = useState(botanasStatic);
  const [extras, setExtras] = useState(extrasStatic);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Error desconocido");
  const [eventoCreado, setEventoCreado] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [whatsapp, setWhatsapp] = useState("");

  const changeImage = (direccion) => {
    if (direccion > 0) {
      activeImage === allImages.length - 1
        ? setActiveImage(0)
        : setActiveImage(activeImage + 1);
    }
    if (direccion < 0) {
      activeImage === 0
        ? setActiveImage(allImages.length - 1)
        : setActiveImage(activeImage - 1);
    }
  };

  useEffect(() => {
    setPrecio(precioInicial);
  }, [precioInicial, personas]);

  useEffect(() => {
    let precioGlobal = precioInicial;
    if (showBotanas) {
      precioGlobal += precioBotanas;
    }
    if (Object.keys(extras).filter((key) => extras[key].cantidad).length) {
      const extrasFiltered = Object.keys(extras)
        .filter((key) => extras[key].cantidad)
        .map((item) => {
          return {
            precio: extras[item].precio,
            nombre: item,
            cantidad: extras[item].cantidad,
          };
        });
      setPrecioExtras(extrasFiltered);
      extrasFiltered.forEach((item) => {
        precioGlobal += item.precio * item.cantidad;
      });
    } else {
      setPrecioExtras([]);
    }
    setPrecio(precioGlobal);
  }, [showBotanas, extras]);

  useEffect(() => {
    setPrecioBotanas(20 * personas);
  }, [personas]);

  const handleSubmit = () => {
    setLoading(true);
    axios
      .post(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }user/nuevoEvento`,
        {
          idUser: user?.userInfo?.id,
          infoPaquete: { nombre, precio: precioInicial, personas },
          menu: Object.keys(menu).filter((key) => menu[key]),
          botana: Object.keys(botanas).filter((key) => botanas[key]),
          extras: precioExtras,
          precioBotana: precioBotanas,
          fecha: moment(dateSelected).locale("es").format("LL"),
          whatsapp,
        },
        userHeaders()
      )
      .then(() => {
        setEventoCreado(true);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        const { response } = e;
        if (response && response.data && response.data.msg) {
          if (response.data.msg) setErrorMsg(response.data.msg);
        }
        setError(true);
      });
  };

  const handleChange = () => {
    if (checkout) {
      if (!user.isAuthenticated) {
        setOpenLoginModal(true);
      } else {
        handleSubmit();
      }
    } else {
      if (Object.keys(menu).filter((key) => menu[key]).length === 6) {
        if (
          !showBotanas ||
          Object.keys(botanas).filter((key) => botanas[key]).length === 2
        ) {
          setErrorValidacionMenu(false);
          setErrorValidacionBotanas(false);
          setCheckout(true);
        } else {
          setErrorValidacionMenu(false);
          setErrorValidacionBotanas(true);
        }
      } else {
        setErrorValidacionMenu(true);
      }
    }
  };

  useEffect(() => {
    if (checkout) {
      const myDiv = document.getElementById("containerDialog1Click");
      myDiv.scrollTop = 0;
    }
  }, [checkout]);

  const closeModal = () => {
    setMenu(taquizaStatic);
    setBotanas(botanasStatic);
    setExtras(extrasStatic);
    setPrecioExtras([]);
    setShowBotanas(false);
    setErrorValidacionMenu(false);
    setErrorValidacionBotanas(false);
    setCheckout(false);
    setEventoCreado(false);
    handleClose();
  };

  return (
    <Dialog
      onClose={closeModal}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth="md"
      fullScreen={fullModal}
      style={{ minWidth: "320px" }}
      className="modal-package-wrp-gen"
    >
      <DialogTitle
        id="customized-dialog-title"
        onClose={closeModal}
        style={{
          position: "relative",
        }}
      >
        <IconButton
          aria-label="close"
          onClick={closeModal}
          style={{
            position: "absolute",
            right: "6px",
            top: "3px",
          }}
          className="modal-reg-titulo"
        >
          <CloseIcon />
        </IconButton>
        <p
          style={{
            fontSize: "1.2rem",
            fontWeight: 300,
            margin: 0,
            width: "100%",
            textAlign: "center",
            color: "#3b3b3b",
          }}
        >
          Eventos a un click
        </p>
      </DialogTitle>
      <DialogContent
        dividers
        className="dialog-eventos-1-click"
        id="containerDialog1Click"
      >
        {loading ? (
          <div style={{ height: "500px" }}>
            <Loading helperText="Estamos creando tu evento..." />
          </div>
        ) : eventoCreado ? (
          <div
            style={{ minWidth: "320px", textAlign: "center", height: "200px" }}
          >
            <p
              className="titulo-conf-aliado"
              style={{
                marginTop: "5rem",
                fontSize: "0.9rem",
                padding: "0 10%",
                color: "#3b3b3b",
              }}
            >
              Tu evento se ha solicitado con éxito. Te hemos enviado un correo
              con los detalles y te enviaremos otro de confirmación en las
              próximas 24 horas.
            </p>
            <CheckCircleIcon
              style={{
                color: "#49a254",
                fontSize: "4rem",
                marginBottom: "5rem",
              }}
            />
          </div>
        ) : (
          <div className="modal-ev-1-click-wrp">
            <div className="modal-ev-1-click-img">
              <div className="modal-ev-1-click-imgs-wrp">
                <img
                  src={allImages[activeImage]}
                  alt="Paquete fiesta 30/50 personas planodi"
                  className="modal-ev-1-click-imgs-img"
                />
                <FaAngleLeft
                  className={`modal-ev-1-click-control-arrows ${
                    activeImage === 0 ? "innactive" : null
                  }`}
                  style={{ left: "1px" }}
                  onClick={() => changeImage(-1)}
                />
                <FaAngleRight
                  className={`modal-ev-1-click-control-arrows ${
                    activeImage + 1 === allImages.length ? "innactive" : null
                  }`}
                  style={{ right: "1px" }}
                  onClick={() => changeImage(1)}
                />
              </div>
              <div className="modal-ev-1-click-checkbox-wrp">
                <p
                  style={{
                    fontSize: "0.7rem",
                    color: "#3b3b3b",
                    margin: "0 0 0 0",
                  }}
                >
                  Ingresa fecha:
                </p>
                <CustomDateSelector
                  value={dateSelected}
                  setValue={setDateSelected}
                  name="inputDateCLient"
                  min={moment().format("YYYY-MM-DD")}
                  style={{ width: "100%", marginTop: "0.5rem" }}
                />
                {showBotanas || precioExtras.length || incluirIva ? (
                  <>
                    <p
                      style={{
                        margin: "1rem 0 0 0",
                        fontSize: "1.2rem",
                        color: "#3b3b3b",
                      }}
                    >
                      $
                      {precioInicial.toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      })}{" "}
                      MXN
                    </p>
                    <div
                      style={{
                        color: "#7a7a7a",
                        fontSize: "0.8rem",
                        padding: "0 0 0 10%",
                      }}
                    >
                      {showBotanas && (
                        <p>
                          +$
                          {precioBotanas.toLocaleString(undefined, {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          })}{" "}
                          MXN botanas
                        </p>
                      )}
                      {precioExtras.map((item) => (
                        <p>
                          +$
                          {item.precio.toLocaleString(undefined, {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          })}{" "}
                          MXN {item.nombre} x {item.cantidad}
                        </p>
                      ))}
                      <p>
                        IVA(16%): +$
                        {(precio * 0.16).toLocaleString(undefined, {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        })}{" "}
                        MXN
                      </p>
                    </div>
                    <hr style={{ margin: "0" }} />
                  </>
                ) : null}
                <p
                  style={{
                    margin: "1rem 0 0 0",
                    fontSize: "1.2rem",
                    color: "#3b3b3b",
                    fontWeight: 500,
                  }}
                >
                  Total: $
                  {(precio * 1.16).toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })}{" "}
                  MXN
                </p>
                <Button
                  className={classes.button}
                  style={{ width: "100%", marginTop: "1rem" }}
                  onClick={handleChange}
                >
                  {checkout ? "Reservar ahora" : "Continuar"}
                </Button>
                {errorValidacionMenu ? (
                  <p
                    style={{
                      color: "#e90f0f",
                      fontSize: "0.7rem",
                      marginTop: "6px",
                    }}
                  >
                    Asegurate de haber seleccionado los 6 platillos
                  </p>
                ) : errorValidacionBotanas ? (
                  <p
                    style={{
                      color: "#e90f0f",
                      fontSize: "0.7rem",
                      marginTop: "6px",
                    }}
                  >
                    Asegurate de haber seleccionado 2 botanas
                  </p>
                ) : null}
              </div>
            </div>
            <div className="modal-ev-1-click-content">
              {error ? (
                <ErrorMsg setError={setError} errorMsg={errorMsg} />
              ) : null}
              {checkout ? (
                <div>
                  <p
                    className="modal-ev-1-click-content-p"
                    style={{ textAlign: "center" }}
                  >
                    Si prefieres que te contacten por whatsapp ingresa tu número
                    a continuación:
                  </p>
                  <FormControl className="modal-ev-whats-div">
                    <TextField
                      label="whatsapp"
                      variant="outlined"
                      onChange={(event) => {
                        setWhatsapp(event.target.value);
                      }}
                      value={whatsapp}
                      style={{ width: "300px" }}
                    />
                  </FormControl>
                  {/*<div className="modal-ev-1c-checkout-wrp">*/}
                  {/*  {Object.keys(extras).map((key) => (*/}
                  {/*    <AgregarArticulo*/}
                  {/*      name={key}*/}
                  {/*      image={extras[key].imagen}*/}
                  {/*      precio={extras[key].precio}*/}
                  {/*      cantidad={extras[key].cantidad}*/}
                  {/*      removeFunction={() => {*/}
                  {/*        if (extras[key].cantidad > 0) {*/}
                  {/*          setExtras((prevState) => {*/}
                  {/*            return {*/}
                  {/*              ...prevState,*/}
                  {/*              [key]: {*/}
                  {/*                ...prevState[key],*/}
                  {/*                cantidad: extras[key].cantidad - 1,*/}
                  {/*              },*/}
                  {/*            };*/}
                  {/*          });*/}
                  {/*        }*/}
                  {/*      }}*/}
                  {/*      addFunction={() => {*/}
                  {/*        setExtras((prevState) => {*/}
                  {/*          return {*/}
                  {/*            ...prevState,*/}
                  {/*            [key]: {*/}
                  {/*              ...prevState[key],*/}
                  {/*              cantidad: extras[key].cantidad + 1,*/}
                  {/*            },*/}
                  {/*          };*/}
                  {/*        });*/}
                  {/*      }}*/}
                  {/*    />*/}
                  {/*  ))}*/}
                  {/*</div>*/}

                  {mobile && (
                    <>
                      {showBotanas || precioExtras.length ? (
                        <>
                          <p
                            style={{
                              margin: "1rem 0 0 0",
                              fontSize: "1.2rem",
                              color: "#3b3b3b",
                            }}
                          >
                            $
                            {precioInicial.toLocaleString(undefined, {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            })}{" "}
                            MXN
                          </p>
                          <div
                            style={{
                              color: "#7a7a7a",
                              fontSize: "0.8rem",
                              padding: "0 0 0 10%",
                            }}
                          >
                            {showBotanas && (
                              <p>
                                +$
                                {precioBotanas.toLocaleString(undefined, {
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 2,
                                })}{" "}
                                MXN botanas
                              </p>
                            )}
                            {precioExtras.map((item) => (
                              <p>
                                +$
                                {item.precio.toLocaleString(undefined, {
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 2,
                                })}{" "}
                                MXN {item.nombre} x {item.cantidad}
                              </p>
                            ))}
                          </div>
                          <hr style={{ margin: "0" }} />
                        </>
                      ) : null}
                      <p
                        style={{
                          margin: "1rem 0 0 0",
                          fontSize: "1.2rem",
                          color: "#3b3b3b",
                          fontWeight: 500,
                        }}
                      >
                        Total: $
                        {precio.toLocaleString(undefined, {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        })}{" "}
                        MXN
                      </p>
                      <Button
                        className={classes.button}
                        style={{ width: "100%", marginTop: "1rem" }}
                        onClick={handleChange}
                      >
                        {checkout ? "Reservar ahora" : "Continuar"}
                      </Button>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <p className="modal-ev-1-click-content-p">
                    {nombre} <span style={{ color: "#f84f0a" }}>gratis</span>
                  </p>
                  <p style={{ fontSize: "1rem", margin: "1rem 0 0 0" }}>
                    <FaUser style={{ margin: "0 5px 4px 0" }} />
                    {personas} personas
                  </p>
                  {mobile && (
                    <div className="modal-ev-1-click-imgs-wrp">
                      <img
                        src={allImages[activeImage]}
                        alt="Paquete fiesta 30/50 personas planodi"
                        className="modal-ev-1-click-imgs-img"
                      />
                      <FaAngleLeft
                        className={`modal-ev-1-click-control-arrows ${
                          activeImage === 0 ? "innactive" : null
                        }`}
                        style={{ left: "1px" }}
                        onClick={() => changeImage(-1)}
                      />
                      <FaAngleRight
                        className={`modal-ev-1-click-control-arrows ${
                          activeImage + 1 === allImages.length
                            ? "innactive"
                            : null
                        }`}
                        style={{ right: "1px" }}
                        onClick={() => changeImage(1)}
                      />
                    </div>
                  )}
                  <p className="modal-ev-1-click-content-desc">
                    Despreocúpate por el lugar, la comida y el mobiliario.
                    Paquete armado que incluye terraza{" "}
                    <a
                      href="https://planodi.com/negocios/Terraza_Privada_de_Agapantos"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @Terraza Privada de Agapantos
                    </a>
                    , comida y mobiliario por parte de{" "}
                    <a
                      href="https://planodi.com/negocios/banquetesmodelo"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @banquetes modelo
                    </a>{" "}
                    y 36 cervezas totalmente gratis cortesía de Planodi (te las
                    enviaremos por rappi el día del evento). <br />
                    <br />
                    Elige la comida y la fecha que deseas para tu evento. Una
                    vez que nuestros 2 aliados confirmen su disponibilidad te
                    llegará un correo de confirmación y los proveedores se
                    pondrán en contacto contigo por email y whatsapp (en el
                    siguiente paso podrás ingresarlo).
                  </p>
                  {mobile && (
                    <>
                      <p
                        style={{
                          fontSize: "0.7rem",
                          color: "#0D3B66",
                          margin: "1rem 0 0 0",
                          fontWeight: 500,
                        }}
                      >
                        Ingresa fecha:
                      </p>
                      <CustomDateSelector
                        value={dateSelected}
                        setValue={setDateSelected}
                        name="inputDateCLient"
                        min={moment().format("YYYY-MM-DD")}
                        style={{ width: "100%", marginTop: "1rem" }}
                      />
                    </>
                  )}
                  <div className="modal-ev-1-click-checkbox-main-wrp">
                    <p className="modal-ev-1-click-checkbox-wrp-p">
                      Escoge 6 platillos -
                      <span
                        style={
                          errorValidacionMenu
                            ? {
                                color: "#e90f0f",
                                marginLeft: "10px",
                                fontWeight: 300,
                              }
                            : { marginLeft: "10px", fontWeight: 300 }
                        }
                      >
                        {Object.keys(menu).filter((key) => menu[key]).length} de
                        6 seleccionados
                      </span>
                    </p>
                    <p style={{ color: "#0D3B66", fontSize: "0.8rem" }}>
                      *Ya incluye tortillas hechas a mano, frijoles y
                      quesadillas
                    </p>
                    <div className="modal-ev-1-click-checkbox-wrp-flex">
                      {Object.keys(menu).map((key, idx) => (
                        <div className="modal-ev-1-click-checkboxes" key={idx}>
                          <Checkbox
                            size="small"
                            checked={menu[key]}
                            id={key}
                            onChange={() => {
                              setMenu({ ...menu, [key]: !menu[key] });
                            }}
                            style={menu[key] ? { color: "#0D3B66" } : null}
                            disabled={
                              Object.keys(menu).filter((key) => menu[key])
                                .length === 6 && !menu[key]
                            }
                          />
                          <label
                            htmlFor={key}
                            className="modal-ev-1-click-checkboxes-label"
                          >
                            {key}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  {showBotanas ? (
                    <div className="modal-ev-1-click-botanas-main-wrp active">
                      <p style={{ fontWeight: 500, color: "#3b3b3b" }}>
                        <span style={{ color: "#67b121" }}>
                          +
                          {precioBotanas.toLocaleString(undefined, {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          })}{" "}
                          MXN
                        </span>{" "}
                        (botana para {personas} invitados)
                      </p>
                      <div
                        style={{
                          position: "absolute",
                          top: "6px",
                          right: "10px",
                        }}
                        onClick={() => {
                          setErrorValidacionBotanas(false);
                          setShowBotanas(false);
                        }}
                      >
                        <CloseIcon
                          style={{
                            fontSize: "1.4rem",
                            cursor: "pointer",
                            color: "#bf0e0e",
                          }}
                        />
                      </div>
                      <p className="modal-ev-1-click-checkbox-wrp-p">
                        Escoge 2 botanas -
                        <span
                          style={
                            errorValidacionBotanas
                              ? {
                                  color: "#e90f0f",
                                  marginLeft: "10px",
                                  fontWeight: 300,
                                }
                              : { marginLeft: "10px", fontWeight: 300 }
                          }
                        >
                          {
                            Object.keys(botanas).filter((key) => botanas[key])
                              .length
                          }{" "}
                          de 2 seleccionados
                        </span>
                      </p>
                      <div className="modal-ev-1-click-checkbox-wrp-flex">
                        {Object.keys(botanas).map((key, idx) => (
                          <div
                            className="modal-ev-1-click-checkboxes"
                            key={idx}
                          >
                            <Checkbox
                              size="small"
                              checked={botanas[key]}
                              id={key}
                              onChange={() => {
                                setBotanas({
                                  ...botanas,
                                  [key]: !botanas[key],
                                });
                              }}
                              style={botanas[key] ? { color: "#0D3B66" } : null}
                              disabled={
                                Object.keys(botanas).filter(
                                  (key) => botanas[key]
                                ).length === 2 && !botanas[key]
                              }
                            />
                            <label
                              htmlFor={key}
                              className="modal-ev-1-click-checkboxes-label"
                            >
                              {key}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div
                      className="modal-ev-1-click-botanas-main-wrp"
                      onClick={() => setShowBotanas(true)}
                    >
                      <p>Da click para agregar botanas</p>
                    </div>
                  )}
                  {mobile && (
                    <>
                      {showBotanas || precioExtras.length ? (
                        <>
                          <p
                            style={{
                              margin: "1rem 0 0 0",
                              fontSize: "1.2rem",
                              color: "#3b3b3b",
                            }}
                          >
                            $
                            {precioInicial.toLocaleString(undefined, {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            })}{" "}
                            MXN
                          </p>
                          <div
                            style={{
                              color: "#7a7a7a",
                              fontSize: "0.8rem",
                              padding: "0 0 0 10%",
                            }}
                          >
                            {showBotanas && (
                              <p>
                                +$
                                {precioBotanas.toLocaleString(undefined, {
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 2,
                                })}{" "}
                                MXN botanas
                              </p>
                            )}
                            {precioExtras.map((item) => (
                              <p>
                                +$
                                {item.precio.toLocaleString(undefined, {
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 2,
                                })}{" "}
                                MXN {item.nombre} x {item.cantidad}
                              </p>
                            ))}
                          </div>
                          <hr style={{ margin: "0" }} />
                        </>
                      ) : null}
                      <p
                        style={{
                          margin: "1rem 0 0 0",
                          fontSize: "1.2rem",
                          color: "#3b3b3b",
                          fontWeight: 500,
                        }}
                      >
                        Total: $
                        {precio.toLocaleString(undefined, {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        })}{" "}
                        MXN
                      </p>
                      <Button
                        className={classes.button}
                        style={{ width: "100%", marginTop: "1rem" }}
                        onClick={handleChange}
                      >
                        {checkout ? "Reservar ahora" : "Continuar"}
                      </Button>
                      {errorValidacionMenu ? (
                        <p
                          style={{
                            color: "#e90f0f",
                            fontSize: "0.7rem",
                            marginTop: "6px",
                          }}
                        >
                          Asegurate de haber seleccionado los 6 platillos
                        </p>
                      ) : errorValidacionBotanas ? (
                        <p
                          style={{
                            color: "#e90f0f",
                            fontSize: "0.7rem",
                            marginTop: "6px",
                          }}
                        >
                          Asegurate de haber seleccionado 2 botanas
                        </p>
                      ) : null}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
