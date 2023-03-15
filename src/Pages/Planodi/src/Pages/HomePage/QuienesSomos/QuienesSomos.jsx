import React from "react";
import Grid from "@material-ui/core/Grid";
import "./QuienesSomos.css";

export default function QuienesSomos() {
  return (
    <div
      style={{
        marginTop: "6rem",
        width: "100%",
      }}
      id="quienes_somos"
    >
      <Grid container className="quienesSomos-BG">
        <Grid item xs={false} md={5} className="QS-personaje" />
        <Grid item xs={12} md={7}>
          <p className="QS-titulo">¿Quiénes somos?</p>
          <p className="QS-texto">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab cum
            deserunt dolore ea earum odio, quaerat qui quibusdam ratione
            voluptates? A aspernatur aut eius id, illo incidunt nostrum quasi
            quia quis quod, tenetur vel? Eos ipsum modi provident quo vel! Alias
            aliquid aut doloribus earum eligendi eveniet ipsam necessitatibus
            nemo, nesciunt quam quidem quo reiciendis repudiandae sit tempore
            vel veritatis!
          </p>
        </Grid>
        <Grid item xs={12} md={false} className="QS-personaje-movil" />
      </Grid>
    </div>
  );
}
