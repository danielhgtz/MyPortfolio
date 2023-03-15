import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import "./ModalRegistro.css";
import Grid from "@material-ui/core/Grid";
import { useLocation } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yup from "yup";
import IconButton from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useDispatch } from "react-redux";
import moment from "moment";
import axios from "axios";
import { fade } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import MyTextField from "../../../../componentes/formikInputs/MyTextField/MyTextField";
import MyDateSelect from "../../../../componentes/formikInputs/MyDateSelect/MyDateSelect";
import {
  userAuthError,
  userLoginSuccess,
} from "../../../../actions/userActions";
import Alert from "@material-ui/lab/Alert";
import { toast } from "react-toastify";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import GoogleLogin from "react-google-login";
import { userHeaders } from "../../../../Utils/headerSetter";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  button: {
    marginTop: "1.6rem",
    marginBottom: "1rem",
    borderRadius: "10px",
    fontSize: "1rem",
    backgroundColor: "#8c50ff",
    color: "white",
    transition: "0.2s",
    padding: "0.5rem 3rem",
    "&:hover": {
      backgroundColor: fade("#8c50ff", 0.9),
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

export default function ModalRegistro({
  handleClose,
  open,
  openLogin,
  titleModal,
  afterRegister,
}) {
  const location = useLocation();
  const [error, setError] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [errorMsg, setErrorMsg] = useState(
    "Error desconocido al intentar hacer login"
  );
  const classes = useStyles();
  const dispatch = useDispatch();
  const mobile = useMediaQuery("(max-width:460px)");

  const handleRegistroExitoso = () => {
    toast.success(
      "Registro existoso! Revisa tu email y verifica tu cuenta. El correo puede llegar a spam.",
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
  };

  const validationSchema = yup.object({
    nombre: yup.string().required("Este campo es requerido"),
    apellidos: yup.string().required("Este campo es requerido"),
    email: yup
      .string()
      .required("Este campo es requerido")
      .matches(/^(?=.*@)/, "Ingresa un correo válido"),
    // celular: yup
    //   .string()
    //   .required("Este campo es requerido")
    //   .test(
    //     "celular",
    //     "El teléfono tiene que ser de 10 dígitos y no se debe ingresar la lada +52",
    //     (value) => {
    //       if (!value) return false;
    //       if (value.substring(0, 2) === "+5") return false;
    //       if (value.substring(0, 2) === "52") return false;
    //       return /^\d{10}$/.test(value);
    //     }
    //   ),
    contrasena: yup
      .string()
      .required("Por favor ingresa una contraseña")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{8,})/,
        "La contraseña debe tener mínimo 8 caracteres que incluyan: una mayúscula, una minúscula y un número"
      ),
    contrasena2: yup
      .string()
      .test("passwords-match", "Las contraseñas no coinciden", function (
        value
      ) {
        return this.parent.contrasena === value;
      }),
    // sexo: yup
    //   .number()
    //   .min(0, "Selecciona una opción válida")
    //   .required("Este campo es requerido para continuar"),
    fechaNacimiento: yup
      .string()
      .required("Este campo es requerido")
      .test(
        "DOB",
        "Se tiene que ser mayor de edad para poder crear con una cuenta",
        (value) => {
          return moment().diff(moment(value), "years") >= 18;
        }
      ),
  });

  const onFailure = (error) => {
    setLoadingGoogle(false);
  };

  const googleResponse = async (response) => {
    setLoadingGoogle(false);
    // Check if a token was recieved and send it to our API:
    if (response.tokenId) {
      axios
        .post(
          `${
            process.env.REACT_APP_ENV === "development"
              ? process.env.REACT_APP_API_LOCAL
              : process.env.REACT_APP_API_PROD
          }user/userAuth`,
          { token: response.tokenId },
          userHeaders()
        )
        .then((res) => {
          const { token, user } = res.data;
          dispatch(userLoginSuccess(token, user));
          afterRegister(user);
          handleClose();
        })
        .catch((e) => {
          const { response } = e;
          if (response && response.data && response.data.msg) {
            if (response.data.msg) setErrorMsg(response.data.msg);
          }
          setError(true);
        });
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth="sm"
      fullScreen={mobile}
      style={{ minWidth: "320px" }}
    >
      <DialogTitle
        id="customized-dialog-title"
        onClose={handleClose}
        style={{
          padding: "0.8rem",
          position: "relative",
        }}
      >
        <p className="modal-reg-titulo">
          {titleModal
            ? titleModal
            : location.pathname === "/registro"
            ? "Paso 1: Primero tienes que registrarte"
            : "Registro"}
        </p>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          style={{
            position: "absolute",
            right: "0",
            top: "0",
            marginRight: "0.5rem",
            marginTop: "0.4rem",
          }}
          className="modal-reg-titulo"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <div className="modal-reg-wrp">
          <div className="modal-reg-oauth-wrp">
            <div
              className="modal-reg-oauth-btn"
              onClick={() => setLoadingGoogle(true)}
              style={
                loadingGoogle ? { pointerEvents: "none", opacity: "0.5" } : null
              }
            >
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Continuar con Google"
                onSuccess={googleResponse}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
              />
            </div>
            <hr style={{ width: "80%", margin: "0" }} />
            <p className="modal-reg-oauth-O">O registrate con Planodi</p>
          </div>
          <div>
            <Formik
              initialValues={{
                nombre: "",
                apellidos: "",
                email: "",
                contrasena: "",
                contrasena2: "",
                fechaNacimiento: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                axios
                  .post(
                    `${
                      process.env.REACT_APP_ENV === "development"
                        ? process.env.REACT_APP_API_LOCAL
                        : process.env.REACT_APP_API_PROD
                    }user/agregar`,
                    {
                      infoUsuario: data,
                    }
                  )
                  .then((res) => {
                    const { token, user } = res.data;
                    dispatch(userLoginSuccess(token, user));
                    setSubmitting(false);
                    handleRegistroExitoso();
                    if (!user.isVerified) {
                      toast.dismiss();
                      toast.warn(
                        "Registro exitoso, falta que verifiques tu cuenta. Por favor revisa tu email, pudo haber llegado a la bandeja de spam.",
                        {
                          position: "bottom-right",
                          autoClose: false,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        }
                      );
                    } else {
                      afterRegister(user);
                    }
                    handleClose();
                  })
                  .catch((e) => {
                    const { response } = e;
                    if (response && response.data && response.data.msg) {
                      if (response.data.msg) setErrorMsg(response.data.msg);
                    }
                    dispatch(userAuthError());
                    setError(true);
                    setSubmitting(false);
                  });
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Grid container>
                    {error ? (
                      <Grid item xs={12}>
                        <Alert
                          severity="error"
                          style={{ margin: "0 0.5rem 1.3rem 0.5rem" }}
                        >
                          {errorMsg}
                        </Alert>
                      </Grid>
                    ) : null}
                    <Grid item xs={12} md={6}>
                      <MyTextField
                        name="nombre"
                        type="input"
                        placeholder="Nombre(s)"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MyTextField
                        name="apellidos"
                        type="input"
                        placeholder="Apellidos"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <MyTextField
                        name="email"
                        type="input"
                        placeholder="Email"
                      />
                    </Grid>
                    {/*<Grid item xs={12}>*/}
                    {/*  <MyCelInput name="celular" />*/}
                    {/*</Grid>*/}
                    <Grid item xs={12} md={6}>
                      <MyTextField
                        name="contrasena"
                        placeholder="Contraseña"
                        type="password"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MyTextField
                        name="contrasena2"
                        placeholder="Verifica contraseña"
                        type="password"
                      />
                    </Grid>
                    {/*<Grid item xs={12} md={6}>*/}
                    {/*  <MySelect name="sexo" label="Sexo">*/}
                    {/*    <option value="1">Femenino</option>*/}
                    {/*    <option value="2">Masculino</option>*/}
                    {/*    <option value="3">Otro</option>*/}
                    {/*  </MySelect>*/}
                    {/*</Grid>*/}
                    <Grid item xs={12} md={12}>
                      <MyDateSelect
                        name="fechaNacimiento"
                        label="Fecha de nacimiento"
                      />
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: "center" }}>
                      <Button
                        className={classes.button}
                        type="submit"
                        disabled={isSubmitting}
                        style={
                          loadingGoogle
                            ? { pointerEvents: "none", opacity: "0.5" }
                            : null
                        }
                      >
                        Registrar
                      </Button>
                      <p className="modal-reg-login-redirect">
                        ¿Ya tienes una cuenta?{" "}
                        <span
                          className="modal-reg-login-redirect-link"
                          onClick={() => {
                            openLogin();
                            handleClose();
                          }}
                        >
                          Inicia sesión
                        </span>
                      </p>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

ModalRegistro.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  openLogin: PropTypes.func,
  afterRegister: PropTypes.func,
  titleModal: PropTypes.string,
};

ModalRegistro.defaultProps = {
  afterRegister: () => {},
  openLogin: () => {},
  titleModal: null,
};
