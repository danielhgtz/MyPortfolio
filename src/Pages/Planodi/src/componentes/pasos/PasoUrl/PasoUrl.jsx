import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import * as Yup from "yup";
import axios from "axios";
import { Form, Formik } from "formik";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { userHeaders } from "../../../Utils/headerSetter";
import MyTextField from "../../formikInputs/MyTextField/MyTextField";
import "./PasoUrl.css";
import Button from "@material-ui/core/Button";
import { botonesAtrasYAdelante } from "../PasoForm";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ErrorMsg from "../../ErrorMsg";
import Slider from "@material-ui/core/Slider";

const initialValues = {
  username: "",
};

export const numberToPrecio = {
  1: "$",
  2: "$-$$",
  3: "$$",
  4: "$$-$$$",
  5: "$$$",
  6: "$$$-$$$$",
  7: "$$$$",
  8: "$$$$-$$$$$",
  9: "$$$$$",
};
export const precioToNumber = {
  ["$"]: 1,
  ["$-$$"]: 2,
  ["$$"]: 3,
  ["$$-$$$"]: 4,
  ["$$$"]: 5,
  ["$$$-$$$$"]: 6,
  ["$$$$"]: 7,
  ["$$$$-$$$$$"]: 8,
  ["$$$$$"]: 9,
};
export const numberToPrecioStr = {
  1: "gama baja",
  2: "gama baja",
  3: "gama baja",
  4: "gama media/baja",
  5: "gama media",
  6: "gama media/alta",
  7: "gama alta",
  8: "gama alta",
  9: "premium",
};

const validationSchema = Yup.object({
  username: Yup.string()
    .required("Este campo es requerido")
    .test(
      "username",
      "No puede tener espacios, se pueden usar números, letras y guión bajo (_)",
      (value) => {
        if (!value) return false;
        return /^[a-zA-Z0-9_]+$/.test(value);
      }
    ),
});

export default function PasoUrl({
  setStep,
  idAliado,
  setUsername,
  isAdminPage,
  backAdminPage,
  submitStepAdmin,
}) {
  const classes = botonesAtrasYAdelante();
  const movil = useMediaQuery("(max-width:960px)");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(
    "Error desconocido, intetnalo más tarde"
  );
  const [valuePrecio, setValuePrecio] = useState(5);

  const handleChange = (event, newValue) => {
    setValuePrecio(newValue);
  };

  return (
    <Grid container direction="column" style={{ minWidth: "320px" }}>
      {error ? <ErrorMsg setError={setError} errorMsg={errorMsg} /> : null}
      <p className="url-txt-instruc">Un último paso</p>
      <p className="url-txt-instruc2" style={{ marginBottom: "3rem" }}>
        Agrega el nombre <b>único</b> de tu negocio, se usará en el link de la
        página de tu negocio. No puede tener espacios ni caracteres especiales,
        solamente dígitos y guión bajo (_).
      </p>
      <div style={{ width: "100%" }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(data, { setSubmitting }) => {
            if (isAdminPage) {
              setUsername(data.username);
              submitStepAdmin(5, {
                idAliado: null,
                pathUrl: data.username,
                precio: numberToPrecio[valuePrecio],
              });
              return;
            }
            setSubmitting(true);
            axios
              .post(
                `${
                  process.env.REACT_APP_ENV === "development"
                    ? process.env.REACT_APP_API_LOCAL
                    : process.env.REACT_APP_API_PROD
                }user/guardarPaso6`,
                {
                  idAliado,
                  pathUrl: data.username,
                  precio: numberToPrecio[valuePrecio],
                },
                userHeaders()
              )
              .then(() => {
                setSubmitting(false);
                setUsername(data.username);
                setStep(9);
              })
              .catch((e) => {
                const { response } = e;
                if (response && response.data && response.data.msg) {
                  if (response.data.msg) setErrorMsg(response.data.msg);
                }
                setError(true);
                setSubmitting(false);
              });
          }}
        >
          {({ values }) => (
            <Form>
              <Grid item container xs={12}>
                <Grid item xs={false} md={3} />
                <Grid item xs={12} md={6} className="postion-rel">
                  <MyTextField
                    name="username"
                    placeholder="Nombre único para tu negocio"
                    style={movil ? { padding: "0 10%" } : null}
                  />
                </Grid>
                <Grid item xs={false} md={3} />
              </Grid>
              <Grid item container xs={12} style={{ width: "100%" }}>
                <Grid item xs={false} md={3} />
                <Grid item xs={12} md={6} className="afil-link-wrapper">
                  <p className="afil-link" style={{ wordBreak: "break-all" }}>
                    www.planodi.com/negocios/
                    <span
                      style={{
                        color: "#3c3b3b",
                        fontWeight: 500,
                      }}
                    >
                      {values.username}
                    </span>
                  </p>
                </Grid>
                <Grid item xs={false} md={3} />
              </Grid>
              <div>
                <p
                  className="url-txt-instruc2"
                  style={{ marginBottom: "1rem" }}
                >
                  Clasifica tus servicios en un rango de precio:
                </p>
                <div className="url-precio-slider-flex">
                  <div className="url-precio-slider">
                    <Slider
                      step={1}
                      marks
                      min={1}
                      max={9}
                      value={valuePrecio}
                      onChange={handleChange}
                    />
                  </div>
                  <p className="url-precio-slider-p">
                    {numberToPrecio[valuePrecio]}
                  </p>
                  <p className="url-precio-slider-p2">
                    ({numberToPrecioStr[valuePrecio]})
                  </p>
                </div>
              </div>
              <Grid
                item
                container
                style={{ marginTop: "1.5rem", marginBottom: "3rem" }}
              >
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <Button
                    className={classes.cancelButton}
                    style={
                      movil
                        ? { width: "80%", marginBottom: "1rem" }
                        : { width: "30%", marginRight: "1rem" }
                    }
                    onClick={() => {
                      if (isAdminPage) {
                        backAdminPage();
                      } else {
                        setStep(7);
                      }
                    }}
                  >
                    Regresar
                  </Button>
                  <Button
                    type="submit"
                    className={classes.button}
                    style={movil ? { width: "80%" } : { width: "30%" }}
                  >
                    Finalizar{" "}
                    <ArrowForwardIosIcon style={{ marginLeft: "1rem" }} />
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </Grid>
  );
}
