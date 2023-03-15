import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import { botonesAtrasYAdelante } from "../PasoForm";
import "./PasoConfirmacion.css";

export default function PasoConfirmacion({ username }) {
  const classes = botonesAtrasYAdelante();
  const movil = useMediaQuery("(max-width:960px)");

  return (
    <div className="wrapper-conf-aliado" style={{ minWidth: "320px" }}>
      <p className="titulo-conf-aliado" style={{ marginTop: "5rem" }}>
        Tu negocio se ha registrado con éxito
      </p>
      <CheckCircleIcon style={{ color: "#8c50ff", fontSize: "4rem" }} />
      <p className="texto-conf-aliado">
        Recuerda que puedes modificar la información en cualquier momento. Da
        click al siguiente botón para redirigirte a tu perfil recién publicado.
        Por ahora podrás ver tu perfil pero estará disponible al público hasta
        que un administrador de Planodi lo apruebe.
      </p>
      <Button
        className={classes.button}
        style={movil ? { width: "90%" } : { width: "30%" }}
        component={Link}
        to={`/negocios/${username}`}
        rel="noreferrer"
      >
        Ver mi nuevo perfil{" "}
        <ArrowForwardIosIcon style={{ marginLeft: "1rem" }} />
      </Button>
    </div>
  );
}
