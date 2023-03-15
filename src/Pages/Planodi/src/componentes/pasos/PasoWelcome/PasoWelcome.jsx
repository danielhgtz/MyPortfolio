import React from "react";

import Button from "@material-ui/core/Button";
import { botonesAtrasYAdelante } from "../PasoForm";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// import ilustration from "../../../Assets/img/illustration_1.png";
import ilustration from "../../../Assets/img/vectors/party.svg";
// import ilustration from "../../../Assets/img/vectors/launch.svg";

export default function PasoWelcome({ setStep }) {
  const classes = botonesAtrasYAdelante();
  const mobile = useMediaQuery("(max-width:960px)");

  const nextStep = () => {
    setStep(1);
  };

  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        minHeight: "400px",
        marginBottom: "1rem",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        src={ilustration}
        alt="ilustration"
        style={{ width: "200px", marginTop: "4rem" }}
      />
      <div
        style={
          mobile
            ? { width: "90%", marginTop: "2rem" }
            : { width: "50%", marginTop: "2rem" }
        }
      >
        <p
          className="url-txt-instruc"
          style={{ width: "100%", textAlign: "center" }}
        >
          ¡Bienvenido!
        </p>
        <p
          className="url-txt-instruc2"
          style={
            mobile
              ? {
                  width: "100%",
                  textAlign: "center",
                  fontSize: "0.8rem",
                }
              : {
                  width: "100%",
                  textAlign: "center",
                }
          }
        >
          Estás a solo unos pasos de registrar tu negocio en Planodi.
          ¡Prometemos que te encantará! Al registrarte estás{" "}
          <span style={{ fontWeight: 600, color: "#8c50ff" }}>
            posicionado tu negocio
          </span>{" "}
          en internet e incrementado tu número de clientes. Recuerda, la
          información que ingreses a continuación es confidencial y la{" "}
          <span style={{ fontWeight: 600, color: "#184f85" }}>
            podrás modificar
          </span>{" "}
          en un futuro.
        </p>
      </div>
      <div
        style={
          mobile
            ? { width: "100%", textAlign: "center", marginTop: "2rem" }
            : { width: "100%", textAlign: "center", marginTop: "4.5rem" }
        }
      >
        <Button
          className={classes.button}
          style={mobile ? { width: "100%" } : { width: "30%" }}
          onClick={nextStep}
        >
          Comenzar
        </Button>
      </div>
    </div>
  );
}
