import React, { useState } from "react";
import PaqueteBoxInputs from "./PaqueteBoxInputs";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import "./Paquetes.css";
import Grid from "@material-ui/core/Grid";
import "../PasoPlan/PasoPlan.css";
import Button from "@material-ui/core/Button";
import { botonesAtrasYAdelante } from "../../Afiliarme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { HiCursorClick } from "react-icons/hi";
import axios from "axios";
import { userHeaders } from "../../../../Utils/headerSetter";
import ErrorMsg from "../../../../componentes/ErrorMsg";
import Loading from "../../../../componentes/Loading/Loading";

export default function Paquetes({ setStep, idAliado, premium }) {
  const [selected, setSelected] = useState(0);
  const [info, setInfo] = useState([
    {
      numero: 1,
      precio: "0",
      contenido: ["50 personas", "6 horas", "etc."],
    },
  ]);
  const classes = botonesAtrasYAdelante();
  const [error, setError] = useState(false);
  const [loadign, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(
    "Error desconocido, intetnalo más tarde"
  );
  const [mostrarAyudaMas, setMostrarAyudaMas] = useState(false);
  const movil = useMediaQuery("(max-width:960px)");

  const handleSubmit = () => {
    const infoSubmit = info.map((pack, idx) => {
      return {
        numero: idx + 1,
        precio: pack.precio,
        contenido: pack.contenido.join(),
      };
    });
    if (
      infoSubmit.length === 1 &&
      infoSubmit[0].contenido === "50 personas,6 horas,etc."
    ) {
      setError(true);
      setErrorMsg("Tienes que armar mínimo un paquete");
      window.scrollTo(0, 0);
      return;
    }
    for (let i = 0; i < infoSubmit.length; i++) {
      if (infoSubmit[i].contenido === "50 personas,6 horas,etc.") {
        setError(true);
        setErrorMsg(
          `Todos los paquetes deben tener una descripción única. Verifica paquete número ${infoSubmit[i].numero}`
        );
        setSelected(infoSubmit[i].numero - 1);
        window.scrollTo(0, 0);
        return;
      }
      if (infoSubmit[i].precio === "" || infoSubmit[i].precio === "0") {
        setError(true);
        setErrorMsg(
          `Todos los paquetes deben tener un precio. Verifica paquete número ${infoSubmit[i].numero}`
        );
        setSelected(infoSubmit[i].numero - 1);
        window.scrollTo(0, 0);
        return;
      }
      if (infoSubmit[i].contenido === "") {
        setError(true);
        setErrorMsg(
          `Todos los paquetes deben tener una descripción. Verifica paquete número ${infoSubmit[i].numero}`
        );
        setSelected(infoSubmit[i].numero - 1);
        window.scrollTo(0, 0);
        return;
      }
    }
    setLoading(true);
    axios
      .post(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }user/guardarPaso4`,
        {
          idAliado,
          infoPaquete: infoSubmit,
        },
        userHeaders()
      )
      .then(() => {
        setLoading(false);
        setStep(5);
      })
      .catch((err) => {
        if (err.response || err.response.data || err.response.data.msg) {
          setErrorMsg(err.response.data.msg);
        }
        setLoading(false);
        setError(true);
        window.scrollTo(0, 0);
      });
  };

  return (
    <>
      {loadign ? (
        <Loading helperText="Cargando..." />
      ) : (
        <div>
          {error ? <ErrorMsg setError={setError} errorMsg={errorMsg} /> : null}
          <p
            className="sel-plan-titulo"
            style={
              error
                ? { textAlign: "center", marginTop: "-1rem" }
                : { textAlign: "center", marginTop: "-2rem" }
            }
          >
            Crea tus paquetes
          </p>
          <p className="paquete-create-text">
            Ingresa la infromación para tus paquetes armados, intenta venderle
            al cliente paquetes ya hechos que faciliten su decisión y brindar un
            mejor servicio.
          </p>

          <div style={{ position: "relative" }}>
            {mostrarAyudaMas ? (
              <div className="helper-pointer-paquetes">
                <div className="helper-text-paquetes-triangulo" />
                <p className="helper-text-paquetes">
                  <HiCursorClick style={{ marginRight: "0.5rem" }} />
                  Da click para agregar más paquetes.
                </p>
              </div>
            ) : null}
            <div className="paquete-btn-wrapper">
              {info.map((value, idx) => (
                <div
                  className={`${
                    selected === idx ? "selected" : null
                  } paquete-add-wrapper`}
                  key={value.numero}
                  onClick={() => {
                    setSelected(idx);
                  }}
                >
                  {value.numero}
                </div>
              ))}
              <div
                className="paquete-add-wrapper-plus"
                onClick={() => {
                  if (!premium) {
                    setErrorMsg(
                      "Tienes que ser premium para agregar más paquetes, tu cuenta es gratuita"
                    );
                    setError(true);
                    return;
                  }
                  setInfo((prevState) => [
                    ...prevState,
                    {
                      numero: prevState[prevState.length - 1].numero + 1,
                      precio: "0",
                      contenido: [],
                    },
                  ]);
                  setSelected(info.length);
                  setMostrarAyudaMas(false);
                }}
              >
                +
              </div>
            </div>
          </div>

          <p className="paquete-create-text-preview">
            llena los campos de precio y contenido.
            <br />
            <ArrowDownwardIcon />
          </p>
          <Grid container>
            <Grid item xs={false} md={2} />
            <Grid item xs={12} md={8}>
              <PaqueteBoxInputs
                info={info}
                setInfo={setInfo}
                selected={selected}
                setSelected={setSelected}
                setMostrarAyudaMas={setMostrarAyudaMas}
              />
            </Grid>
            <Grid item xs={false} md={2} />
          </Grid>
          <Grid container style={{ marginTop: "1rem", marginBottom: "3rem" }}>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Button
                type="submit"
                className={classes.button}
                style={movil ? { width: "100%" } : { width: "30%" }}
                onClick={handleSubmit}
              >
                Continuar
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
}
