import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Form, Formik } from "formik";
import * as yup from "yup";
import MyTextField from "../../../../componentes/formikInputs/MyTextField/MyTextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { fade } from "@material-ui/core";
import { useDispatch } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import {
  userAuthError,
  userLoginSuccess,
} from "../../../../actions/userActions";
import PropTypes from "prop-types";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import "./ModalLogin.css";
import GoogleLogin from "react-google-login";
import { userHeaders } from "../../../../Utils/headerSetter";
import ErrorMsg from "../../../../componentes/ErrorMsg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
      color: "white",
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

export default function ModalLogin({
  handleClose,
  open,
  afterLogin,
  openRegister,
}) {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [errorMsg, setErrorMsg] = useState(
    "Error desconocido al intentar hacer login"
  );
  const classes = useStyles();
  const dispatch = useDispatch();
  const mobile = useMediaQuery("(max-width:460px)");

  const validationSchema = yup.object({
    email: yup.string().required("Este campo es requerido"),
    password: yup.string().required("Este campo es requerido"),
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
          afterLogin(user);
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
      maxWidth="xs"
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
        <p className="modal-reg-titulo">Inicio de sesión</p>
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
            <p className="modal-reg-oauth-O">O inicia sesión con Planodi</p>
          </div>
          <div>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                const { password, email } = data;
                axios
                  .post(
                    `${
                      process.env.REACT_APP_ENV === "development"
                        ? process.env.REACT_APP_API_LOCAL
                        : process.env.REACT_APP_API_PROD
                    }user/login`,
                    {
                      email,
                      password,
                    }
                  )
                  .then((res) => {
                    const { token, user, hasToChangePassword } = res.data;
                    dispatch(userLoginSuccess(token, user));
                    setSubmitting(false);
                    if (hasToChangePassword) {
                      navigate.push("/change-password");
                    } else {
                      if (!user.isVerified) {
                        toast.dismiss();
                        toast.warn(
                          "Parece que no has verificado tu cuenta! por favor revisa tu email, pudo haber llegado a la bandeja de spam.",
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
                      } else {
                        afterLogin(user);
                      }
                      handleClose();
                    }
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
              {({ values, isSubmitting }) => (
                <Form autoComplete="off">
                  <Grid container>
                    {error ? (
                      <ErrorMsg
                        setError={setError}
                        errorMsg={errorMsg}
                        style={{ margin: "0 0 1rem 0", width: "100%" }}
                      />
                    ) : null}
                    <Grid item xs={12}>
                      <MyTextField
                        name="email"
                        type="input"
                        placeholder="Email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <MyTextField
                        name="password"
                        type="password"
                        placeholder="Contraseña"
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
                        Iniciar sesión
                      </Button>
                      <p className="modal-reg-login-redirect">
                        ¿No tienes una cuenta?{" "}
                        <span
                          className="modal-reg-login-redirect-link"
                          onClick={() => {
                            openRegister();
                            handleClose();
                          }}
                        >
                          Registrate
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

ModalLogin.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  afterLogin: PropTypes.func,
  openRegister: PropTypes.func,
};

ModalLogin.defaultProps = {
  afterLogin: () => {},
  openRegister: () => {},
};
