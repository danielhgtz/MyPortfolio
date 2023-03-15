import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

import { userHeaders } from "../../../Utils/headerSetter";
import Loading from "../../Loading/Loading";
import FormCategoria from "./FormCategoria";
import ErrorMsg from "../../ErrorMsg";
import PropTypes from "prop-types";

const validationSchema = Yup.object({
  nombre: Yup.string().required("Este campo es requerido"),
  estado: Yup.number()
    .min(0, "Selecciona una opción válida")
    .required("Este campo es requerido para continuar"),
  ciudad: Yup.number(),
  whatsapp: Yup.string()
    .required("Este campo es requerido")
    .test(
      "whatsapp",
      "El teléfono tiene que ser de 10 dígitos y no se debe ingresar la lada +52",
      (value) => {
        if (!value) return false;
        if (value.substring(0, 2) === "+5") return false;
        if (value.substring(0, 2) === "52") return false;
        return /^\d{10}$/.test(value);
      }
    ),
  tags: Yup.string(),
  categoria: Yup.number()
    .min(0, "Selecciona una opción válida")
    .required("Este campo es requerido para continuar"),
});

export default function PasoCategoria({
  setStep,
  userID,
  setIsTerraza,
  setIdAliado,
  isEdition,
  dataPrincipal,
  isCollapsible,
  isTerraza,
  isSelected,
  isMainPage,
  setIsSelected,
  isAdminPage,
  submitStepAdmin,
}) {
  const [tags, setTags] = useState([]);
  const [estados, setEstados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(false);
  const [loadign, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(
    "Error desconocido, inténtalo más tarde"
  );
  const [collapse, setCollapse] = useState(!isSelected);

  const initialValues = {
    nombre: isEdition ? dataPrincipal?.nombre : "",
    estado: isEdition
      ? dataPrincipal?.estadoId?.toString()?.length === 1
        ? `0${dataPrincipal.estadoId.toString()}`
        : dataPrincipal.estadoId.toString()
      : "-1",
    ciudad: isEdition && dataPrincipal?.ciudad ? dataPrincipal?.ciudadId : "-1",
    ciudadSelected:
      isEdition && dataPrincipal?.ciudad ? dataPrincipal?.ciudad : "",
    whatsapp: isEdition ? dataPrincipal?.whatsapp : "",
    tags: "",
    currentTags: isEdition ? dataPrincipal?.tags : "",
    categoria: isEdition ? dataPrincipal?.tipo : "-1",
  };

  useEffect(() => {
    if (isCollapsible && !isSelected) setCollapse(true);
  }, [isCollapsible, isSelected]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }user/getForm1Info`,
        userHeaders(false)
      )
      .then((res) => {
        const { estados, categorias } = res.data;
        setEstados(estados);
        setCategorias(categorias);
        setLoading(false);
      })
      .catch((e) => {
        const { response } = e;
        if (response && response.data && response.data.msg) {
          if (response.data.msg) setErrorMsg(response.data.msg);
        }
        setError(true);
        setLoading(false);
      });
  }, []);

  const comenzarDeNuevo = () => {
    setLoading(true);
    axios
      .post(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }user/deleteAliadoEmpezado`,
        {
          idAliado: dataPrincipal ? dataPrincipal.id : null,
        },
        userHeaders()
      )
      .then(() => {
        window.location.reload();
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

  const userRegistered = (data) => {
    setLoading(true);
    const {
      categoria,
      estado,
      nombre,
      whatsapp,
      ciudad,
      ciudadSelected,
    } = data;
    axios
      .post(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }user/guardarPasoCategoria`,
        {
          id: userID,
          aliadoId: dataPrincipal ? dataPrincipal.id : null,
          categoria,
          estado,
          nombre,
          whatsapp,
          tags: `${tags.length ? `${tags.toString()},*,` : ""}${nombre},${
            estados.filter((item) => {
              return parseInt(item.id) === parseInt(estado);
            })[0].estado
          },${
            categorias.filter((item) => {
              return item.id === parseInt(categoria);
            })[0].name
          }${ciudad === "-1" ? "" : `,${ciudadSelected}`}`,
          ciudad: ciudad === "-1" ? 0 : parseInt(ciudad),
        },
        userHeaders(false)
      )
      .then((res) => {
        const { idAliado } = res.data;
        setIsTerraza(categoria === "3");
        setIdAliado(idAliado);
        setLoading(false);
        setStep(2);
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

  const adminRegistered = (data) => {
    const { categoria, estado, nombre, ciudad, ciudadSelected } = data;
    submitStepAdmin(1, {
      ...data,
      tags: `${tags.length ? `${tags.toString()},*,` : ""}${nombre},${
        estados.filter((item) => {
          return parseInt(item.id) === parseInt(estado);
        })[0].estado
      },${
        categorias.filter((item) => {
          return item.id === parseInt(categoria);
        })[0].name
      }${ciudad === "-1" ? "" : `,${ciudadSelected}`}`,
    });
  };

  return (
    <div
      style={
        isEdition
          ? { display: "flex", width: "100%" }
          : { display: "flex", width: "100%", marginBottom: "2rem" }
      }
    >
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
        <div style={{ width: "100%" }}>
          {error ? <ErrorMsg setError={setError} errorMsg={errorMsg} /> : null}
          <p
            className={isEdition ? "url-txt-instruc-ed-neg" : "url-txt-instruc"}
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (collapse) setIsSelected(0);
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
            Información general
          </p>

          {(!collapse || !isCollapsible) && (
            <div>
              <Formik
                initialValues={initialValues}
                onSubmit={isAdminPage ? adminRegistered : userRegistered}
                validationSchema={validationSchema}
                component={({ values, setFieldValue }) => (
                  <FormCategoria
                    isEdition={isEdition}
                    values={values}
                    setFieldValue={setFieldValue}
                    categorias={categorias}
                    estados={estados}
                    setTags={setTags}
                    tags={tags}
                    isTerraza={isTerraza}
                    isMainPage={isMainPage}
                    comenzarDeNuevo={comenzarDeNuevo}
                    isAdminPage={isAdminPage}
                  />
                )}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

PasoCategoria.propTypes = {
  setStep: PropTypes.func,
  userID: PropTypes.number,
  isEdition: PropTypes.bool,
  setIsTerraza: PropTypes.func,
  setIdAliado: PropTypes.func,
  setIsSelected: PropTypes.func,
  submitStepAdmin: PropTypes.func,
  dataPrincipal: PropTypes.shape({
    id: PropTypes.number,
    usuario: PropTypes.number,
    tipo: PropTypes.number,
    category: PropTypes.string,
    membresia: PropTypes.number,
    nombre: PropTypes.string,
    whatsapp: PropTypes.string,
    estadoId: PropTypes.number,
    estado: PropTypes.string,
    tags: PropTypes.string,
    ciudadId: PropTypes.number,
    ciudad: PropTypes.string,
    verificado: PropTypes.number,
  }),
  isCollapsible: PropTypes.bool,
  isTerraza: PropTypes.bool,
  isMainPage: PropTypes.bool,
  isSelected: PropTypes.bool,
  isAdminPage: PropTypes.bool,
};

PasoCategoria.defaultProps = {
  setStep: () => null,
  setIsTerraza: () => null,
  setIdAliado: () => null,
  setIsSelected: () => null,
  submitStepAdmin: () => null,
  isEdition: false,
  isCollapsible: false,
  isTerraza: false,
  dataPrincipal: null,
  isMainPage: false,
  isSelected: false,
  isAdminPage: false,
  userID: null,
};
