/* eslint-disable no-unused-vars */
import "./PasoSelectPlan.css";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { VscCheck } from "react-icons/vsc";
import Button from "@material-ui/core/Button";
import axios from "axios";

import { botonesAtrasYAdelante } from "../PasoForm";
import { userHeaders } from "../../../Utils/headerSetter";
import Loading from "../../Loading/Loading";

export const Plan = {
  gratis: 1,
  premium: 2,
};

export default function PasoSelectPlan({
  setStep,
  setPremium,
  idAliado,
  setInfoPlan,
  isEdition = false,
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const movil = useMediaQuery("(max-width:960px)");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(
    "Error desconocido en el servidor, intetnalo más tarde"
  );
  const [plans, setPlans] = useState([]);
  const [freePlan, setFreePlan] = useState({ precioAnual: null });
  const [premiumPlan, setPremiumPlan] = useState({ precioAnual: null });
  const classes = botonesAtrasYAdelante();
  const mobile = useMediaQuery("(max-width:960px)");

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }user/getMembresias`,
        userHeaders(false)
      )
      .then((res) => {
        const { membresias } = res.data;
        setPlans(membresias);
        setFreePlan(membresias.filter((item) => item.id === Plan.gratis)[0]);
        setPremiumPlan(
          membresias.filter((item) => item.id === Plan.premium)[0]
        );
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

  const handleSelectPlan = async (idMembresia) => {
    setLoading(true);
    axios
      .post(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }user/setMembresia`,
        { idMembresia, idAliado, isEdition },
        userHeaders()
      )
      .then(() => {
        setLoading(false);
        setInfoPlan(plans.filter((item) => item.id === idMembresia)[0]);
        setPremium(idMembresia === Plan.premium);
        setStep(6);
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

  return (
    <div className="div-wrapper-sel-plan">
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
        <>
          <div className="div-wrapper-plans">
            <p className="url-txt-instruc">Selecciona tu plan</p>
            <p className="url-txt-instruc2">
              Da click en la opción que mejor se adapte a tus necesidades
            </p>
            {mobile ? (
              <>
                <div className="plan-selection-box active">
                  <p style={{ margin: 0 }}>Plan Plus</p>
                  <p
                    style={{
                      fontWeight: 300,
                      fontSize: "0.8rem",
                      marginLeft: "3px",
                    }}
                  >
                    <span style={{ textDecoration: "line-through" }}>
                      Solo ${premiumPlan.precioAnual} MXN al año
                    </span>
                    <span
                      style={{
                        fontWeight: 500,
                        marginLeft: "0.5rem",
                        fontSize: "1.1rem",
                        background: "red",
                        color: "white",
                        padding: "3px",
                        borderRadius: "5px",
                      }}
                    >
                      GRATIS
                    </span>
                  </p>
                  <p
                    style={{
                      fontWeight: 500,
                      fontSize: "0.8rem",
                      margin: "0 0 1rem 3px",
                    }}
                  >
                    $0 MXN y sin tarjeta por tiempo limitado
                  </p>
                  <div>
                    <p className="afil-sel-beneficios-p">
                      <span>
                        <VscCheck style={{ marginRight: "10px" }} />
                      </span>
                      Aparece primero en las búsquedas
                    </p>
                    <p className="afil-sel-beneficios-p">
                      <span>
                        <VscCheck style={{ marginRight: "10px" }} />
                      </span>
                      Paquetes ilimitados
                    </p>
                    <p className="afil-sel-beneficios-p">
                      <span>
                        <VscCheck style={{ marginRight: "10px" }} />
                      </span>
                      Fotos ilimitadas
                    </p>
                    <p className="afil-sel-beneficios-p">
                      <span>
                        <VscCheck style={{ marginRight: "10px" }} />
                      </span>
                      Aparece primero en las búsquedas
                    </p>
                    <p className="afil-sel-beneficios-p">
                      <span>
                        <VscCheck style={{ marginRight: "10px" }} />
                      </span>
                      Aparece en destacados
                    </p>
                    <p className="afil-sel-beneficios-p">
                      <span>
                        <VscCheck style={{ marginRight: "10px" }} />
                      </span>
                      Por apertura: tu negocio quedará registrado como VIP para
                      siempre. Esto te brindará beneficios únicos en un futuro.
                    </p>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      textAlign: "center",
                      marginTop: "2rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {isEdition ? (
                      <div
                        style={{
                          width: "100%",
                          textAlign: "center",
                          marginTop: "1.5rem",
                        }}
                      >
                        <Button
                          className={classes.cancelButton}
                          style={{ width: "100%" }}
                          onClick={() => navigate.push("?paso=4")}
                        >
                          Regresar
                        </Button>
                        <Button
                          onClick={() => handleSelectPlan(Plan.premium)}
                          className={classes.saveButton}
                          style={{ width: "100%", marginTop: "1.5rem" }}
                        >
                          Guardar cambios y continuar
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
                          className={classes.cancelButton}
                          style={{ width: "100%", marginTop: "1rem" }}
                          onClick={() => navigate.push("?paso=4")}
                        >
                          Regresar
                        </Button>
                        <Button
                          onClick={() => handleSelectPlan(Plan.premium)}
                          className={classes.button}
                          style={{ width: "100%", marginTop: "1rem" }}
                        >
                          Continuar
                        </Button>
                      </div>
                    )}
                    {error ? (
                      <p
                        style={{
                          color: "#f44336",
                          fontFamily: "Roboto",
                          marginTop: "0.5rem",
                          fontSize: "14px",
                        }}
                      >
                        Tienes dar click en alguno de los 2 planes
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="plan-selection-box plan-gratis-selection">
                  <p>Plan gratuito</p>
                </div>
              </>
            ) : (
              <>
                <div className="plan-selection-box plan-gratis-selection">
                  <p>Plan gratuito</p>
                </div>
                <div className="plan-selection-box plan-plus-selection active">
                  <p style={{ margin: 0 }}>Plan Premium</p>
                  <p
                    style={{
                      fontWeight: 300,
                      fontSize: "0.8rem",
                      marginLeft: "3px",
                    }}
                  >
                    <span style={{ textDecoration: "line-through" }}>
                      Solo ${premiumPlan?.precioAnual} MXN al año
                    </span>
                    <span
                      style={{
                        fontWeight: 500,
                        marginLeft: "0.5rem",
                        fontSize: "1.1rem",
                        background: "red",
                        color: "white",
                        padding: "3px",
                        borderRadius: "5px",
                      }}
                    >
                      GRATIS
                    </span>
                  </p>
                </div>
              </>
            )}
          </div>
          {mobile ? null : (
            <div className="div-wrp-selected-plan-info">
              <div className="div-wrp-selected-plan-info-content">
                <div className="afil-sel-plan-titulo-info">
                  <p>Plan Premium</p>
                  <p
                    style={{
                      fontSize: "1.3rem",
                      textDecoration: "line-through",
                      margin: "0",
                    }}
                  >
                    $499 MXN
                  </p>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      margin: "0",
                    }}
                  >
                    $0 MXN y sin tarjeta por tiempo limitado
                  </span>
                </div>
                <div className="afil-sel-plan-contenido-info">
                  <p>
                    <span>
                      <VscCheck style={{ marginRight: "10px" }} />
                    </span>
                    Aparece primero en las búsquedas
                  </p>
                  <p>
                    <span>
                      <VscCheck style={{ marginRight: "10px" }} />
                    </span>
                    Paquetes ilimitados
                  </p>
                  <p>
                    <span>
                      <VscCheck style={{ marginRight: "10px" }} />
                    </span>
                    Fotos ilimitadas
                  </p>
                  <p>
                    <span>
                      <VscCheck style={{ marginRight: "10px" }} />
                    </span>
                    Aparece en destacados
                  </p>
                  <p>
                    <span>
                      <VscCheck style={{ marginRight: "10px" }} />
                    </span>
                    Opción de verificación de cuenta
                  </p>
                  <p>
                    <span>
                      <VscCheck style={{ marginRight: "10px" }} />
                    </span>
                    Por apertura: tu negocio quedará registrado como VIP para
                    siempre. Esto te brindará beneficios únicos en un futuro.
                  </p>
                </div>
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    marginTop: "2rem",
                    marginBottom: "2rem",
                  }}
                >
                  {isEdition ? (
                    <div
                      style={{
                        width: "100%",
                        textAlign: "center",
                        marginTop: "1.5rem",
                      }}
                    >
                      <Button
                        className={classes.cancelButton}
                        style={{ width: "80%" }}
                        onClick={() => navigate.push("?paso=4")}
                      >
                        Regresar
                      </Button>
                      <Button
                        onClick={() => handleSelectPlan(Plan.premium)}
                        className={classes.saveButton}
                        style={{ width: "80%", marginTop: "1.5rem" }}
                      >
                        Guardar cambios y continuar
                      </Button>
                    </div>
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      <Button
                        className={classes.cancelButton}
                        style={{ width: "80%", marginTop: "1rem" }}
                        onClick={() => navigate.push("?paso=4")}
                      >
                        Regresar
                      </Button>
                      <Button
                        onClick={() => handleSelectPlan(Plan.premium)}
                        className={classes.button}
                        style={{ width: "80%", marginTop: "1rem" }}
                      >
                        Continuar
                      </Button>
                    </div>
                  )}
                  {error ? (
                    <p
                      style={{
                        color: "#f44336",
                        fontFamily: "Roboto",
                        marginTop: "0.5rem",
                        fontSize: "14px",
                      }}
                    >
                      Tienes dar click en alguno de los 2 planes
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
