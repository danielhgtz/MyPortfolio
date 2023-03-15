import React, { useState } from "react";
import "./SeleccionCategorias.css";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export function useTipoEventoHook() {
  const [cumpleanos, setCumpleanos] = useState(false);
  const [poolParty, setPoolParty] = useState(false);
  const [fiestaInfantil, setFiestaInfantil] = useState(false);
  const [boda, setBoda] = useState(false);
  const [corporativo, setCorporativo] = useState(false);
  const [bautizo, setBautizo] = useState(false);
  const [xv, setXv] = useState(false);
  const [babyShower, setBabyShower] = useState(false);
  const [roofTopParty, setRoofTopParty] = useState(false);

  return {
    tipoEventosState: {
      cumpleanos,
      poolParty,
      fiestaInfantil,
      boda,
      corporativo,
      bautizo,
      xv,
      babyShower,
      roofTopParty,
    },
    setCumpleanos,
    setPoolParty,
    setFiestaInfantil,
    setBoda,
    setCorporativo,
    setBautizo,
    setXv,
    setBabyShower,
    setRoofTopParty,
  };
}

export default function SeleccionCategorias({ resHook }) {
  const {
    cumpleanos,
    poolParty,
    fiestaInfantil,
    boda,
    corporativo,
    bautizo,
    xv,
    babyShower,
    roofTopParty,
  } = resHook.tipoEventosState;
  const mobile = useMediaQuery("(max-width:960px)");

  return (
    <div style={{ marginTop: "3rem" }}>
      <p
        style={
          mobile
            ? { margin: "0 5%", textAlign: "center" }
            : { margin: "0 0 1rem 0" }
        }
        className="alaido-form-label1"
      >
        Selecciona los tipos de eventos que van con tu servicio
      </p>
      <Grid container className="afil-cat-wrapper">
        <Grid
          item
          onClick={() => {
            resHook.setCumpleanos(!cumpleanos);
          }}
        >
          <div
            className={`${
              cumpleanos ? "select" : ""
            } afil-cat-box afil-cat-box-cumple`}
          >
            <p className="afil-cat-box-text">Cumpleaños o evento casual</p>
          </div>
        </Grid>
        <Grid
          item
          onClick={() => {
            resHook.setBoda(!boda);
          }}
        >
          <div
            className={`${boda ? "select" : ""} afil-cat-box afil-cat-box-boda`}
          >
            <p className="afil-cat-box-text">Boda</p>
          </div>
        </Grid>
        <Grid
          item
          onClick={() => {
            resHook.setFiestaInfantil(!fiestaInfantil);
          }}
        >
          <div
            className={`${
              fiestaInfantil ? "select" : ""
            } afil-cat-box afil-cat-box-FI`}
          >
            <p className="afil-cat-box-text">Fiesta Infantil</p>
          </div>
        </Grid>
        <Grid
          item
          onClick={() => {
            resHook.setCorporativo(!corporativo);
          }}
        >
          <div
            className={`${
              corporativo ? "select" : ""
            } afil-cat-box afil-cat-box-corp`}
          >
            <p className="afil-cat-box-text">Evento corporativo</p>
          </div>
        </Grid>
        <Grid
          item
          onClick={() => {
            resHook.setBautizo(!bautizo);
          }}
        >
          <div
            className={`${
              bautizo ? "select" : ""
            } afil-cat-box afil-cat-box-baut`}
          >
            <p className="afil-cat-box-text">Bautizo</p>
          </div>
        </Grid>
        <Grid
          item
          onClick={() => {
            resHook.setXv(!xv);
          }}
        >
          <div className={`${xv ? "select" : ""} afil-cat-box afil-cat-box-xv`}>
            <p className="afil-cat-box-text">XV años</p>
          </div>
        </Grid>
        <Grid
          item
          onClick={() => {
            resHook.setBabyShower(!babyShower);
          }}
        >
          <div
            className={`${
              babyShower ? "select" : ""
            } afil-cat-box afil-cat-box-baby`}
          >
            <p className="afil-cat-box-text">Baby shower / Gender reveal</p>
          </div>
        </Grid>
        <Grid
          item
          onClick={() => {
            resHook.setRoofTopParty(!roofTopParty);
          }}
        >
          <div
            className={`${
              roofTopParty ? "select" : ""
            } afil-cat-box afil-cat-box-RT`}
          >
            <p className="afil-cat-box-text">Rooftop party</p>
          </div>
        </Grid>
        <Grid
          item
          onClick={() => {
            resHook.setPoolParty(!poolParty);
          }}
        >
          <div
            className={`${
              poolParty ? "select" : ""
            } afil-cat-box afil-cat-box-pool`}
          >
            <p className="afil-cat-box-text">Pool party</p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
