import React from "react";
import Grid from "@material-ui/core/Grid";
import Paquetes from "../Paquetes/Paquetes";
import "./PasoPaquetes.css";

export default function PasoPaquetes({ setStep, idAliado, premium }) {
  return (
    <Grid container style={{ height: "78vh" }}>
      <Grid item xs={1} />
      <Grid item container xs={10}>
        <Paquetes setStep={setStep} idAliado={idAliado} premium={premium} />
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
}
