import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { botonesAtrasYAdelante } from "../../Afiliarme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import plan2 from "../../../../Assets/img/Imagenes_Planes/Plan_3.webp";
import plan0 from "../../../../Assets/img/Imagenes_Planes/Plan_1.webp";
import "./PasoPlan.css";
import Button from "@material-ui/core/Button";

export const Plan = {
  Gratis: 1,
  Plus: 2,
};

export default function PasoPlan({ setStep, setPremium }) {
  const classes = botonesAtrasYAdelante();
  const movil = useMediaQuery("(max-width:960px)");
  const [planSelected, setPlanSelected] = useState(-1);

  return (
    <div>
      <Grid container>
        <Grid item xs={1} />
        <Grid item container xs={10}>
          {planSelected === Plan.Plus ? (
            <div>
              <Grid
                item
                xs={12}
                style={{
                  textAlign: "center",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <p className="sel-plan-titulo">Pago</p>
              </Grid>
              <p>Paguenmen</p>
            </div>
          ) : (
            <>
              <Grid item xs={12}>
                <p className="url-txt-instruc">Selecciona un plan</p>
                <p>
                  Da click en la opción que mejor se adapte a tus necesidades
                </p>
              </Grid>
              <Grid item xs={12} md={6}>
                <div
                  className={`${
                    planSelected === Plan.Gratis ? "plan-selected" : ""
                  } sel-plan-select-div`}
                  onClick={() => {
                    if (planSelected === -1) setPlanSelected(Plan.Gratis);
                  }}
                >
                  {planSelected === Plan.Gratis ? (
                    <div
                      style={
                        movil ? { padding: "2rem 0" } : { padding: "10.7rem 0" }
                      }
                    >
                      <p>Plan gratuito seleccionado</p>
                      <Button
                        className={classes.buttonAtras}
                        onClick={() => {
                          setPlanSelected(-1);
                        }}
                      >
                        CANCELAR
                      </Button>
                      <Button
                        className={classes.button}
                        onClick={() => {
                          setStep(3);
                          setPremium(planSelected === Plan.Plus);
                        }}
                      >
                        CONTINUAR
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div style={{ marginBottom: "1rem" }}>
                        <img
                          src={plan0}
                          alt="plan 1"
                          className="sel-plan-img"
                        />
                      </div>
                      <div
                        style={
                          movil
                            ? {
                                textAlign: "left",
                                padding: "0 6%",
                              }
                            : {
                                textAlign: "left",
                                padding: "0 10%",
                                minHeight: "13rem",
                                paddingTop: "1rem",
                              }
                        }
                      >
                        <p className="sel-plan-txt">
                          <FiberManualRecordIcon
                            style={{
                              fontSize: "9px",
                              marginRight: "5px",
                              color: "rgba(206,41,251,0.9)",
                            }}
                          />
                          4 fotos
                        </p>
                        <p className="sel-plan-txt">
                          <FiberManualRecordIcon
                            style={{
                              fontSize: "9px",
                              marginRight: "5px",
                              color: "rgba(206,41,251,0.9)",
                            }}
                          />
                          1 paquete
                        </p>
                        <p className="sel-plan-txt">
                          <FiberManualRecordIcon
                            style={{
                              fontSize: "9px",
                              marginRight: "5px",
                              color: "rgba(206,41,251,0.9)",
                            }}
                          />
                          comunicación por correo
                        </p>
                        <p className="sel-plan-txt">
                          <FiberManualRecordIcon
                            style={{
                              fontSize: "9px",
                              marginRight: "5px",
                              color: "rgba(206,41,251,0.9)",
                            }}
                          />
                          Customiza tu página
                        </p>
                        <p className="sel-plan-txt">
                          <FiberManualRecordIcon
                            style={{
                              fontSize: "9px",
                              marginRight: "5px",
                              color: "rgba(206,41,251,0.9)",
                            }}
                          />
                          Sección de preguntas frecuentes
                        </p>
                      </div>
                      <div className="sel-plan-btn">GRATIS</div>
                    </>
                  )}
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div
                  className="sel-plan-select-div"
                  onClick={() => {
                    setPlanSelected(Plan.Plus);
                  }}
                >
                  <div className="planplus">Plan +</div>
                  <div style={{ marginBottom: "1rem" }}>
                    <img src={plan2} alt="plan 2" className="sel-plan-img" />
                  </div>
                  <div
                    style={
                      movil
                        ? {
                            textAlign: "left",
                            padding: "0 6%",
                          }
                        : {
                            textAlign: "left",
                            padding: "0 7% 0 8%",
                            minHeight: "13rem",
                            paddingTop: "1rem",
                          }
                    }
                  >
                    <p className="sel-plan-txt" style={{ fontWeight: 500 }}>
                      Lo mismo del plan gratis y además:
                    </p>
                    <p className="sel-plan-txt">
                      <FiberManualRecordIcon
                        style={{
                          fontSize: "9px",
                          marginRight: "5px",
                          color: "rgba(206,41,251,0.9)",
                        }}
                      />
                      Fotos ilimitadas
                    </p>
                    <p className="sel-plan-txt">
                      <FiberManualRecordIcon
                        style={{
                          fontSize: "9px",
                          marginRight: "5px",
                          color: "rgba(206,41,251,0.9)",
                        }}
                      />
                      Paquetes ilimitados
                    </p>
                    <p className="sel-plan-txt">
                      <FiberManualRecordIcon
                        style={{
                          fontSize: "9px",
                          marginRight: "5px",
                          color: "rgba(206,41,251,0.9)",
                        }}
                      />
                      comunicación por correo y whatsapp
                    </p>
                    <p className="sel-plan-txt">
                      <FiberManualRecordIcon
                        style={{
                          fontSize: "9px",
                          marginRight: "5px",
                          color: "rgba(206,41,251,0.9)",
                        }}
                      />
                      Verificación de cuenta
                    </p>
                    <p className="sel-plan-txt">
                      <FiberManualRecordIcon
                        style={{
                          fontSize: "9px",
                          marginRight: "5px",
                          color: "rgba(206,41,251,0.9)",
                        }}
                      />
                      Aparece en páginas principales de busqueda
                    </p>
                    <p className="sel-plan-txt">
                      <FiberManualRecordIcon
                        style={{
                          fontSize: "9px",
                          marginRight: "5px",
                          color: "rgba(206,41,251,0.9)",
                        }}
                      />
                      Por apertura: tu negocio quedará registrado como VIP para
                      siempre
                    </p>
                  </div>
                  <div className="sel-plan-btn">
                    $2,000 <span style={{ fontSize: "1rem" }}>Anualidad</span>
                  </div>
                </div>
              </Grid>
            </>
          )}
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </div>
  );
}
