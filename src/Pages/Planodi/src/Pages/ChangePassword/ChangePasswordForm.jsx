import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import axios from "axios";
import * as yup from "yup";
import Button from "@material-ui/core/Button";

import ErrorMsg from "../../componentes/ErrorMsg";
import MyTextField from "../../componentes/formikInputs/MyTextField/MyTextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { alpha } from "@material-ui/core";
import { userHeaders } from "../../Utils/headerSetter";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../componentes/Loading/Loading";

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
      backgroundColor: alpha("#8c50ff", 0.9),
      color: "white",
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

export default function ChangePasswordForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(
    "Error desconocido al intentar cambiar contraseña"
  );
  const classes = useStyles();
  const idUser = useSelector((state) => state?.user?.userInfo?.id);

  const validationSchema = yup.object({
    password: yup
      .string()
      .required("Por favor ingresa una contraseña")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{8,})/,
        "La contraseña debe tener mínimo 8 caracteres que incluyan: una mayúscula, una minúscula y un número"
      ),
    confirmPassword: yup
      .string()
      .test(
        "passwords-match",
        "Las contraseñas no coinciden",
        function (value) {
          return this.parent.password === value;
        }
      ),
  });

  useEffect(() => {
    axios
      .get(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }user/getHasToChangePassword?idUser=${idUser}`,
        userHeaders(false)
      )
      .then((res) => {
        const { hasToChangePassword } = res.data;
        if (!hasToChangePassword) {
          navigate.push("/");
        }
        setLoading(false);
      })
      .catch(() => {
        navigate.push("/");
      });
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div
          style={{
            width: "100%",
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Formik
            initialValues={{
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);
              const { password, confirmPassword } = data;
              axios
                .post(
                  `${
                    process.env.REACT_APP_ENV === "development"
                      ? process.env.REACT_APP_API_LOCAL
                      : process.env.REACT_APP_API_PROD
                  }user/cambiarContrasena`,
                  {
                    idUser,
                    password,
                    confirmPassword,
                  },
                  userHeaders()
                )
                .then(() => {
                  setSubmitting(false);
                  navigate.push("/");
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
            {({ values, isSubmitting }) => (
              <Form autoComplete="off" style={{ width: "300px" }}>
                <div>
                  {error ? (
                    <ErrorMsg
                      setError={setError}
                      errorMsg={errorMsg}
                      style={{ margin: "0 0.2rem 1rem 0.2rem" }}
                    />
                  ) : null}
                  <p
                    style={{
                      color: "#3b3b3b",
                      fontSize: "1.2rem",
                      textAlign: "center",
                      margin: "1rem 0",
                    }}
                  >
                    Por tu seguridad te pedimos crear una contraseña
                  </p>
                  <div style={{ width: "100%" }}>
                    <MyTextField
                      name="password"
                      type="password"
                      placeholder="Nueva contraseña"
                    />
                  </div>
                  <div style={{ width: "100%" }}>
                    <MyTextField
                      name="confirmPassword"
                      type="password"
                      placeholder="Repite la nueva contraseña"
                    />
                  </div>
                  <div style={{ width: "100%", textAlign: "center" }}>
                    <Button
                      className={classes.button}
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Cambiar contraseña
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
}
