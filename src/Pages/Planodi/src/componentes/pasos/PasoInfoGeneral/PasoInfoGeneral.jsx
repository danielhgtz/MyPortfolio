import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Formik } from "formik";
import * as Yup from "yup";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import ErrorMsg from "../../ErrorMsg";
import FormInfoGeneralTerraza from "./FormInfoGeneralTerrazas";
import FormInfoGeneralProveedores from "./FormInfoGeneralProveedores";
import Loading from "../../Loading/Loading";
import axios from "axios";
import { userHeaders } from "../../../Utils/headerSetter";
import PropTypes from "prop-types";

const validationSchemaTerraza = Yup.object({
  capacidad: Yup.number()
    .typeError("Se debe ingresar un número")
    .required("Este campo es requerido para continuar")
    .min(0, "Tiene que ser un número positivo."),
  capacidad2: Yup.number()
    .typeError("Se debe ingresar un número")
    .required("Este campo es requerido para continuar")
    .moreThan(Yup.ref("capacidad"), "Ingresa una cantidad mayor"),
  descripcion: Yup.string()
    .required("Este campo es requerido para continuar")
    .min(100, "La langitud mínima son 100 caracteres.")
    .max(990, "No debe exceder los 990 caracteres."),
  servicios: Yup.string()
    .required("Este campo es requerido para continuar")
    // .min(50, 'La langitud mínima son 50 caracteres.')
    .max(990, "No debe exceder los 990 caracteres."),
  espacios: Yup.string()
    .required("Este campo es requerido para continuar")
    // .min(50, 'La langitud mínima son 50 caracteres.')
    .max(990, "No debe exceder los 990 caracteres."),
  direccion: Yup.string()
    .required("Este campo es requerido para continuar")
    .max(190, "La dirección no debe exceder los 190 caracteres."),
  alcohol: Yup.bool(),
  eventosDia: Yup.bool(),
  eventosNoche: Yup.bool(),
  estacionamiento: Yup.bool(),
  alberca: Yup.bool(),
});

const validationSchemaProveedor = Yup.object({
  descripcion: Yup.string()
    .required("Este campo es requerido para continuar")
    .min(100, "La langitud mínima son 100 caracteres.")
    .max(990, "No debe exceder los 990 caracteres."),
  servicios: Yup.string()
    .required("Este campo es requerido para continuar")
    .max(990, "No debe exceder los 990 caracteres."),
  experiencia: Yup.string()
    .required("Este campo es requerido para continuar")
    .max(990, "No debe exceder los 990 caracteres."),
  dondeOfrecen: Yup.string()
    .required("Este campo es requerido para continuar")
    .max(990, "No debe exceder los 990 caracteres."),
});

const validationSchemaTerrazaADMIN = Yup.object({
  capacidad: Yup.number()
    .typeError("Se debe ingresar un número")
    .min(0, "Tiene que ser un número positivo."),
  capacidad2: Yup.number()
    .typeError("Se debe ingresar un número")
    .moreThan(Yup.ref("capacidad"), "Ingresa una cantidad mayor"),
  descripcion: Yup.string().max(990, "No debe exceder los 990 caracteres."),
  servicios: Yup.string().max(990, "No debe exceder los 990 caracteres."),
  espacios: Yup.string().max(990, "No debe exceder los 990 caracteres."),
  direccion: Yup.string().max(
    190,
    "La dirección no debe exceder los 190 caracteres."
  ),
  alcohol: Yup.bool(),
  eventosDia: Yup.bool(),
  eventosNoche: Yup.bool(),
  estacionamiento: Yup.bool(),
  alberca: Yup.bool(),
});

const validationSchemaProveedorADMIN = Yup.object({
  descripcion: Yup.string().max(990, "No debe exceder los 990 caracteres."),
  servicios: Yup.string().max(990, "No debe exceder los 990 caracteres."),
  experiencia: Yup.string().max(990, "No debe exceder los 990 caracteres."),
  dondeOfrecen: Yup.string().max(990, "No debe exceder los 990 caracteres."),
});

export default function PasoInfoGeneral({
  isTerraza,
  setStep,
  idAliado,
  dataSecundaria,
  isEdition,
  isCollapsible,
  isMainPage,
  isSelected,
  setIsSelected,
  isAdminPage,
  backAdminPage,
  submitStepAdmin,
}) {
  const [error, setError] = useState(false);
  const [loadign, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(
    "Error desconocido en el servidor, intetnalo más tarde"
  );
  const [collapse, setCollapse] = useState(!isSelected);

  const movil = useMediaQuery("(max-width:960px)");

  useEffect(() => {
    if (isCollapsible && !isSelected) setCollapse(true);
  }, [isCollapsible, isSelected]);

  const initialValuesTerraza = {
    capacidad: isEdition ? dataSecundaria?.capacidad?.split("-")[0] : "",
    capacidad2: isEdition ? dataSecundaria?.capacidad?.split("-")[1] : "",
    descripcion: isEdition ? dataSecundaria?.descripcion : "",
    servicios: isEdition ? dataSecundaria?.servicios : "",
    espacios: isEdition ? dataSecundaria?.espacios : "",
    direccion: isEdition ? dataSecundaria?.direccion : "",
    alcohol: isEdition ? dataSecundaria?.alcohol : false,
    eventosDia: isEdition ? dataSecundaria?.eventosDia : false,
    eventosNoche: isEdition ? dataSecundaria?.eventosNoche : false,
    estacionamiento: isEdition ? dataSecundaria?.estacionamiento : false,
    alberca: isEdition ? dataSecundaria?.alberca : false,
  };

  const initialValuesProveedor = {
    descripcion: isEdition ? dataSecundaria?.descripcion : "",
    servicios: isEdition ? dataSecundaria?.servicios : "",
    experiencia: isEdition ? dataSecundaria?.experiencia : "",
    dondeOfrecen: isEdition ? dataSecundaria?.dondeOfrecen : "",
  };

  const onSubmitTerraza = ({
    capacidad,
    capacidad2,
    descripcion,
    servicios,
    espacios,
    direccion,
    alcohol,
    eventosDia,
    eventosNoche,
    estacionamiento,
    alberca,
  }) => {
    const capacidadRango = `${capacidad}-${capacidad2}`;
    setLoading(true);
    axios
      .post(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }user/guardarPaso3Terraza`,
        {
          idAliado,
          isEdition,
          tablaTerraza: {
            capacidad: capacidadRango,
            descripcion,
            servicios,
            espacios,
            direccion,
            alcohol,
            eventosDia,
            eventosNoche,
            estacionamiento,
            alberca,
          },
        },
        userHeaders(false)
      )
      .then(() => {
        setLoading(false);
        setStep(3);
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

  const onSubmitProveedor = ({
    descripcion,
    servicios,
    experiencia,
    dondeOfrecen,
  }) => {
    setLoading(true);
    axios
      .post(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }user/guardarPaso3Proveedor`,
        {
          idAliado,
          isEdition,
          tablaProveedor: {
            servicios,
            descripcion,
            experiencia,
            dondeOfrecen,
          },
        },
        userHeaders(false)
      )
      .then(() => {
        setLoading(false);
        setStep(3);
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

  const onSubmitAdmin = (data) => {
    submitStepAdmin(2, data);
  };

  const getValidationSchema = () => {
    if (isAdminPage) {
      if (isTerraza) {
        return validationSchemaTerrazaADMIN;
      } else {
        return validationSchemaProveedorADMIN;
      }
    } else {
      if (isTerraza) {
        return validationSchemaTerraza;
      } else {
        return validationSchemaProveedor;
      }
    }
  };

  return (
    <div>
      {loadign ? (
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
        <>
          {error ? <ErrorMsg setError={setError} errorMsg={errorMsg} /> : null}
          <p
            className={isEdition ? "url-txt-instruc-ed-neg" : "url-txt-instruc"}
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (collapse) setIsSelected(4);
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
            Cuéntanos más sobre tu negocio
          </p>

          {(!collapse || !isCollapsible) && (
            <>
              {!isEdition && (
                <p
                  className="url-txt-instruc2"
                  style={
                    movil && isCollapsible
                      ? { textAlign: "left" }
                      : movil
                      ? {}
                      : { marginLeft: "10px" }
                  }
                >
                  Esta información será la que tus clientes verán, intenta ser
                  los más descriptivo posible, convence a los usuarios que eres
                  la mejor opción.
                </p>
              )}

              <Grid>
                <Grid item xs={12}>
                  <Formik
                    initialValues={
                      isTerraza ? initialValuesTerraza : initialValuesProveedor
                    }
                    onSubmit={
                      isAdminPage
                        ? onSubmitAdmin
                        : isTerraza
                        ? onSubmitTerraza
                        : onSubmitProveedor
                    }
                    validationSchema={() => getValidationSchema()}
                    component={({ values, errors }) =>
                      isTerraza ? (
                        <FormInfoGeneralTerraza
                          errors={errors}
                          isEdition={isEdition}
                          isMainPage={isMainPage}
                          isAdminPage={isAdminPage}
                          backAdminPage={backAdminPage}
                        />
                      ) : (
                        <FormInfoGeneralProveedores
                          errors={errors}
                          isEdition={isEdition}
                          isMainPage={isMainPage}
                          isAdminPage={isAdminPage}
                          backAdminPage={backAdminPage}
                        />
                      )
                    }
                  />
                </Grid>
              </Grid>
            </>
          )}
        </>
      )}
    </div>
  );
}

PasoInfoGeneral.propTypes = {
  setStep: PropTypes.func.isRequired,
  idAliado: PropTypes.number,
  isTerraza: PropTypes.bool.isRequired,
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
  isAdminPage: PropTypes.bool,
  setIsSelected: PropTypes.func,
  backAdminPage: PropTypes.func,
  submitStepAdmin: PropTypes.func,
};

PasoInfoGeneral.defaultProps = {
  setIsSelected: () => null,
  submitStepAdmin: () => null,
  backAdminPage: () => null,
  isEdition: false,
  isCollapsible: false,
  isMainPage: false,
  dataSecundaria: null,
  isSelected: false,
  isAdminPage: false,
  idAliado: null,
};
