import React, { useEffect, useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import Popover from "@material-ui/core/Popover";
import * as yup from "yup";

import "./ResumenPaquete.css";
import moment from "moment";
import "moment/locale/es";
import axios from "axios";
import { userAuthError, userLoginSuccess } from "../../actions/userActions";
import { Form, Formik } from "formik";
import MyCelInput from "../../componentes/formikInputs/MyCelInput/MyCelInput";
import Button from "@material-ui/core/Button";
import { botonesMoradoNegroRojo } from "../../componentes/Packages/ModalPackage/CreatePagesInPackages";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { userHeaders } from "../../Utils/headerSetter";
import Loading from "../../componentes/Loading/Loading";
import { kindOfPricesDiccionario } from "../../componentes/pasos/PasoPaquetes/ModalCreatePackage";
import MyTextField from "../../componentes/formikInputs/MyTextField/MyTextField";
import MyLongText from "../../componentes/formikInputs/MyLongText/MyLongText";

const validationSchema = yup.object({
  celular: yup
    .string()
    .required("Este campo es requerido")
    .test(
      "celular",
      "El teléfono tiene que ser de 10 dígitos y no se debe ingresar la lada +52",
      (value) => {
        if (!value) return false;
        if (value.substring(0, 2) === "+5") return false;
        if (value.substring(0, 2) === "52") return false;
        return /^\d{10}$/.test(value);
      }
    ),
  direccion: yup.string().required("Este campo es requerido"),
});

export default function ResumenPaquete({
  finalPage,
  extrasResumenOpciones,
  setExtrasResumenOpciones,
  precioTotal,
  extrasResumenArticulos,
  setExtrasResumenArticulos,
  nombreAliado,
  nombrePaquete,
  date,
  handleBack,
  setErrorMsg,
  setError,
  idAliado,
  infoPaquete,
  especificaciones,
  setOpenLoginModal,
  stateUser,
  reservaSuccess,
  setNumeroDeReferencia,
  pathUrl,
  aliadoNombre,
  numeroDePersonas,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(7000);
  const [costoDeServicio, setCostoDeServicio] = useState(500);

  const classes = botonesMoradoNegroRojo();
  const mobile2 = useMediaQuery("(max-width:960px)");

  useEffect(() => {
    let precioConExtras = precioTotal;
    extrasResumenOpciones.forEach((item) => {
      if (item.cantidad) {
        if (
          item.kindOfPrice === parseInt(kindOfPricesDiccionario.porPersona, 10)
        ) {
          precioConExtras += item.precio * numeroDePersonas;
        } else {
          precioConExtras += item.precio;
        }
      }
    });
    extrasResumenArticulos.forEach((item) => {
      if (
        item.kindOfPrice === parseInt(kindOfPricesDiccionario.porPersona, 10) &&
        !item.isArticulo
      ) {
        precioConExtras += item.precio * numeroDePersonas;
      } else {
        precioConExtras += item.precio * item.cantidad;
      }
    });
    const servicioExtra = precioConExtras * 0.06 * 1.16;
    setCostoDeServicio(servicioExtra);
    setTotal(precioConExtras + servicioExtra);
  }, [extrasResumenOpciones, extrasResumenArticulos, numeroDePersonas]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      {loading && finalPage ? (
        <div style={{ height: "500px" }}>
          <Loading helperText="Estamos creando tu reservación..." />
        </div>
      ) : (
        <div className="res_paq_wrp_all">
          <p className={finalPage ? "res_paq_title_final" : "res_paq_title"}>
            Resumen de compra
          </p>
          {finalPage && (
            <>
              <p className="res_paq_fecha">
                Fecha del evento:{" "}
                <span style={{ fontWeight: 500 }}>
                  {moment(date).format("LL")}
                </span>
              </p>
              <p className="res_paq_fecha">Paquete: {nombrePaquete}</p>
              <p className="res_paq_fecha">
                Proveedor del paquete: {nombreAliado}
              </p>
            </>
          )}
          <div className="res_paq_wrp">
            <p className="res_paq_row">
              Subtotal: $
              {precioTotal.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}{" "}
              MXN
            </p>
            {extrasResumenOpciones
              .filter((item) => !item.free && item.cantidad)
              .map((item) => (
                <p
                  className="res_paq_row"
                  key={item.id}
                  style={{ marginLeft: "10px" }}
                >
                  <span style={{ fontWeight: 500 }}>
                    + $
                    {item.kindOfPrice ===
                    parseInt(kindOfPricesDiccionario.porPersona, 10)
                      ? (item.precio * numeroDePersonas).toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          }
                        )
                      : item.precio.toLocaleString(undefined, {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        })}{" "}
                    MXN
                  </span>{" "}
                  Extra ({item.nombre}
                  {item.kindOfPrice ===
                  parseInt(kindOfPricesDiccionario.porPersona, 10)
                    ? ` - $${item.precio} por persona`
                    : null}
                  ){" "}
                  <MdDeleteForever
                    className="res_paq_delete_icon"
                    onClick={() => {
                      setExtrasResumenOpciones((prevState) => {
                        const prevStateObj = prevState.filter(
                          (prevOpStatus) => prevOpStatus.id === item.id
                        )[0];
                        return [
                          ...prevState.filter(
                            (prevOpStatus) => prevOpStatus.id !== item.id
                          ),
                          {
                            ...prevStateObj,
                            cantidad: 0,
                          },
                        ];
                      });
                    }}
                  />
                </p>
              ))}
            {extrasResumenArticulos.map((item) => (
              <p
                className="res_paq_row"
                key={item.id}
                style={{ marginLeft: "10px" }}
              >
                <span style={{ fontWeight: 500 }}>
                  + $
                  {item.kindOfPrice ===
                    parseInt(kindOfPricesDiccionario.porPersona, 10) &&
                  !item.isArticulo
                    ? (item.precio * numeroDePersonas).toLocaleString(
                        undefined,
                        {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        }
                      )
                    : (item.precio * item.cantidad).toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      })}{" "}
                  MXN
                </span>{" "}
                {item.nombre.length >= 30
                  ? `${item.nombre.substring(0, 30)}...`
                  : item.nombre}{" "}
                ($
                {item.precio.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}{" "}
                x{" "}
                {item.kindOfPrice ===
                  parseInt(kindOfPricesDiccionario.porPersona, 10) &&
                !item.isArticulo
                  ? `${numeroDePersonas} personas`
                  : item.cantidad}
                )
                <MdDeleteForever
                  className="res_paq_delete_icon"
                  onClick={() => {
                    setExtrasResumenArticulos((prevState) => {
                      return prevState.filter((item2) => item2.id !== item.id);
                    });
                  }}
                />
              </p>
            ))}
            <p className="res_paq_row" onClick={handleClick}>
              <span style={{ textDecoration: "underline", cursor: "pointer" }}>
                Costo de servicio:
              </span>{" "}
              $
              {costoDeServicio.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}{" "}
              MXN
            </p>
            {!finalPage && (
              <>
                <hr style={{ margin: "5px 0" }} />
                <p className="res_paq_row">
                  <span style={{ fontWeight: 500 }}>TOTAL:</span> $
                  {total.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })}{" "}
                  MXN
                </p>
              </>
            )}
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <p className="res_paq_popover">
                <AiFillInfoCircle
                  style={{ margin: "0 4px 1px 0", fontSize: "1rem" }}
                />
                Este monto nos ayuda a mantener la plataforma y poder asistirte
                con tu evento. Incluye IVA.
              </p>
            </Popover>
          </div>
          {finalPage && (
            <>
              <p className="res_paq_total_p">
                Total: $
                {total.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}{" "}
                MXN
              </p>
              <Formik
                initialValues={{
                  celular: "",
                  direccion: "",
                  comentario: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(data) => {
                  if (!stateUser.isAuthenticated) {
                    setOpenLoginModal(true);
                    return;
                  }
                  setLoading(true);
                  window.scrollTo(0, 0);
                  axios
                    .post(
                      `${
                        process.env.REACT_APP_ENV === "development"
                          ? process.env.REACT_APP_API_LOCAL
                          : process.env.REACT_APP_API_PROD
                      }user/saveContratacion`,
                      {
                        idUsuario: stateUser?.userInfo?.id,
                        idAliado,
                        idPaquete: infoPaquete.id,
                        precioSubtotal: precioTotal,
                        contacto: data.celular,
                        direccion: data.direccion,
                        comentario: data.comentario,
                        extrasOpciones: extrasResumenOpciones,
                        extrasArticulos: extrasResumenArticulos,
                        especificaciones,
                        fechaDelEvento: moment(date).format("YYYY-MM-DD"),
                        nombrePaquete,
                        pathUrl,
                        aliadoNombre,
                        numeroDePersonas,
                      },
                      userHeaders()
                    )
                    .then((res) => {
                      const { numeroDeReservacion } = res.data;
                      setNumeroDeReferencia(numeroDeReservacion);
                      setLoading(false);
                      reservaSuccess();
                    })
                    .catch((e) => {
                      const { response } = e;
                      if (response && response.data && response.data.msg) {
                        if (response.data.msg) setErrorMsg(response.data.msg);
                      }
                      setLoading(false);
                      setError(true);
                    });
                }}
              >
                <Form className="res_paq_in_cel">
                  <p className="res_paq_in_cel_p_ins">
                    *Ingresa un número de contacto y la dirección del evento:
                  </p>
                  <MyCelInput
                    name="celular"
                    style={mobile2 ? { width: "100%" } : { width: "300px" }}
                  />
                  <MyTextField
                    name="direccion"
                    type="input"
                    placeholder="Dirección del evento"
                    style={mobile2 ? { width: "100%" } : { width: "300px" }}
                  />
                  <MyLongText
                    name="comentario"
                    type="input"
                    placeholder="(opcional) ¿Alguna especificación/comentario/duda?"
                    style={mobile2 ? { width: "100%" } : { width: "618px" }}
                    rows={2}
                  />
                  <p className="res_paq_instrucciones">
                    <span style={{ fontWeight: 400 }}>{nombreAliado}</span>{" "}
                    confirmará tu reservación en las siguientes 24 horas, te
                    enviaremos un correo de confirmación y ellos se comunicarán
                    contigo. El precio total podría cambiar por variables como
                    la distancia al evento. Si tienes alguna pregunta{" "}
                    <a
                      href={`https://api.whatsapp.com/send?phone=5213335038387&text=%C2%A1Hola!%20Quiero%20%20reservar%20un%20paquete%20pero%20tengo%20una%20duda.`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      no dudes en contactarnos.
                    </a>
                  </p>
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
                      type="submit"
                    >
                      Reservar
                    </Button>
                  </div>
                </Form>
              </Formik>
            </>
          )}
        </div>
      )}
    </>
  );
}
