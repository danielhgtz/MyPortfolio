/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

import "./PasoTypeOfEvents.css";
import { userHeaders } from "../../../Utils/headerSetter";
import Loading from "../../Loading/Loading";
import Button from "@material-ui/core/Button";
import { botonesAtrasYAdelante } from "../PasoForm";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ErrorMsg from "../../ErrorMsg";
import PropTypes from "prop-types";

export default function PasoTypeOfEvents({
  setStep,
  idAliado,
  isEdition,
  isCollapsible,
  eventosActivos,
  isMainPage,
  isSelected,
  setIsSelected,
  isAdminPage,
  backAdminPage,
  submitStepAdmin,
}) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(
    "Error desconocido en el servidor, intetnalo más tarde"
  );
  const [infoEventos, setInfoEventos] = useState([
    { name: "", id: 0, imgUrl: "", status: false },
  ]);
  const [collapse, setCollapse] = useState(!isSelected);

  const buttonTypes = botonesAtrasYAdelante();
  const mobile = useMediaQuery("(max-width:960px)");

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
        }user/getTypeOfEvents`,
        userHeaders(false)
      )
      .then((res) => {
        let { data } = res;
        if (isEdition && eventosActivos.length) {
          data = data.map((item) => {
            return { ...item, status: eventosActivos.includes(item.id) };
          });
        } else {
          data = data.map((item) => {
            return { ...item, status: false };
          });
        }
        setInfoEventos(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const updateStatusEvents = (idx) => {
    infoEventos[idx].status = !infoEventos[idx].status;
    setInfoEventos([...infoEventos]);
  };

  const nextStep = () => {
    const selectedEvents = infoEventos.filter((item) => item.status === true);
    if (selectedEvents.length > 0) {
      if (isAdminPage) {
        submitStepAdmin(3, selectedEvents);
        return;
      }
      setLoading(true);
      axios
        .post(
          `${
            process.env.REACT_APP_ENV === "development"
              ? process.env.REACT_APP_API_LOCAL
              : process.env.REACT_APP_API_PROD
          }user/setTypesOfEvents`,
          {
            selectedEvents,
            idAliado,
            isEdition,
          },
          userHeaders()
        )
        .then(() => {
          setLoading(false);
          setStep(4);
        })
        .catch((e) => {
          const { response } = e;
          if (response && response.data && response.data.msg) {
            if (response.data.msg) setErrorMsg(response.data.msg);
          }
          setError(true);
          setLoading(false);
        });
    } else {
      setErrorMsg("Tienes que seleccionar al menos 1 tipo de evento.");
      setError(true);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        marginBottom: "1rem",
      }}
    >
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
          {error ? <ErrorMsg setError={setError} errorMsg={errorMsg} /> : null}
          <p
            className={isEdition ? "url-txt-instruc-ed-neg" : "url-txt-instruc"}
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (collapse) setIsSelected(5);
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
            Tipos de eventos
          </p>

          {(!collapse || !isCollapsible) && (
            <>
              <p
                className="url-txt-instruc2"
                style={
                  isCollapsible ? { textAlign: "left" } : { marginLeft: "10px" }
                }
              >
                Da click al menos a un tipo de evento en los que se puede
                ofrecer tu servicio.
              </p>
              <div className="wrap-types-of-events">
                {infoEventos.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`types-of-events-box ${
                      item.status ? "active" : null
                    }`}
                    onClick={() => {
                      updateStatusEvents(idx);
                    }}
                  >
                    <p>{item.name}</p>
                    <img
                      src={item.imgUrl}
                      alt={item.name}
                      style={{
                        width: "100px",
                        position: "absolute",
                        right: "0",
                        bottom: "-3px",
                      }}
                    />
                  </div>
                ))}
              </div>
              {isEdition ? (
                <div
                  style={
                    mobile
                      ? {
                          width: "100%",
                          textAlign: "center",
                          marginTop: "1rem",
                        }
                      : { width: "100%", textAlign: "right", marginTop: "1rem" }
                  }
                >
                  <Button
                    className={buttonTypes.cancelButton}
                    style={mobile ? { width: "100%" } : { width: "30%" }}
                    onClick={() =>
                      navigate.push(isMainPage ? "?paso=2" : "/mis-negocios")
                    }
                  >
                    {isMainPage ? "Regresar" : "Cancelar"}
                  </Button>
                  <Button
                    className={buttonTypes.saveButton}
                    style={
                      mobile
                        ? { width: "100%", marginTop: "1.5rem" }
                        : { width: "30%", marginLeft: "1.5rem" }
                    }
                    onClick={nextStep}
                  >
                    {isMainPage
                      ? "Guardar cambios y continuar"
                      : "Guardar cambios"}
                  </Button>
                  {error ? (
                    <p
                      style={{
                        color: "#f44336",
                        fontFamily: "Roboto",
                        marginTop: "0.5rem",
                        fontSize: "14px",
                      }}
                    >
                      Tienes que seleccionar al menos 1 tipo de evento.
                    </p>
                  ) : null}
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
                        ? { width: "100%", marginBottom: "1rem" }
                        : { width: "30%", marginRight: "1rem" }
                    }
                    onClick={() => {
                      if (isAdminPage) {
                        backAdminPage();
                      } else {
                        navigate.push("?paso=2");
                      }
                    }}
                  >
                    Regresar
                  </Button>

                  <Button
                    className={buttonTypes.button}
                    style={mobile ? { width: "100%" } : { width: "30%" }}
                    onClick={nextStep}
                  >
                    Continuar
                  </Button>
                  {error ? (
                    <p
                      style={{
                        color: "#f44336",
                        fontFamily: "Roboto",
                        marginTop: "0.5rem",
                        fontSize: "14px",
                      }}
                    >
                      Tienes que seleccionar al menos 1 tipo de evento.
                    </p>
                  ) : null}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

PasoTypeOfEvents.propTypes = {
  setStep: PropTypes.func.isRequired,
  idAliado: PropTypes.number.isRequired,
  isEdition: PropTypes.bool,
  isCollapsible: PropTypes.bool,
  isMainPage: PropTypes.bool,
  isSelected: PropTypes.bool,
  setIsSelected: PropTypes.func,
  eventosActivos: PropTypes.arrayOf(PropTypes.number),
  isAdminPage: PropTypes.bool,
  backAdminPage: PropTypes.func,
  submitStepAdmin: PropTypes.func,
};

PasoTypeOfEvents.defaultProps = {
  submitStepAdmin: () => null,
  backAdminPage: () => null,
  setIsSelected: () => null,
  isEdition: false,
  isCollapsible: false,
  isAdminPage: false,
  isMainPage: false,
  isSelected: false,
  eventosActivos: [],
};
