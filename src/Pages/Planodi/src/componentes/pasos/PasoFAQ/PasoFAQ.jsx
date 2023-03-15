import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Formik } from "formik";
import { Form as FormikForm } from "formik";
import * as Yup from "yup";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

import "./PasoFAQ.css";
import { botonesAtrasYAdelante } from "../PasoForm";
import axios from "axios";
import { userHeaders } from "../../../Utils/headerSetter";
import Loading from "../../Loading/Loading";
import ErrorMsg from "../../ErrorMsg";
import Grid from "@material-ui/core/Grid";
import MyLongText from "../../formikInputs/MyLongText/MyLongText";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

const validationSchemaTerraza = Yup.object({
  q1: Yup.string().max(190, "No debe exceder los 190 caracteres."),
  q2: Yup.string().max(190, "No debe exceder los 190 caracteres."),
  q3: Yup.string().max(190, "No debe exceder los 190 caracteres."),
  q4: Yup.string().max(190, "No debe exceder los 190 caracteres."),
  q5: Yup.string().max(190, "No debe exceder los 190 caracteres."),
  q6: Yup.string().max(190, "No debe exceder los 190 caracteres."),
});

const validationSchemaProveedor = Yup.object({
  q1: Yup.string().max(190, "No debe exceder los 190 caracteres."),
  q2: Yup.string().max(190, "No debe exceder los 190 caracteres."),
  q3: Yup.string().max(190, "No debe exceder los 190 caracteres."),
  q4: Yup.string().max(190, "No debe exceder los 190 caracteres."),
  q5: Yup.string().max(190, "No debe exceder los 190 caracteres."),
  q6: Yup.string().max(190, "No debe exceder los 190 caracteres."),
});

export default function PasoFAQ({
  isTerraza,
  setStep,
  idAliado,
  dataSecundaria,
  isEdition,
  isCollapsible,
  isMainPage,
  isSelected,
  setIsSelected,
}) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(
    "Error desconocido en el servidor, intetnalo más tarde"
  );
  const [collapse, setCollapse] = useState(!isSelected);

  useEffect(() => {
    if (isCollapsible && !isSelected) setCollapse(true);
  }, [isCollapsible, isSelected]);

  const initialValuesTerraza = {
    q1: isEdition ? dataSecundaria?.q1 : "",
    q2: isEdition ? dataSecundaria?.q2 : "",
    q3: isEdition ? dataSecundaria?.q3 : "",
    q4: isEdition ? dataSecundaria?.q4 : "",
    q5: isEdition ? dataSecundaria?.q5 : "",
    q6: isEdition ? dataSecundaria?.q6 : "",
  };

  const initialValuesProveedor = {
    q1: isEdition ? dataSecundaria?.q1 : "",
    q2: isEdition ? dataSecundaria?.q2 : "",
    q3: isEdition ? dataSecundaria?.q3 : "",
    q4: isEdition ? dataSecundaria?.q4 : "",
    q5: isEdition ? dataSecundaria?.q5 : "",
    q6: isEdition ? dataSecundaria?.q6 : "",
  };

  const buttonTypes = botonesAtrasYAdelante();
  const mobile = useMediaQuery("(max-width:960px)");

  const onSubmitTerraza = ({ q1, q2, q3, q4, q5, q6 }) => {
    setLoading(true);
    axios
      .post(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }user/guardarFAQTerraza`,
        {
          idAliado,
          q1,
          q2,
          q3,
          q4,
          q5,
          q6,
          isEdition,
        },
        userHeaders()
      )
      .then(() => {
        setLoading(false);
        setStep(5);
      })
      .catch((e) => {
        const { response } = e;
        if (response && response.data && response.data.msg) {
          if (response.data.msg) setErrorMsg(response.data.msg);
        }
        setError(true);
        setLoading(false);
      });
  };

  const onSubmitProveedor = ({ q1, q2, q3, q4, q5, q6 }) => {
    setLoading(true);
    axios
      .post(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }user/guardarFAQProveedor`,
        {
          idAliado,
          q1,
          q2,
          q3,
          q4,
          q5,
          q6,
          isEdition,
        },
        userHeaders()
      )
      .then(() => {
        setLoading(false);
        setStep(5);
      })
      .catch((e) => {
        const { response } = e;
        if (response && response.data && response.data.msg) {
          if (response.data.msg) setErrorMsg(response.data.msg);
        }
        setError(true);
        setLoading(false);
      });
  };

  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        marginBottom: "1rem",
      }}
    >
      <p
        className={isEdition ? "url-txt-instruc-ed-neg" : "url-txt-instruc"}
        style={{ cursor: "pointer" }}
        onClick={() => {
          if (collapse) setIsSelected(6);
          setCollapse(!collapse);
        }}
      >
        {isCollapsible && (
          <span>
            {!collapse ? (
              <IoIosArrowDown
                style={{ marginRight: "15px", marginBottom: "5px" }}
              />
            ) : (
              <IoIosArrowForward
                style={{ marginRight: "15px", marginBottom: "5px" }}
              />
            )}
          </span>
        )}
        Preguntas frecuentes
      </p>

      {(!collapse || !isCollapsible) && (
        <>
          <p
            className="url-txt-instruc2"
            style={
              isCollapsible ? { textAlign: "left" } : { marginLeft: "10px" }
            }
          >
            Intenta contestar las siguientes preguntas de la forma más breve y
            concisa posible. Si no aplica para tu negocio no la respondas.
          </p>
          {loading ? (
            <div
              style={{
                height: "400px",
                position: "relative",
                width: "100%",
              }}
            >
              <Loading helperText="Cargando..." />
            </div>
          ) : (
            <div>
              <Formik
                initialValues={
                  isTerraza ? initialValuesTerraza : initialValuesProveedor
                }
                onSubmit={isTerraza ? onSubmitTerraza : onSubmitProveedor}
                validationSchema={
                  isTerraza
                    ? validationSchemaTerraza
                    : validationSchemaProveedor
                }
              >
                <FormikForm style={{ width: "100%" }}>
                  {error ? (
                    <ErrorMsg setError={setError} errorMsg={errorMsg} />
                  ) : null}
                  {isTerraza ? (
                    <div style={{ marginTop: "2rem" }}>
                      <Grid
                        style={
                          mobile
                            ? { marginTop: "0.3rem" }
                            : { padding: "1rem 0 0 1rem" }
                        }
                      >
                        <Grid item xs={12}>
                          <p className="afil-faq-pregunta-p">
                            ¿Celebra más de un evento al día?{" "}
                            <span
                              style={{ color: "#a9a9a9", fontSize: "0.7rem" }}
                            >
                              (Opcional)
                            </span>
                          </p>
                          <div>
                            <MyLongText
                              name="q1"
                              rows={mobile ? 3 : 2}
                              style={{ width: "100%", marginTop: "0.5rem" }}
                            />
                          </div>
                        </Grid>
                      </Grid>
                      <Grid
                        style={
                          mobile
                            ? { marginTop: "1rem" }
                            : { padding: "1rem 0 0 1rem" }
                        }
                      >
                        <Grid item xs={12}>
                          <p className="afil-faq-pregunta-p">
                            ¿Es posible rentar sólo el espacio, sin otros
                            servicios?{" "}
                            <span
                              style={{ color: "#a9a9a9", fontSize: "0.7rem" }}
                            >
                              (Opcional)
                            </span>
                          </p>
                          <div>
                            <MyLongText
                              name="q2"
                              rows={mobile ? 3 : 2}
                              style={{ width: "100%", marginTop: "0.5rem" }}
                            />
                          </div>
                        </Grid>
                      </Grid>
                      <Grid
                        style={
                          mobile
                            ? { marginTop: "1rem" }
                            : { padding: "1rem 0 0 1rem" }
                        }
                      >
                        <Grid item xs={12}>
                          <p className="afil-faq-pregunta-p">
                            ¿Hay límite de hora en los eventos?{" "}
                            <span
                              style={{ color: "#a9a9a9", fontSize: "0.7rem" }}
                            >
                              (Opcional)
                            </span>
                          </p>
                          <div>
                            <MyLongText
                              name="q3"
                              rows={mobile ? 3 : 2}
                              style={{ width: "100%", marginTop: "0.5rem" }}
                            />
                          </div>
                        </Grid>
                      </Grid>
                      <Grid
                        style={
                          mobile
                            ? { marginTop: "1rem" }
                            : { padding: "1rem 0 0 1rem" }
                        }
                      >
                        <Grid item xs={12}>
                          <p className="afil-faq-pregunta-p">
                            ¿Tiene exclusividad con algún fotógrafo?{" "}
                            <span
                              style={{ color: "#a9a9a9", fontSize: "0.7rem" }}
                            >
                              (Opcional)
                            </span>
                          </p>
                          <div>
                            <MyLongText
                              name="q4"
                              rows={mobile ? 3 : 2}
                              style={{ width: "100%", marginTop: "0.5rem" }}
                            />
                          </div>
                        </Grid>
                      </Grid>
                      <Grid
                        style={
                          mobile
                            ? { marginTop: "1rem" }
                            : { padding: "1rem 0 0 1rem" }
                        }
                      >
                        <Grid item xs={12}>
                          <p className="afil-faq-pregunta-p">
                            ¿Tiene exclusividad con algún grupo musical?{" "}
                            <span
                              style={{ color: "#a9a9a9", fontSize: "0.7rem" }}
                            >
                              (Opcional)
                            </span>
                          </p>
                          <div>
                            <MyLongText
                              name="q5"
                              rows={mobile ? 3 : 2}
                              style={{ width: "100%", marginTop: "0.5rem" }}
                            />
                          </div>
                        </Grid>
                      </Grid>
                      <Grid
                        style={
                          mobile
                            ? { marginTop: "1rem" }
                            : { padding: "1rem 0 0 1rem" }
                        }
                      >
                        <Grid item xs={12}>
                          <p className="afil-faq-pregunta-p">
                            ¿Tiene exclusividad con algún banquete?{" "}
                            <span
                              style={{ color: "#a9a9a9", fontSize: "0.7rem" }}
                            >
                              (Opcional)
                            </span>
                          </p>
                          <div>
                            <MyLongText
                              name="q6"
                              rows={mobile ? 3 : 2}
                              style={{ width: "100%", marginTop: "0.5rem" }}
                            />
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  ) : (
                    <div style={{ marginTop: "2rem" }}>
                      <Grid
                        style={
                          mobile
                            ? { marginTop: "0.3rem" }
                            : { padding: "0.3rem 0 0 1rem" }
                        }
                      >
                        <Grid item xs={12}>
                          <p className="afil-faq-pregunta-p">
                            ¿Se requiere de algún material o condiciones
                            específicas para poder ofrecer sus servicios?{" "}
                            <span
                              style={{ color: "#a9a9a9", fontSize: "0.7rem" }}
                            >
                              (Opcional)
                            </span>
                          </p>
                          <div>
                            <MyLongText
                              name="q1"
                              rows={mobile ? 3 : 2}
                              style={{ width: "100%", marginTop: "0.5rem" }}
                            />
                          </div>
                        </Grid>
                      </Grid>
                      <Grid
                        style={
                          mobile
                            ? { marginTop: "1rem" }
                            : { padding: "1rem 0 0 1rem" }
                        }
                      >
                        <Grid item xs={12}>
                          <p className="afil-faq-pregunta-p">
                            ¿Hay algún costo extra por desplazamiento?{" "}
                            <span
                              style={{ color: "#a9a9a9", fontSize: "0.7rem" }}
                            >
                              (Opcional)
                            </span>
                          </p>
                          <div>
                            <MyLongText
                              name="q2"
                              rows={mobile ? 3 : 2}
                              style={{ width: "100%", marginTop: "0.5rem" }}
                            />
                          </div>
                        </Grid>
                      </Grid>
                      <Grid
                        style={
                          mobile
                            ? { marginTop: "1rem" }
                            : { padding: "1rem 0 0 1rem" }
                        }
                      >
                        <Grid item xs={12}>
                          <p className="afil-faq-pregunta-p">
                            ¿Cuánto tiempo dura el servicio?{" "}
                            <span
                              style={{ color: "#a9a9a9", fontSize: "0.7rem" }}
                            >
                              (Opcional)
                            </span>
                          </p>
                          <div>
                            <MyLongText
                              name="q3"
                              rows={mobile ? 3 : 2}
                              style={{ width: "100%", marginTop: "0.5rem" }}
                            />
                          </div>
                        </Grid>
                      </Grid>
                      <Grid
                        style={
                          mobile
                            ? { marginTop: "1rem" }
                            : { padding: "1rem 0 0 1rem" }
                        }
                      >
                        <Grid item xs={12}>
                          <p className="afil-faq-pregunta-p">
                            ¿Cobra por horas o por evento?{" "}
                            <span
                              style={{ color: "#a9a9a9", fontSize: "0.7rem" }}
                            >
                              (Opcional)
                            </span>
                          </p>
                          <div>
                            <MyLongText
                              name="q4"
                              rows={mobile ? 3 : 2}
                              style={{ width: "100%", marginTop: "0.5rem" }}
                            />
                          </div>
                        </Grid>
                      </Grid>
                      <Grid
                        style={
                          mobile
                            ? { marginTop: "1rem" }
                            : { padding: "1rem 0 0 1rem" }
                        }
                      >
                        <Grid item xs={12}>
                          <p className="afil-faq-pregunta-p">
                            ¿Hay posibilidad de pagar por horas extras?{" "}
                            <span
                              style={{ color: "#a9a9a9", fontSize: "0.7rem" }}
                            >
                              (Opcional)
                            </span>
                          </p>
                          <div>
                            <MyLongText
                              name="q5"
                              rows={mobile ? 3 : 2}
                              style={{ width: "100%", marginTop: "0.5rem" }}
                            />
                          </div>
                        </Grid>
                      </Grid>
                      <Grid
                        style={
                          mobile
                            ? { marginTop: "1rem" }
                            : { padding: "1rem 0 0 1rem" }
                        }
                      >
                        <Grid item xs={12}>
                          <p className="afil-faq-pregunta-p">
                            ¿En que Estados de México trabajan?{" "}
                            <span
                              style={{ color: "#a9a9a9", fontSize: "0.7rem" }}
                            >
                              (Opcional)
                            </span>
                          </p>
                          <div>
                            <MyLongText
                              name="q6"
                              rows={mobile ? 3 : 2}
                              style={{ width: "100%", marginTop: "0.5rem" }}
                            />
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  )}
                  {isEdition ? (
                    <div
                      style={
                        mobile
                          ? {
                              width: "100%",
                              textAlign: "center",
                              marginTop: "1.5rem",
                            }
                          : {
                              width: "100%",
                              textAlign: "right",
                              marginTop: "1.5rem",
                            }
                      }
                    >
                      <Button
                        className={buttonTypes.cancelButton}
                        style={mobile ? { width: "100%" } : { width: "30%" }}
                        onClick={() =>
                          navigate.push(
                            isMainPage ? "?paso=3" : "/mis-negocios"
                          )
                        }
                      >
                        {isMainPage ? "Regresar" : "Cancelar"}
                      </Button>
                      <Button
                        type="submit"
                        className={buttonTypes.saveButton}
                        style={
                          mobile
                            ? { width: "100%", marginTop: "1.5rem" }
                            : { width: "30%", marginLeft: "1.5rem" }
                        }
                      >
                        {isMainPage
                          ? "Guardar cambios y continuar"
                          : "Guardar cambios"}
                      </Button>
                    </div>
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        textAlign: "center",
                        marginTop: "1rem",
                      }}
                    >
                      <Button
                        className={buttonTypes.cancelButton}
                        style={
                          mobile
                            ? {
                                width: "100%",
                                marginTop: "1.5rem",
                              }
                            : {
                                width: "30%",
                                marginRight: "1rem",
                                marginTop: "1.5rem",
                              }
                        }
                        onClick={() => navigate.push("?paso=3")}
                      >
                        Regresar
                      </Button>

                      <Button
                        type="submit"
                        className={buttonTypes.button}
                        style={
                          mobile
                            ? { width: "100%", marginTop: "1rem" }
                            : { width: "30%", marginTop: "1.5rem" }
                        }
                      >
                        Continuar
                      </Button>
                    </div>
                  )}
                </FormikForm>
              </Formik>
            </div>
          )}
        </>
      )}
    </div>
  );
}

PasoFAQ.propTypes = {
  setStep: PropTypes.func.isRequired,
  idAliado: PropTypes.number.isRequired,
  isTerraza: PropTypes.bool.isRequired,
  setIsSelected: PropTypes.func,
  dataSecundaria: PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.number,
      aliado: PropTypes.number,
      capacidad: PropTypes.string,
      descripcion: PropTypes.string,
      servicios: PropTypes.string,
      espacios: PropTypes.string,
      direccion: PropTypes.string,
      alcohol: PropTypes.number,
      eventosDia: PropTypes.number,
      eventosNoche: PropTypes.number,
      estacionamiento: PropTypes.number,
      alberca: PropTypes.number,
      q1: PropTypes.string,
      q2: PropTypes.string,
      q3: PropTypes.string,
      q4: PropTypes.string,
      q5: PropTypes.string,
      q6: PropTypes.string,
    }),
    PropTypes.shape({
      id: PropTypes.number,
      aliado: PropTypes.number,
      descripcion: PropTypes.string,
      servicios: PropTypes.string,
      experiencia: PropTypes.string,
      dondeOfrecen: PropTypes.string,
      q1: PropTypes.string,
      q2: PropTypes.string,
      q3: PropTypes.string,
      q4: PropTypes.string,
      q5: PropTypes.string,
      q6: PropTypes.string,
    }),
  ]),
  isEdition: PropTypes.bool,
  isCollapsible: PropTypes.bool,
  isMainPage: PropTypes.bool,
  isSelected: PropTypes.bool,
};

PasoFAQ.defaultProps = {
  setIsSelected: () => null,
  isEdition: false,
  isCollapsible: false,
  isMainPage: false,
  isSelected: false,
  dataPrincipal: null,
  dataSecundaria: null,
};
